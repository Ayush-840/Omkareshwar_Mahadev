import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { TileItem, TileConfig } from './TileItem';
import { spacing } from '../../theme';

// Colors and layout mirror the reference home screen:
// orange, amber, purple / blue, green, red / violet, gold, navy
export const TILES: TileConfig[] = [
  {
    id: 'info',
    labelKey: 'tiles.info',
    labelFallbackHi: 'मंदिर जानकारी',
    labelFallbackEn: 'Temple Info',
    icon: 'om',
    color: '#F26A21',
    route: '/info',
  },
  {
    id: 'aarti',
    labelKey: 'tiles.aarti',
    labelFallbackHi: 'आरती दर्शन',
    labelFallbackEn: 'Aarti Darshan',
    icon: 'fire',
    color: '#E8962B',
    route: '/aarti',
  },
  {
    id: 'events',
    labelKey: 'tiles.events',
    labelFallbackHi: 'कार्यक्रम',
    labelFallbackEn: 'Events',
    icon: 'calendar',
    color: '#8E24AA',
    route: '/events',
  },
  {
    id: 'gallery',
    labelKey: 'tiles.gallery',
    labelFallbackHi: 'फोटो गैलरी',
    labelFallbackEn: 'Photo Gallery',
    icon: 'image-multiple',
    color: '#1E88E5',
    route: '/gallery',
  },
  {
    id: 'community',
    labelKey: 'tiles.community',
    labelFallbackHi: 'भक्त समुदाय',
    labelFallbackEn: 'Devotee Community',
    icon: 'account-group',
    color: '#2E7D32',
    route: '/community',
  },
  {
    id: 'donate',
    labelKey: 'tiles.donate',
    labelFallbackHi: 'दान सहयोग',
    labelFallbackEn: 'Donation Support',
    icon: 'hand-heart',
    color: '#E53935',
    route: '/donate',
  },
  {
    id: 'notices',
    labelKey: 'tiles.notices',
    labelFallbackHi: 'नोटिस / समाचार',
    labelFallbackEn: 'Notices / News',
    icon: 'newspaper',
    color: '#9C27B0',
    route: '/notices',
  },
  {
    id: 'videos',
    labelKey: 'tiles.videos',
    labelFallbackHi: 'वीडियो',
    labelFallbackEn: 'Videos',
    icon: 'play',
    color: '#FB8C00',
    route: '/videos',
  },
  {
    id: 'contact',
    labelKey: 'tiles.contact',
    labelFallbackHi: 'संपर्क करें',
    labelFallbackEn: 'Contact Us',
    icon: 'phone',
    color: '#1565C0',
    route: '/contact',
  },
];

export const TileGrid: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {TILES.map((tile) => {
          const label = t(tile.labelKey, tile.labelFallbackHi);
          return (
            <TileItem
              key={tile.id}
              tile={tile}
              label={label}
              onPress={() => router.push(tile.route)}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF9EE',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.xl + 20,
    marginTop: -28,
    width: '100%',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
});
