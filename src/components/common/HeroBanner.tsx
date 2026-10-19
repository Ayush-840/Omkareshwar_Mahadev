import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { colors, spacing, fontSize, fontWeight, radius } from '../../theme';
import { LanguageToggle } from './LanguageToggle';
import templeHeroImage from '../../../assets/images/temple_hero.png';

const { width: windowWidth } = Dimensions.get('window');
// Aspect ratio of the hero image (367 / 492) -> height is around windowWidth * (492 / 367)
const HERO_HEIGHT = Math.min(windowWidth * 1.25, 490);

export const HeroBanner: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const tapCountRef = useRef(0);
  const lastTapRef = useRef(0);
  const [adminHint, setAdminHint] = useState<string | null>(null);

  // Hidden admin entrance: tap the emblem 7 times
  const handleEmblemTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current > 1500) {
      tapCountRef.current = 1;
    } else {
      tapCountRef.current += 1;
    }
    lastTapRef.current = now;

    if (tapCountRef.current >= 4 && tapCountRef.current < 7) {
      setAdminHint(`${7 - tapCountRef.current} tap left`);
    } else if (tapCountRef.current >= 7) {
      tapCountRef.current = 0;
      setAdminHint(null);
      router.push('/admin');
    }
  };

  return (
    <View style={styles.container}>
      {/* Authentic Devotional Hero Artwork */}
      <Image
        source={templeHeroImage}
        style={styles.heroImage}
        resizeMode="cover"
      />

      {/* Floating Top Controls (Language & Settings) */}
      <View style={styles.topControls}>
        <View style={styles.spacer} />
        <View style={styles.rightControls}>
          <LanguageToggle />
          <TouchableOpacity
            style={styles.settingsBtn}
            onPress={() => router.push('/settings')}
            accessibilityRole="button"
            accessibilityLabel={t('common.settings')}
            activeOpacity={0.8}
          >
            <Ionicons name="settings-sharp" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Invisible touchable overlay on the emblem for 7-tap admin portal access */}
      <TouchableOpacity
        style={styles.emblemTapTarget}
        onPress={handleEmblemTap}
        activeOpacity={1}
        accessibilityRole="button"
        accessibilityLabel="मंदिर का पावन प्रतीक"
      />

      {adminHint && (
        <View style={styles.hintContainer}>
          <Text style={styles.hintText}>{adminHint}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: HERO_HEIGHT,
    position: 'relative',
    backgroundColor: '#F5A623',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  topControls: {
    position: 'absolute',
    top: 44, // below status bar
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    zIndex: 10,
  },
  spacer: {
    flex: 1,
  },
  rightControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  settingsBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(122, 31, 31, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F5C24B',
  },
  emblemTapTarget: {
    position: 'absolute',
    top: HERO_HEIGHT * 0.12,
    alignSelf: 'center',
    width: windowWidth * 0.7,
    height: HERO_HEIGHT * 0.65,
  },
  hintContainer: {
    position: 'absolute',
    bottom: 36,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radius.pill,
    zIndex: 20,
  },
  hintText: {
    color: '#F5C24B',
    fontSize: fontSize.caption,
    fontWeight: fontWeight.bold,
  },
});
