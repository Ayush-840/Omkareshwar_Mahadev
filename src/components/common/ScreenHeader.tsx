import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AccessibilityRole } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { colors, spacing, fontSize, fontWeight, shadow } from '../../theme';
import { LanguageToggle } from './LanguageToggle';

interface ScreenHeaderProps {
  title: string;
  showBack?: boolean;
  showLanguageToggle?: boolean;
  rightAction?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    accessibilityLabel: string;
  };
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  showBack = true,
  showLanguageToggle = true,
  rightAction,
}) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {showBack && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityRole={'button' as AccessibilityRole}
            accessibilityLabel={t('common.back')}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Ionicons name="arrow-back" size={26} color={colors.maroon} />
          </TouchableOpacity>
        )}
        <Text style={styles.title} numberOfLines={1} accessibilityRole="header">
          {title}
        </Text>
      </View>

      <View style={styles.rightSection}>
        {showLanguageToggle && <LanguageToggle />}
        {rightAction && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={rightAction.onPress}
            accessibilityRole={'button' as AccessibilityRole}
            accessibilityLabel={rightAction.accessibilityLabel}
          >
            <Ionicons name={rightAction.icon} size={24} color={colors.maroon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: colors.cream,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(122, 31, 31, 0.1)',
    ...shadow.card,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.xs,
  },
  title: {
    fontSize: fontSize.screenTitle,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  actionButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
