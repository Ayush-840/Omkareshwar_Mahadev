import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Notice } from '../../types';
import { colors, spacing, radius, fontSize, fontWeight, shadow } from '../../theme';
import { getCurrentLanguage } from '../../i18n';

interface PinnedNoticeBannerProps {
  notice: Notice;
}

export const PinnedNoticeBanner: React.FC<PinnedNoticeBannerProps> = ({ notice }) => {
  const router = useRouter();
  const lang = getCurrentLanguage();
  const title = lang === 'hi' ? notice.title.hi : notice.title.en;
  const body = lang === 'hi' ? notice.body.hi : notice.body.en;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(`/notices/${notice.id}`)}
      activeOpacity={0.88}
      accessibilityRole="button"
      accessibilityLabel={`महत्वपूर्ण सूचना: ${title}`}
    >
      <View style={styles.badgeRow}>
        <View style={styles.badge}>
          <Ionicons name="pin" size={14} color={colors.white} />
          <Text style={styles.badgeText}>
            {lang === 'hi' ? 'महत्वपूर्ण सूचना' : 'Important Notice'}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.maroon} />
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.body} numberOfLines={2}>
        {body}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF2DE',
    marginHorizontal: spacing.base,
    marginTop: spacing.md,
    padding: spacing.base,
    borderRadius: radius.card,
    borderLeftWidth: 4,
    borderLeftColor: colors.saffron,
    ...shadow.card,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.maroon,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
    gap: 4,
  },
  badgeText: {
    color: colors.white,
    fontSize: fontSize.caption - 1,
    fontWeight: fontWeight.bold,
  },
  title: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
    marginBottom: 4,
  },
  body: {
    fontSize: fontSize.caption + 1,
    color: colors.ink,
    lineHeight: 18,
  },
});
