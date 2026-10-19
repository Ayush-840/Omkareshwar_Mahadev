import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Aarti } from '../../types';
import { getNextAarti, NextAartiResult } from '../../utils/date';
import { colors, spacing, fontSize, fontWeight } from '../../theme';
import { getCurrentLanguage } from '../../i18n';

interface NextAartiBannerProps {
  aartis: Aarti[];
}

export const NextAartiBanner: React.FC<NextAartiBannerProps> = ({ aartis }) => {
  const router = useRouter();
  const lang = getCurrentLanguage();
  const [result, setResult] = useState<NextAartiResult>(() => getNextAarti(aartis));

  useEffect(() => {
    // Update every minute
    const update = () => setResult(getNextAarti(aartis));
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [aartis]);

  const displayText = lang === 'hi' ? result.displayTextHi : result.displayTextEn;

  return (
    <TouchableOpacity
      style={styles.banner}
      onPress={() => router.push('/aarti')}
      activeOpacity={0.88}
      accessibilityRole="button"
      accessibilityLabel={`आरती दर्शन: ${displayText}`}
    >
      <View style={styles.iconCircle}>
        <Ionicons name="flame" size={20} color={colors.maroon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.bannerText} numberOfLines={1}>
          {displayText}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.maroon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#FFEAC2', // warm gold cream
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.base,
    borderBottomWidth: 1.5,
    borderBottomColor: '#F5C24B',
    minHeight: 48,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  textContainer: {
    flex: 1,
    marginRight: spacing.xs,
  },
  bannerText: {
    fontSize: fontSize.body - 1,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
  },
});
