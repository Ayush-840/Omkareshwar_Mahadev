import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { fetchNotices, fetchEvents, adminLogout } from '../../src/services/firebase';
import { ScreenHeader } from '../../src/components/common/ScreenHeader';
import { Card } from '../../src/components/common/Card';
import { colors, spacing, fontSize, fontWeight, radius, shadow } from '../../src/theme';
import { getCurrentLanguage } from '../../src/i18n';
import { formatISODate } from '../../src/utils/date';

export default function AdminDashboardScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const lang = getCurrentLanguage();

  const { data: notices = [] } = useQuery({
    queryKey: ['notices'],
    queryFn: fetchNotices,
  });

  const { data: events = [] } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  const handleLogout = async () => {
    Alert.alert(
      lang === 'hi' ? 'लॉगआउट' : 'Logout',
      lang === 'hi' ? 'क्या आप लॉगआउट करना चाहते हैं?' : 'Are you sure you want to log out?',
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('admin.logout'),
          style: 'destructive',
          onPress: async () => {
            await adminLogout();
            router.replace('/admin');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t('admin.dashboard')}
        rightAction={{
          icon: 'log-out-outline',
          onPress: handleLogout,
          accessibilityLabel: t('admin.logout'),
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Welcome Banner */}
        <Card style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>
            {lang === 'hi' ? 'जय श्री ओंकारेश्वर महादेव' : 'Jai Shri Onkareshwar Mahadev'}
          </Text>
          <Text style={styles.welcomeSub}>
            {lang === 'hi'
              ? 'प्रबंध समिति प्रशासन पटल - यहाँ से नई सूचना, कार्यक्रम व फोटो जोड़ें।'
              : 'Committee Portal - Publish notices, events, and photos.'}
          </Text>
        </Card>

        {/* 3 Main Action Tiles */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => router.push('/admin/new-notice')}
            accessibilityRole="button"
            accessibilityLabel={t('admin.newNotice')}
          >
            <View style={[styles.iconCircle, { backgroundColor: colors.tileViolet }]}>
              <Ionicons name="newspaper" size={28} color={colors.white} />
            </View>
            <Text style={styles.btnLabel}>{t('admin.newNotice')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => router.push('/admin/new-event')}
            accessibilityRole="button"
            accessibilityLabel={t('admin.newEvent')}
          >
            <View style={[styles.iconCircle, { backgroundColor: colors.tilePurple }]}>
              <Ionicons name="calendar" size={28} color={colors.white} />
            </View>
            <Text style={styles.btnLabel}>{t('admin.newEvent')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => router.push('/admin/upload-photos')}
            accessibilityRole="button"
            accessibilityLabel={t('admin.uploadPhotos')}
          >
            <View style={[styles.iconCircle, { backgroundColor: colors.tileBlue }]}>
              <Ionicons name="images" size={28} color={colors.white} />
            </View>
            <Text style={styles.btnLabel}>{t('admin.uploadPhotos')}</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Notices List */}
        <Card>
          <View style={styles.sectionHeader}>
            <Ionicons name="newspaper-outline" size={20} color={colors.maroon} />
            <Text style={styles.sectionTitle}>
              {lang === 'hi' ? 'हालिया सूचनाएं' : 'Recent Notices'}
            </Text>
          </View>

          {notices.slice(0, 3).map((notice) => (
            <View key={notice.id} style={styles.recentItem}>
              <View style={styles.recentMeta}>
                <Text style={styles.recentTitle} numberOfLines={1}>
                  {lang === 'hi' ? notice.title.hi : notice.title.en}
                </Text>
                <Text style={styles.recentDate}>
                  {formatISODate(notice.createdAt, lang)}
                </Text>
              </View>
              {notice.pinned && (
                <View style={styles.pinnedBadge}>
                  <Text style={styles.pinnedText}>{t('notices.pinned')}</Text>
                </View>
              )}
            </View>
          ))}
        </Card>

        {/* Recent Events List */}
        <Card>
          <View style={styles.sectionHeader}>
            <Ionicons name="calendar-outline" size={20} color={colors.maroon} />
            <Text style={styles.sectionTitle}>
              {lang === 'hi' ? 'आगामी कार्यक्रम' : 'Upcoming Events'}
            </Text>
          </View>

          {events.slice(0, 3).map((event) => (
            <View key={event.id} style={styles.recentItem}>
              <View style={styles.recentMeta}>
                <Text style={styles.recentTitle} numberOfLines={1}>
                  {lang === 'hi' ? event.title.hi : event.title.en}
                </Text>
                <Text style={styles.recentDate}>
                  {formatISODate(event.startAt, lang)}
                </Text>
              </View>
            </View>
          ))}
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
  welcomeCard: {
    backgroundColor: '#FFEED6',
    borderLeftWidth: 4,
    borderLeftColor: colors.saffron,
    padding: spacing.md,
  },
  welcomeTitle: {
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
    marginBottom: 4,
  },
  welcomeSub: {
    fontSize: fontSize.caption + 1,
    color: colors.inkMuted,
    lineHeight: 18,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.base,
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    borderRadius: radius.card,
    marginHorizontal: 4,
    ...shadow.card,
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  btnLabel: {
    fontSize: fontSize.caption + 1,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6D8',
    paddingBottom: spacing.xs + 2,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 0.8,
    borderBottomColor: '#F5ECE0',
  },
  recentMeta: {
    flex: 1,
  },
  recentTitle: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.ink,
  },
  recentDate: {
    fontSize: fontSize.caption,
    color: colors.inkMuted,
    marginTop: 2,
  },
  pinnedBadge: {
    backgroundColor: colors.saffron,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  pinnedText: {
    color: colors.white,
    fontSize: fontSize.caption - 2,
    fontWeight: fontWeight.bold,
  },
});
