import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { colors, spacing, fontSize, fontWeight } from '../../theme';

interface OfflineBannerProps {
  lastUpdated?: string;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ lastUpdated }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.banner} accessibilityRole="alert">
      <Ionicons name="cloud-offline" size={20} color={colors.white} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{t('common.offline')}</Text>
        {lastUpdated && (
          <Text style={styles.subtext}>
            {t('common.lastUpdated')}: {lastUpdated}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#8C5220',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.base,
    gap: spacing.sm,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    color: colors.white,
    fontSize: fontSize.caption + 1,
    fontWeight: fontWeight.bold,
  },
  subtext: {
    color: '#F5E6D3',
    fontSize: fontSize.caption - 1,
  },
});
