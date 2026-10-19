import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, radius, spacing, fontSize, fontWeight } from '../../theme';
import { changeLanguage, getCurrentLanguage } from '../../i18n';

export const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = getCurrentLanguage();

  const handleToggle = async () => {
    const nextLang = currentLang === 'hi' ? 'en' : 'hi';
    await changeLanguage(nextLang);
  };

  return (
    <TouchableOpacity
      style={styles.pill}
      onPress={handleToggle}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={
        currentLang === 'hi'
          ? 'अंग्रेजी भाषा में बदलें (Switch to English)'
          : 'हिंदी भाषा में बदलें (Switch to Hindi)'
      }
    >
      <Text style={[styles.text, currentLang === 'hi' ? styles.activeText : styles.inactiveText]}>
        हिं
      </Text>
      <Text style={styles.divider}>/</Text>
      <Text style={[styles.text, currentLang === 'en' ? styles.activeText : styles.inactiveText]}>
        EN
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.saffron,
    minHeight: 38,
    minWidth: 64,
    justifyContent: 'center',
  },
  text: {
    fontSize: fontSize.caption + 1,
    fontWeight: fontWeight.bold,
  },
  activeText: {
    color: colors.maroon,
  },
  inactiveText: {
    color: colors.inkMuted,
    opacity: 0.6,
  },
  divider: {
    marginHorizontal: 3,
    color: colors.inkMuted,
    fontSize: fontSize.caption,
  },
});
