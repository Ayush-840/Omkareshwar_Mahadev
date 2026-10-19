import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Linking,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { ScreenHeader } from '../src/components/common/ScreenHeader';
import { Card } from '../src/components/common/Card';
import { changeLanguage, getCurrentLanguage } from '../src/i18n';
import { colors, spacing, fontSize, fontWeight, radius } from '../src/theme';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const currentLang = getCurrentLanguage();

  const [noticesNotif, setNoticesNotif] = useState(true);
  const [eventsNotif, setEventsNotif] = useState(true);
  const [aartiNotif, setAartiNotif] = useState(true);

  const handleLanguageSelect = async (lang: 'hi' | 'en') => {
    await changeLanguage(lang);
  };

  const handleOpenPrivacyPolicy = () => {
    Linking.openURL('https://onkareshwar-mahadev-mandir.web.app/privacy-policy');
  };

  const handleContactDev = () => {
    Linking.openURL('mailto:support@mandir.org?subject=Mandir%20App%20Feedback');
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title={t('settings.title')} showLanguageToggle={false} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Language Selection Card */}
        <Card>
          <View style={styles.sectionHeader}>
            <Ionicons name="language" size={22} color={colors.maroon} />
            <Text style={styles.sectionTitle}>{t('settings.language')}</Text>
          </View>

          <TouchableOpacity
            style={[styles.langOption, currentLang === 'hi' && styles.langOptionActive]}
            onPress={() => handleLanguageSelect('hi')}
            accessibilityRole="radio"
            accessibilityState={{ selected: currentLang === 'hi' }}
          >
            <Text style={[styles.langText, currentLang === 'hi' && styles.langTextActive]}>
              हिंदी (Hindi)
            </Text>
            {currentLang === 'hi' && (
              <Ionicons name="checkmark-circle" size={22} color={colors.saffron} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.langOption, currentLang === 'en' && styles.langOptionActive]}
            onPress={() => handleLanguageSelect('en')}
            accessibilityRole="radio"
            accessibilityState={{ selected: currentLang === 'en' }}
          >
            <Text style={[styles.langText, currentLang === 'en' && styles.langTextActive]}>
              English (अंग्रेजी)
            </Text>
            {currentLang === 'en' && (
              <Ionicons name="checkmark-circle" size={22} color={colors.saffron} />
            )}
          </TouchableOpacity>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <View style={styles.sectionHeader}>
            <Ionicons name="notifications" size={22} color={colors.maroon} />
            <Text style={styles.sectionTitle}>{t('settings.notifications')}</Text>
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>{t('settings.noticesNotif')}</Text>
            <Switch
              value={noticesNotif}
              onValueChange={setNoticesNotif}
              trackColor={{ false: '#D9D0C3', true: colors.saffron }}
              thumbColor={colors.white}
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>{t('settings.eventsNotif')}</Text>
            <Switch
              value={eventsNotif}
              onValueChange={setEventsNotif}
              trackColor={{ false: '#D9D0C3', true: colors.saffron }}
              thumbColor={colors.white}
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>{t('settings.aartiNotif')}</Text>
            <Switch
              value={aartiNotif}
              onValueChange={setAartiNotif}
              trackColor={{ false: '#D9D0C3', true: colors.saffron }}
              thumbColor={colors.white}
            />
          </View>
        </Card>

        {/* About & Policies */}
        <Card>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle" size={22} color={colors.maroon} />
            <Text style={styles.sectionTitle}>{t('settings.about')}</Text>
          </View>

          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>{t('settings.version')}</Text>
            <Text style={styles.aboutValue}>1.0.0 (Build 2027)</Text>
          </View>

          <TouchableOpacity
            style={styles.linkRow}
            onPress={handleOpenPrivacyPolicy}
            accessibilityRole="button"
            accessibilityLabel={t('settings.privacyPolicy')}
          >
            <Text style={styles.linkLabel}>{t('settings.privacyPolicy')}</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.saffron} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkRow}
            onPress={handleContactDev}
            accessibilityRole="button"
            accessibilityLabel={t('settings.contactDeveloper')}
          >
            <Text style={styles.linkLabel}>{t('settings.contactDeveloper')}</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.saffron} />
          </TouchableOpacity>
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6D8',
    paddingBottom: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
  },
  langOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    borderRadius: radius.card / 2,
    borderWidth: 1.5,
    borderColor: '#EFE7DA',
    marginBottom: spacing.sm,
    minHeight: 48,
  },
  langOptionActive: {
    borderColor: colors.saffron,
    backgroundColor: '#FFF7EC',
  },
  langText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.ink,
  },
  langTextActive: {
    color: colors.maroon,
    fontWeight: fontWeight.bold,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 0.8,
    borderBottomColor: '#F5ECE0',
    minHeight: 48,
  },
  switchLabel: {
    fontSize: fontSize.body,
    color: colors.ink,
    flex: 1,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 0.8,
    borderBottomColor: '#F5ECE0',
  },
  aboutLabel: {
    fontSize: fontSize.body,
    color: colors.ink,
  },
  aboutValue: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 0.8,
    borderBottomColor: '#F5ECE0',
    minHeight: 48,
  },
  linkLabel: {
    fontSize: fontSize.body,
    color: colors.maroon,
    fontWeight: fontWeight.semibold,
  },
});
