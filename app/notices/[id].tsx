import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Share,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { fetchNotices } from '../../src/services/firebase';
import { ScreenHeader } from '../../src/components/common/ScreenHeader';
import { Card } from '../../src/components/common/Card';
import { EmptyState } from '../../src/components/common/EmptyState';
import { formatISODate } from '../../src/utils/date';
import { colors, spacing, fontSize, fontWeight, radius } from '../../src/theme';
import { getCurrentLanguage } from '../../src/i18n';

export default function NoticeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const lang = getCurrentLanguage();

  const { data: notices = [] } = useQuery({
    queryKey: ['notices'],
    queryFn: fetchNotices,
  });

  const notice = notices.find((n) => n.id === id);

  if (!notice) {
    return (
      <View style={styles.container}>
        <ScreenHeader title={t('notices.title')} />
        <EmptyState message={t('common.noData')} />
      </View>
    );
  }

  const title = lang === 'hi' ? notice.title.hi : notice.title.en;
  const body = lang === 'hi' ? notice.body.hi : notice.body.en;
  const dateFormatted = formatISODate(notice.createdAt, lang);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `📢 ${title}\n\nदिनांक: ${dateFormatted}\n\n${body}\n\n- श्री ओंकारेश्वर महादेव हनुमान मंदिर प्रबंध समिति`,
      });
    } catch {
      // ignore
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={title}
        rightAction={{
          icon: 'share-social-outline',
          onPress: handleShare,
          accessibilityLabel: t('common.share'),
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {notice.imageUrl && (
          <Image source={{ uri: notice.imageUrl }} style={styles.noticeImage} />
        )}

        <Card>
          {notice.pinned && (
            <View style={styles.pinnedBadge}>
              <Ionicons name="pin" size={14} color={colors.white} />
              <Text style={styles.pinnedText}>{t('notices.pinned')}</Text>
            </View>
          )}

          <Text style={styles.title}>{title}</Text>

          <View style={styles.metaRow}>
            <Ionicons name="calendar-outline" size={16} color={colors.inkMuted} />
            <Text style={styles.dateText}>{dateFormatted}</Text>
            {notice.createdBy && (
              <>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.authorText}>{notice.createdBy}</Text>
              </>
            )}
          </View>

          <View style={styles.divider} />

          <Text style={styles.body}>{body}</Text>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  scrollContent: {
    padding: spacing.base,
    paddingBottom: 40,
  },
  noticeImage: {
    width: '100%',
    height: 220,
    borderRadius: radius.card,
    marginBottom: spacing.base,
  },
  pinnedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.maroon,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
    gap: 4,
    marginBottom: spacing.sm,
  },
  pinnedText: {
    color: colors.white,
    fontSize: fontSize.caption - 1,
    fontWeight: fontWeight.bold,
  },
  title: {
    fontSize: fontSize.screenTitle,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
    marginBottom: spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.md,
  },
  dateText: {
    fontSize: fontSize.caption + 1,
    color: colors.inkMuted,
  },
  dot: {
    color: colors.inkMuted,
  },
  authorText: {
    fontSize: fontSize.caption + 1,
    color: colors.saffron,
    fontWeight: fontWeight.semibold,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0E6D8',
    marginBottom: spacing.md,
  },
  body: {
    fontSize: fontSize.bodyLarge,
    color: colors.ink,
    lineHeight: 28,
  },
});
