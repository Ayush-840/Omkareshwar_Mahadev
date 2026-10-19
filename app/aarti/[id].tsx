import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Share,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { fetchAartis } from '../../src/services/firebase';
import { ScreenHeader } from '../../src/components/common/ScreenHeader';
import { Card } from '../../src/components/common/Card';
import { EmptyState } from '../../src/components/common/EmptyState';
import {
  scheduleAartiReminder,
  cancelScheduledNotification,
} from '../../src/services/notifications';
import { colors, spacing, fontSize, fontWeight, shadow } from '../../src/theme';
import { getCurrentLanguage } from '../../src/i18n';

export default function AartiDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const lang = getCurrentLanguage();

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.25 | 1.5>(1);
  const [isReminderOn, setIsReminderOn] = useState(false);
  const [reminderNotifId, setReminderNotifId] = useState<string | null>(null);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const { data: aartis = [] } = useQuery({
    queryKey: ['aartis'],
    queryFn: fetchAartis,
  });

  const aarti = aartis.find((a) => a.id === id);

  if (!aarti) {
    return (
      <View style={styles.container}>
        <ScreenHeader title={t('aarti.title')} />
        <EmptyState message={t('common.noData')} />
      </View>
    );
  }

  const title = lang === 'hi' ? aarti.title.hi : aarti.title.en;
  const lyrics = lang === 'hi' ? aarti.lyrics.hi : aarti.lyrics.en;

  const handleToggleReminder = async (val: boolean) => {
    if (val) {
      const notifId = await scheduleAartiReminder(
        aarti.id,
        aarti.title.hi,
        aarti.title.en,
        aarti.time
      );
      if (notifId) {
        setIsReminderOn(true);
        setReminderNotifId(notifId);
        Alert.alert(
          lang === 'hi' ? 'अनुस्मारक सक्रिय' : 'Reminder Set',
          lang === 'hi'
            ? `${title} से 10 मिनट पहले आपको प्रतिदिन सूचना दी जाएगी।`
            : `You will be reminded 10 minutes before ${title} daily.`
        );
      } else {
        Alert.alert(
          lang === 'hi' ? 'अनुमति आवश्यक' : 'Permission Required',
          lang === 'hi'
            ? 'कृपया सेटिंग्स में जाकर सूचनाओं की अनुमति दें।'
            : 'Please allow notification permissions in your settings.'
        );
      }
    } else {
      if (reminderNotifId) {
        await cancelScheduledNotification(reminderNotifId);
      }
      setIsReminderOn(false);
      setReminderNotifId(null);
    }
  };

  const handleDownloadOffline = () => {
    setIsDownloaded(true);
    Alert.alert(
      lang === 'hi' ? 'डाउनलोड संपन्न' : 'Download Complete',
      lang === 'hi'
        ? `${title} ऑफलाइन सुनने हेतु सुरक्षित कर ली गई है।`
        : `${title} is saved for offline devotional listening.`
    );
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${title} - श्री ओंकारेश्वर महादेव हनुमान मंदिर\n\n${lyrics}`,
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
        {/* Audio Player Card */}
        <Card style={styles.playerCard}>
          <View style={styles.playerTop}>
            <View style={styles.omCircle}>
              <Ionicons name="musical-note" size={28} color={colors.maroon} />
            </View>
            <View style={styles.playerMeta}>
              <Text style={styles.playerTitle}>{title}</Text>
              <Text style={styles.playerSubtitle}>
                {lang === 'hi' ? 'नित्य समय' : 'Daily Time'}: {aarti.time} IST
              </Text>
            </View>
          </View>

          {/* Player Controls */}
          <View style={styles.controlsRow}>
            <TouchableOpacity
              style={styles.speedButton}
              onPress={() => {
                const speeds: (1 | 1.25 | 1.5)[] = [1, 1.25, 1.5];
                const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                setPlaybackSpeed(next);
              }}
              accessibilityRole="button"
              accessibilityLabel={`गति बदलें, वर्तमान ${playbackSpeed}x`}
            >
              <Text style={styles.speedText}>{playbackSpeed}x</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.playButton}
              onPress={() => setIsPlaying(!isPlaying)}
              accessibilityRole="button"
              accessibilityLabel={isPlaying ? t('aarti.pause') : t('aarti.play')}
            >
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={32}
                color={colors.white}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.downloadButton}
              onPress={handleDownloadOffline}
              accessibilityRole="button"
              accessibilityLabel={t('aarti.download')}
            >
              <Ionicons
                name={isDownloaded ? 'checkmark-circle' : 'cloud-download-outline'}
                size={26}
                color={isDownloaded ? colors.success : colors.maroon}
              />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Reminder Toggle Card */}
        <Card style={styles.reminderCard}>
          <View style={styles.reminderRow}>
            <View style={styles.reminderTextContainer}>
              <Text style={styles.reminderTitle}>{t('aarti.remindMe')}</Text>
              <Text style={styles.reminderSub}>
                {lang === 'hi'
                  ? 'आरती प्रारंभ होने से 10 मिनट पहले'
                  : '10 minutes prior to aarti start'}
              </Text>
            </View>
            <Switch
              value={isReminderOn}
              onValueChange={handleToggleReminder}
              trackColor={{ false: '#D9D0C3', true: colors.saffron }}
              thumbColor={colors.white}
            />
          </View>
        </Card>

        {/* Lyrics Card */}
        <Card style={styles.lyricsCard}>
          <View style={styles.lyricsHeader}>
            <Ionicons name="book-outline" size={22} color={colors.maroon} />
            <Text style={styles.lyricsTitle}>{t('aarti.lyrics')}</Text>
          </View>
          <Text style={styles.lyricsContent}>{lyrics}</Text>
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
  playerCard: {
    backgroundColor: '#FFF7EC',
    borderWidth: 1.5,
    borderColor: colors.gold,
    padding: spacing.lg,
  },
  playerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  omCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  playerMeta: {
    flex: 1,
  },
  playerTitle: {
    fontSize: fontSize.screenTitle,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
  },
  playerSubtitle: {
    fontSize: fontSize.caption + 1,
    color: colors.inkMuted,
    marginTop: 2,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  speedButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.cream,
    justifyContent: 'center',
    alignItems: 'center',
  },
  speedText: {
    fontSize: fontSize.caption + 1,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
  },
  playButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.saffron,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadow.card,
  },
  downloadButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.cream,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reminderCard: {
    padding: spacing.base,
  },
  reminderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reminderTextContainer: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  reminderTitle: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
  },
  reminderSub: {
    fontSize: fontSize.caption,
    color: colors.inkMuted,
    marginTop: 2,
  },
  lyricsCard: {
    padding: spacing.lg,
  },
  lyricsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#F2E8DC',
    paddingBottom: spacing.sm,
    marginBottom: spacing.md,
  },
  lyricsTitle: {
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
  },
  lyricsContent: {
    fontSize: fontSize.bodyLarge,
    color: colors.ink,
    lineHeight: 30, // spacious line-height for elderly readability
    textAlign: 'center',
  },
});
