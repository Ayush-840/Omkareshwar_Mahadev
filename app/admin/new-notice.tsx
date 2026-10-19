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
import { createNotice } from '../../src/services/firebase';
import { ScreenHeader } from '../../src/components/common/ScreenHeader';
import { Card } from '../../src/components/common/Card';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { colors, spacing, fontSize, fontWeight, radius } from '../../src/theme';
import { getCurrentLanguage } from '../../src/i18n';

export default function NewNoticeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const lang = getCurrentLanguage();

  const [titleHi, setTitleHi] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [bodyHi, setBodyHi] = useState('');
  const [bodyEn, setBodyEn] = useState('');
  const [pinned, setPinned] = useState(false);
  const [sendPush, setSendPush] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    if (!titleHi.trim() || !bodyHi.trim()) {
      Alert.alert(
        lang === 'hi' ? 'जानकारी आवश्यक है' : 'Information Required',
        lang === 'hi'
          ? 'कृपया हिंदी में शीर्षक और संदेश अवश्य दर्ज करें।'
          : 'Please enter Title and Message in Hindi.'
      );
      return;
    }

    const doSubmit = async () => {
      setLoading(true);
      await createNotice({
        title: {
          hi: titleHi.trim(),
          en: titleEn.trim() || titleHi.trim(),
        },
        body: {
          hi: bodyHi.trim(),
          en: bodyEn.trim() || bodyHi.trim(),
        },
        pinned,
        pushSent: sendPush,
        createdBy: 'मंदिर समिति',
      });
      setLoading(false);

      Alert.alert(
        lang === 'hi' ? 'सफल' : 'Success',
        lang === 'hi' ? 'सूचना सफलतापूर्वक प्रकाशित हो गई है।' : 'Notice has been published successfully.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    };

    if (sendPush) {
      Alert.alert(
        t('admin.sendPushNotif'),
        lang === 'hi'
          ? 'यह सूचना सभी श्रद्धालुओं के फोन पर नोटिफिकेशन के रूप में भेजी जाएगी।'
          : 'This notice will send a push notification to all devotee phones.',
        [
          { text: t('common.cancel'), style: 'cancel' },
          { text: t('admin.sendPushConfirm'), onPress: doSubmit },
        ]
      );
    } else {
      await doSubmit();
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title={t('admin.newNotice')} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card>
          <Text style={styles.label}>सूचना का शीर्षक (हिंदी) *</Text>
          <TextInput
            style={styles.input}
            value={titleHi}
            onChangeText={setTitleHi}
            placeholder="उदा. श्रावण मास विशेष रुद्राभिषेक"
            placeholderTextColor={colors.inkMuted}
          />

          <Text style={styles.label}>Title (English - Optional)</Text>
          <TextInput
            style={styles.input}
            value={titleEn}
            onChangeText={setTitleEn}
            placeholder="e.g. Special Rudrabhishek Ceremony"
            placeholderTextColor={colors.inkMuted}
          />

          <Text style={styles.label}>सूचना का विवरण / संदेश (हिंदी) *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={bodyHi}
            onChangeText={setBodyHi}
            placeholder="सभी ग्रामवासियों एवं श्रद्धालुओं को सूचित किया जाता है..."
            placeholderTextColor={colors.inkMuted}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <Text style={styles.label}>Notice Details (English - Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={bodyEn}
            onChangeText={setBodyEn}
            placeholder="All devotees and villagers are informed that..."
            placeholderTextColor={colors.inkMuted}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />

          <View style={styles.switchRow}>
            <View style={styles.switchMeta}>
              <Text style={styles.switchTitle}>शीर्ष पर पिन करें (Pin to top)</Text>
              <Text style={styles.switchSub}>मुख्य पृष्ठ पर सबसे ऊपर दिखेगी</Text>
            </View>
            <Switch
              value={pinned}
              onValueChange={setPinned}
              trackColor={{ false: '#D9D0C3', true: colors.saffron }}
              thumbColor={colors.white}
            />
          </View>

          <View style={styles.switchRow}>
            <View style={styles.switchMeta}>
              <Text style={styles.switchTitle}>पुश नोटिफिकेशन भेजें (Push Alert)</Text>
              <Text style={styles.switchSub}>केवल अत्यंत महत्वपूर्ण सूचनाओं पर चुनें</Text>
            </View>
            <Switch
              value={sendPush}
              onValueChange={setSendPush}
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
