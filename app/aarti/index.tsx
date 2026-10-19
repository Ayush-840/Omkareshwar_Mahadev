import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { fetchAartis } from '../../src/services/firebase';
import { Aarti } from '../../src/types';
import { ScreenHeader } from '../../src/components/common/ScreenHeader';
import { Card } from '../../src/components/common/Card';
import { EmptyState } from '../../src/components/common/EmptyState';
import { ErrorState } from '../../src/components/common/ErrorState';
import { getNextAarti } from '../../src/utils/date';
import { colors, spacing, fontSize, fontWeight, radius, shadow } from '../../src/theme';
import { getCurrentLanguage } from '../../src/i18n';

export default function AartiListScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const lang = getCurrentLanguage();

  const { data: aartis = [], isLoading, error, refetch } = useQuery({
    queryKey: ['aartis'],
    queryFn: fetchAartis,
  });

  const nextAartiResult = getNextAarti(aartis);

  const renderAartiItem = ({ item }: { item: Aarti }) => {
    const isNext = nextAartiResult.aarti?.id === item.id;
    const title = lang === 'hi' ? item.title.hi : item.title.en;

    return (
      <TouchableOpacity
        onPress={() => router.push(`/aarti/${item.id}`)}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel={`${title}, समय ${item.time}`}
      >
        <Card style={[styles.aartiCard, isNext && styles.nextAartiCard]}>
          <View style={styles.cardHeader}>
            <View style={styles.titleRow}>
              <View style={[styles.flameIcon, isNext && styles.flameIconActive]}>
                <Ionicons
                  name="flame"
                  size={24}
                  color={isNext ? colors.white : colors.maroon}
                />
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.aartiTitle}>{title}</Text>
                {isNext && (
                  <View style={styles.nextBadge}>
                    <Text style={styles.nextBadgeText}>
                      {lang === 'hi' ? 'अगली आरती' : 'Next Aarti'}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.timeBadge}>
              <Ionicons name="time-outline" size={16} color={colors.maroon} />
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
          </View>

          <View style={styles.actionRow}>
            <View style={styles.lyricsIndicator}>
              <Ionicons name="musical-notes" size={16} color={colors.saffron} />
              <Text style={styles.lyricsText}>{t('aarti.lyrics')}</Text>
            </View>
            <View style={styles.openRow}>
              <Text style={styles.openText}>
                {lang === 'hi' ? 'आरती एवं बोल देखें' : 'View & Listen'}
              </Text>
              <Ionicons name="chevron-forward" size={18} color={colors.saffron} />
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title={t('aarti.title')} />

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.saffron} />
        </View>
      ) : error ? (
        <ErrorState onRetry={() => refetch()} />
      ) : aartis.length === 0 ? (
        <EmptyState message={t('common.noData')} />
      ) : (
        <FlatList
          data={aartis}
          keyExtractor={(item) => item.id}
          renderItem={renderAartiItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: spacing.base,
    paddingBottom: 40,
  },
  aartiCard: {
    padding: spacing.base,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  nextAartiCard: {
    borderColor: colors.gold,
    backgroundColor: '#FFF8EB',
    ...shadow.card,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flameIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFEBD0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm + 2,
  },
  flameIconActive: {
    backgroundColor: colors.saffron,
  },
  titleContainer: {
    flex: 1,
  },
  aartiTitle: {
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
  },
  nextBadge: {
    backgroundColor: colors.saffron,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  nextBadgeText: {
    color: colors.white,
    fontSize: fontSize.caption - 2,
    fontWeight: fontWeight.bold,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cream,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    gap: 4,
  },
  timeText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F5EFE6',
    paddingTop: spacing.sm,
  },
  lyricsIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  lyricsText: {
    fontSize: fontSize.caption + 1,
    color: colors.inkMuted,
  },
  openRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  openText: {
    fontSize: fontSize.caption + 1,
    fontWeight: fontWeight.bold,
    color: colors.saffron,
  },
});
