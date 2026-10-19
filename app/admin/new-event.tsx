import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { createEvent } from '../../src/services/firebase';
import { ScreenHeader } from '../../src/components/common/ScreenHeader';
import { Card } from '../../src/components/common/Card';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { colors, spacing, fontSize, fontWeight, radius } from '../../src/theme';
import { getCurrentLanguage } from '../../src/i18n';

export default function NewEventScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const lang = getCurrentLanguage();

  const [titleHi, setTitleHi] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [descHi, setDescHi] = useState('');
  const [descEn, setDescEn] = useState('');
  const [venueHi, setVenueHi] = useState('');
  const [venueEn, setVenueEn] = useState('');
  const [dateStr, setDateStr] = useState('2027-03-08');
  const [pinned, setPinned] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    if (!titleHi.trim() || !descHi.trim()) {
      Alert.alert(
        lang === 'hi' ? 'जानकारी आवश्यक है' : 'Information Required',
        lang === 'hi'
          ? 'कृपया कार्यक्रम का नाम एवं विवरण दर्ज करें।'
          : 'Please enter event title and description.'
      );
      return;
    }

    setLoading(true);
    const startDate = new Date(dateStr).toISOString();

    await createEvent({
      title: {
        hi: titleHi.trim(),
        en: titleEn.trim() || titleHi.trim(),
      },
      description: {
        hi: descHi.trim(),
        en: descEn.trim() || descHi.trim(),
      },
      location: {
        hi: venueHi.trim() || 'मुख्य मंदिर प्रांगण',
        en: venueEn.trim() || 'Main Temple Complex',
      },
      startAt: startDate,
      pinned,
    });
    setLoading(false);

    Alert.alert(
      lang === 'hi' ? 'सफल' : 'Success',
      lang === 'hi' ? 'कार्यक्रम सफलतापूर्वक जोड़ दिया गया है।' : 'Event added successfully.',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title={t('admin.newEvent')} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card>
          <Text style={styles.label}>कार्यक्रम का नाम (हिंदी) *</Text>
          <TextInput
            style={styles.input}
            value={titleHi}
            onChangeText={setTitleHi}
            placeholder="उदा. श्री हनुमान जन्मोत्सव"
            placeholderTextColor={colors.inkMuted}
          />

          <Text style={styles.label}>Event Title (English - Optional)</Text>
          <TextInput
            style={styles.input}
            value={titleEn}
            onChangeText={setTitleEn}
            placeholder="e.g. Shri Hanuman Janmotsav"
            placeholderTextColor={colors.inkMuted}
          />

          <Text style={styles.label}>दिनांक (YYYY-MM-DD) *</Text>
          <TextInput
            style={styles.input}
            value={dateStr}
            onChangeText={setDateStr}
            placeholder="2027-03-08"
            placeholderTextColor={colors.inkMuted}
          />

          <Text style={styles.label}>स्थान / स्थल (हिंदी)</Text>
          <TextInput
            style={styles.input}
            value={venueHi}
            onChangeText={setVenueHi}
            placeholder="उदा. मुख्य मंदिर प्रांगण"
            placeholderTextColor={colors.inkMuted}
          />

          <Text style={styles.label}>कार्यक्रम विवरण (हिंदी) *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={descHi}
            onChangeText={setDescHi}
            placeholder="हवन, भजन संध्या एवं महाप्रसाद वितरण..."
            placeholderTextColor={colors.inkMuted}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <View style={styles.switchRow}>
            <View style={styles.switchMeta}>
              <Text style={styles.switchTitle}>प्रमुख महोत्सव के रूप में चिन्हित करें</Text>
              <Text style={styles.switchSub}>विशेष महोत्सव बैज प्रदर्शित होगा</Text>
            </View>
            <Switch
              value={pinned}
              onValueChange={setPinned}
              trackColor={{ false: '#D9D0C3', true: colors.saffron }}
              thumbColor={colors.white}
            />
          </View>

          <PrimaryButton
            title={t('admin.publish')}
            onPress={handlePublish}
            loading={loading}
            style={styles.publishBtn}
          />
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
  label: {
    fontSize: fontSize.caption + 1,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
    marginBottom: 4,
  },
  input: {
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: '#D8CCA6',
    borderRadius: radius.button,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm + 2,
    fontSize: fontSize.body,
    color: colors.ink,
    marginBottom: spacing.md,
  },
  textArea: {
    minHeight: 80,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderTopWidth: 0.8,
    borderTopColor: '#F0E6D8',
  },
  switchMeta: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  switchTitle: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
  },
  switchSub: {
    fontSize: fontSize.caption,
    color: colors.inkMuted,
    marginTop: 2,
  },
  publishBtn: {
    marginTop: spacing.lg,
  },
});
