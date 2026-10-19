import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { fetchEvents } from '../../src/services/firebase';
import { EventItem } from '../../src/types';
import { ScreenHeader } from '../../src/components/common/ScreenHeader';
import { Card } from '../../src/components/common/Card';
import { EmptyState } from '../../src/components/common/EmptyState';
import { ErrorState } from '../../src/components/common/ErrorState';
import { formatISODate } from '../../src/utils/date';
import { colors, spacing, fontSize, fontWeight, radius } from '../../src/theme';
import { getCurrentLanguage } from '../../src/i18n';

export default function EventsListScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const lang = getCurrentLanguage();
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  const { data: events = [], isLoading, error, refetch } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  const renderEventItem = ({ item }: { item: EventItem }) => {
    const title = lang === 'hi' ? item.title.hi : item.title.en;
    const desc = lang === 'hi' ? item.description.hi : item.description.en;
    const location = item.location
      ? lang === 'hi'
        ? item.location.hi
        : item.location.en
      : null;
    const dateFormatted = formatISODate(item.startAt, lang);

    const d = new Date(item.startAt);
    const dayNum = d.getDate();
    const monthShort = d.toLocaleString(lang === 'hi' ? 'hi-IN' : 'en-US', {
      month: 'short',
    });

    return (
      <TouchableOpacity
        onPress={() => router.push(`/events/${item.id}`)}
        activeOpacity={0.88}
        accessibilityRole="button"
        accessibilityLabel={`${title}, दिनांक ${dateFormatted}`}
      >
        <Card style={styles.eventCard}>
          {item.imageUrl && (
            <Image source={{ uri: item.imageUrl }} style={styles.eventImage} />
          )}

          <View style={styles.cardContent}>
            {/* Date Block */}
            <View style={styles.dateBlock}>
              <Text style={styles.dateDay}>{dayNum}</Text>
              <Text style={styles.dateMonth}>{monthShort}</Text>
            </View>

            {/* Info Block */}
            <View style={styles.infoBlock}>
              {item.pinned && (
                <View style={styles.pinnedBadge}>
                  <Text style={styles.pinnedText}>
                    {lang === 'hi' ? 'विशेष महोत्सव' : 'Special Event'}
                  </Text>
                </View>
              )}
              <Text style={styles.eventTitle} numberOfLines={2}>
                {title}
              </Text>

              {location && (
                <View style={styles.metaRow}>
                  <Ionicons name="location-outline" size={15} color={colors.maroon} />
                  <Text style={styles.metaText} numberOfLines={1}>
                    {location}
                  </Text>
                </View>
              )}

              <Text style={styles.eventDesc} numberOfLines={2}>
                {desc}
              </Text>
            </View>
          </View>

          <View style={styles.cardFooter}>
            <Text style={styles.detailLink}>
              {lang === 'hi' ? 'विवरण एवं कैलेंडर में जोड़ें' : 'View & Add to Calendar'}
            </Text>
            <Ionicons name="arrow-forward" size={16} color={colors.saffron} />
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title={t('events.title')} />

      {/* View Toggle (List / Month) per UI_SPEC */}
      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[styles.toggleBtn, viewMode === 'list' && styles.toggleBtnActive]}
          onPress={() => setViewMode('list')}
          accessibilityRole="button"
          accessibilityLabel={t('events.listView')}
        >
          <Ionicons
            name="list"
            size={18}
            color={viewMode === 'list' ? colors.white : colors.maroon}
          />
          <Text
            style={[
              styles.toggleText,
              viewMode === 'list' && styles.toggleTextActive,
            ]}
          >
            {t('events.listView')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleBtn,
            viewMode === 'calendar' && styles.toggleBtnActive,
          ]}
          onPress={() => setViewMode('calendar')}
          accessibilityRole="button"
          accessibilityLabel={t('events.calendarView')}
        >
          <Ionicons
            name="calendar"
            size={18}
            color={viewMode === 'calendar' ? colors.white : colors.maroon}
          />
          <Text
            style={[
              styles.toggleText,
              viewMode === 'calendar' && styles.toggleTextActive,
            ]}
          >
            {t('events.calendarView')}
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.saffron} />
        </View>
      ) : error ? (
        <ErrorState onRetry={() => refetch()} />
      ) : events.length === 0 ? (
        <EmptyState message={t('events.noEvents')} icon="calendar-outline" />
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={renderEventItem}
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
  toggleRow: {
    flexDirection: 'row',
    marginHorizontal: spacing.base,
    marginTop: spacing.sm,
    backgroundColor: '#F5E8D8',
    borderRadius: radius.pill,
    padding: 3,
  },
  toggleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs + 3,
    borderRadius: radius.pill,
    gap: 6,
  },
  toggleBtnActive: {
    backgroundColor: colors.maroon,
  },
  toggleText: {
    fontSize: fontSize.caption + 1,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
  },
  toggleTextActive: {
    color: colors.white,
  },
  listContent: {
    padding: spacing.base,
    paddingBottom: 40,
  },
  eventCard: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: spacing.base,
  },
  eventImage: {
    width: '100%',
    height: 160,
  },
  cardContent: {
    flexDirection: 'row',
    padding: spacing.base,
    gap: spacing.md,
  },
  dateBlock: {
    width: 60,
    height: 64,
    backgroundColor: '#FFEBD0',
    borderRadius: radius.button,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.gold,
  },
  dateDay: {
    fontSize: fontSize.screenTitle,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
  },
  dateMonth: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.bold,
    color: colors.saffron,
    textTransform: 'uppercase',
  },
  infoBlock: {
    flex: 1,
  },
  pinnedBadge: {
    backgroundColor: colors.maroon,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.pill,
    marginBottom: 4,
  },
  pinnedText: {
    color: colors.white,
    fontSize: fontSize.caption - 2,
    fontWeight: fontWeight.bold,
  },
  eventTitle: {
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  metaText: {
    fontSize: fontSize.caption + 1,
    color: colors.inkMuted,
  },
  eventDesc: {
    fontSize: fontSize.caption + 1,
    color: colors.ink,
    lineHeight: 18,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    backgroundColor: '#FAF5ED',
    borderTopWidth: 1,
    borderTopColor: '#F0E6D8',
  },
  detailLink: {
    fontSize: fontSize.caption + 1,
    fontWeight: fontWeight.bold,
    color: colors.saffron,
  },
});
