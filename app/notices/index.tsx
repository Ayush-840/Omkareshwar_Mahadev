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
import { fetchNotices } from '../../src/services/firebase';
import { Notice } from '../../src/types';
import { ScreenHeader } from '../../src/components/common/ScreenHeader';
import { Card } from '../../src/components/common/Card';
import { EmptyState } from '../../src/components/common/EmptyState';
import { ErrorState } from '../../src/components/common/ErrorState';
import { formatISODate } from '../../src/utils/date';
import { colors, spacing, fontSize, fontWeight, radius } from '../../src/theme';
import { getCurrentLanguage } from '../../src/i18n';

export default function NoticesListScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const lang = getCurrentLanguage();

  const { data: notices = [], isLoading, error, refetch } = useQuery({
    queryKey: ['notices'],
    queryFn: fetchNotices,
  });

  const renderNoticeItem = ({ item }: { item: Notice }) => {
    const title = lang === 'hi' ? item.title.hi : item.title.en;
    const body = lang === 'hi' ? item.body.hi : item.body.en;
    const dateFormatted = formatISODate(item.createdAt, lang);

    return (
      <TouchableOpacity
        onPress={() => router.push(`/notices/${item.id}`)}
        activeOpacity={0.88}
        accessibilityRole="button"
        accessibilityLabel={`${title}, दिनांक ${dateFormatted}`}
      >
        <Card style={[styles.card, item.pinned && styles.pinnedCard]}>
          <View style={styles.headerRow}>
            {item.pinned ? (
              <View style={styles.pinnedBadge}>
                <Ionicons name="pin" size={12} color={colors.white} />
                <Text style={styles.pinnedText}>{t('notices.pinned')}</Text>
              </View>
            ) : (
              <View />
            )}
            <Text style={styles.dateText}>{dateFormatted}</Text>
          </View>

          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>

          <Text style={styles.body} numberOfLines={2}>
            {body}
          </Text>

          <View style={styles.footerRow}>
            <Text style={styles.readMore}>
              {lang === 'hi' ? 'पूरा पढ़ें' : 'Read more'}
            </Text>
            <Ionicons name="arrow-forward" size={16} color={colors.saffron} />
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title={t('notices.title')} />

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.saffron} />
        </View>
      ) : error ? (
        <ErrorState onRetry={() => refetch()} />
      ) : notices.length === 0 ? (
        <EmptyState message={t('notices.noNotices')} icon="newspaper-outline" />
      ) : (
        <FlatList
          data={notices}
          keyExtractor={(item) => item.id}
          renderItem={renderNoticeItem}
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
  card: {
    padding: spacing.base,
    marginBottom: spacing.md,
  },
  pinnedCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.saffron,
    backgroundColor: '#FFF8ED',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  pinnedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.maroon,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.pill,
    gap: 4,
  },
  pinnedText: {
    color: colors.white,
    fontSize: fontSize.caption - 2,
    fontWeight: fontWeight.bold,
  },
  dateText: {
    fontSize: fontSize.caption,
    color: colors.inkMuted,
  },
  title: {
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
    marginBottom: 4,
  },
  body: {
    fontSize: fontSize.body - 1,
    color: colors.ink,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  readMore: {
    fontSize: fontSize.caption + 1,
    fontWeight: fontWeight.bold,
    color: colors.saffron,
  },
});
