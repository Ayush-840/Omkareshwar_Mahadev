import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { TileItem, TileConfig } from './TileItem';
import { colors, spacing } from '../../theme';

export const TILES: TileConfig[] = [
  {
    id: 'info',
    labelKey: 'tiles.info',
    labelFallbackHi: 'मंदिर जानकारी',
    labelFallbackEn: 'Temple Info',
    icon: 'business',
    color: '#F25C24',
    image: require('../../../assets/tiles/tile_info.png'),
    route: '/info',
  },
  {
    id: 'aarti',
    labelKey: 'tiles.aarti',
    labelFallbackHi: 'आरती दर्शन',
    labelFallbackEn: 'Aarti Darshan',
    icon: 'flame',
    color: '#FFA000',
    image: require('../../../assets/tiles/tile_aarti.png'),
    route: '/aarti',
  },
  {
    id: 'events',
    labelKey: 'tiles.events',
    labelFallbackHi: 'कार्यक्रम',
    labelFallbackEn: 'Events',
    icon: 'calendar',
    color: '#8E24AA',
    image: require('../../../assets/tiles/tile_events.png'),
    route: '/events',
  },
  {
    id: 'gallery',
    labelKey: 'tiles.gallery',
    labelFallbackHi: 'फोटो गैलरी',
    labelFallbackEn: 'Photo Gallery',
    icon: 'images',
    color: '#1E88E5',
    image: require('../../../assets/tiles/tile_gallery.png'),
    route: '/gallery',
  },
  {
    id: 'community',
    labelKey: 'tiles.community',
    labelFallbackHi: 'भक्त समुदाय',
    labelFallbackEn: 'Devotee Community',
    icon: 'people',
    color: '#2E7D32',
    image: require('../../../assets/tiles/tile_community.png'),
    route: '/community',
  },
  {
    id: 'donate',
    labelKey: 'tiles.donate',
    labelFallbackHi: 'दान सहयोग',
    labelFallbackEn: 'Donation Support',
    icon: 'heart',
    color: '#E53935',
    image: require('../../../assets/tiles/tile_donate.png'),
    route: '/donate',
  },
  {
    id: 'notices',
    labelKey: 'tiles.notices',
    labelFallbackHi: 'नोटिस / समाचार',
    labelFallbackEn: 'Notices / News',
    icon: 'newspaper',
    color: '#9C27B0',
    image: require('../../../assets/tiles/tile_notices.png'),
    route: '/notices',
  },
  {
    id: 'videos',
    labelKey: 'tiles.videos',
    labelFallbackHi: 'वीडियो',
    labelFallbackEn: 'Videos',
    icon: 'videocam',
    color: '#FB8C00',
    image: require('../../../assets/tiles/tile_videos.png'),
    route: '/videos',
  },
  {
    id: 'contact',
    labelKey: 'tiles.contact',
    labelFallbackHi: 'संपर्क करें',
    labelFallbackEn: 'Contact Us',
    icon: 'call',
    color: '#1565C0',
    image: require('../../../assets/tiles/tile_contact.png'),
    route: '/contact',
  },
];

const { width: windowWidth } = Dimensions.get('window');

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
              onPress={() => router.push(tile.route as any)}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF9EE', // warm cream background exactly as in reference
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.xl + 20,
    marginTop: -28, // seamless overlap with the hero artwork
    width: '100%',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
});
