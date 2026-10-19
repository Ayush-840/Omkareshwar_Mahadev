import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Share,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { fetchEvents } from '../../src/services/firebase';
import { ScreenHeader } from '../../src/components/common/ScreenHeader';
import { Card } from '../../src/components/common/Card';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { EmptyState } from '../../src/components/common/EmptyState';
import { addEventToPhoneCalendar } from '../../src/services/calendar';
import { formatISODate } from '../../src/utils/date';
import { colors, spacing, fontSize, fontWeight, radius } from '../../src/theme';
import { getCurrentLanguage } from '../../src/i18n';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const lang = getCurrentLanguage();
  const [calendarAdding, setCalendarAdding] = useState(false);

  const { data: events = [] } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <View style={styles.container}>
        <ScreenHeader title={t('events.title')} />
        <EmptyState message={t('common.noData')} />
      </View>
    );
  }

  const title = lang === 'hi' ? event.title.hi : event.title.en;
  const desc = lang === 'hi' ? event.description.hi : event.description.en;
  const location = event.location
    ? lang === 'hi'
      ? event.location.hi
      : event.location.en
    : null;
  const dateFormatted = formatISODate(event.startAt, lang);

  const handleAddToCalendar = async () => {
    setCalendarAdding(true);
    const success = await addEventToPhoneCalendar(event);
    setCalendarAdding(false);

    if (success) {
      Alert.alert(
        lang === 'hi' ? 'कैलेंडर में जोड़ा गया' : 'Added to Calendar',
        lang === 'hi'
          ? `${title} को आपके फोन के कैलेंडर में सफलतापूर्वक जोड़ दिया गया है।`
          : `${title} has been successfully added to your device calendar.`
      );
    } else {
      Alert.alert(
        lang === 'hi' ? 'अनुमति आवश्यक' : 'Permission Required',
        lang === 'hi'
          ? 'कृपया सेटिंग्स में जाकर कैलेंडर की अनुमति दें।'
          : 'Please enable calendar permissions in device settings.'
      );
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${title}\n\nदिनांक: ${dateFormatted}\nस्थान: ${location || 'श्री ओंकारेश्वर महादेव मंदिर'}\n\n${desc}\n\nश्री ओंकारेश्वर महादेव हनुमान मंदिर ऐप`,
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
        {event.imageUrl && (
          <Image source={{ uri: event.imageUrl }} style={styles.headerImage} />
        )}

        <Card>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="calendar-outline" size={20} color={colors.maroon} />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>
                {lang === 'hi' ? 'दिनांक एवं समय' : 'Date & Time'}
              </Text>
              <Text style={styles.infoValue}>{dateFormatted} (IST)</Text>
            </View>
          </View>

          {location && (
            <View style={styles.infoRow}>
              <View style={styles.iconCircle}>
                <Ionicons name="location-outline" size={20} color={colors.maroon} />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>
                  {lang === 'hi' ? 'स्थान' : 'Venue'}
                </Text>
                <Text style={styles.infoValue}>{location}</Text>
              </View>
            </View>
          )}

          <View style={styles.divider} />

          <Text style={styles.descTitle}>
            {lang === 'hi' ? 'कार्यक्रम विवरण' : 'Event Details'}
          </Text>
          <Text style={styles.description}>{desc}</Text>
        </Card>

        {/* Action Button: Add to Calendar */}
        <PrimaryButton
          title={t('events.addToCalendar')}
          onPress={handleAddToCalendar}
          loading={calendarAdding}
          style={styles.calendarButton}
        />
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
  headerImage: {
    width: '100%',
    height: 220,
    borderRadius: radius.card,
    marginBottom: spacing.base,
  },
  title: {
    fontSize: fontSize.screenTitle,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFEBD0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: fontSize.caption,
    color: colors.inkMuted,
  },
  infoValue: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.ink,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0E6D8',
    marginVertical: spacing.md,
  },
  descTitle: {
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
    marginBottom: spacing.xs + 2,
  },
  description: {
    fontSize: fontSize.body,
    color: colors.ink,
    lineHeight: 24,
  },
  calendarButton: {
    marginTop: spacing.sm,
  },
});
