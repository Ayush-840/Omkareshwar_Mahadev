import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { fetchAlbums } from '../../src/services/firebase';
import { Album } from '../../src/types';
import { ScreenHeader } from '../../src/components/common/ScreenHeader';
import { EmptyState } from '../../src/components/common/EmptyState';
import { ErrorState } from '../../src/components/common/ErrorState';
import { colors, spacing, fontSize, fontWeight, radius, shadow } from '../../src/theme';
import { getCurrentLanguage } from '../../src/i18n';
import { toDevanagariNumerals } from '../../src/utils/date';

const { width: windowWidth } = Dimensions.get('window');
const ALBUM_WIDTH = (windowWidth - spacing.base * 2 - spacing.md) / 2;

export default function GalleryAlbumsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const lang = getCurrentLanguage();

  const { data: albums = [], isLoading, error, refetch } = useQuery({
    queryKey: ['albums'],
    queryFn: fetchAlbums,
  });

  const renderAlbum = ({ item }: { item: Album }) => {
    const title = lang === 'hi' ? item.title.hi : item.title.en;
    const photoCount =
      lang === 'hi'
        ? `${toDevanagariNumerals(item.count)} ${t('gallery.photos')}`
        : `${item.count} ${t('gallery.photos')}`;

    return (
      <TouchableOpacity
        style={styles.albumCard}
        onPress={() => router.push(`/gallery/${item.id}`)}
        activeOpacity={0.88}
        accessibilityRole="button"
        accessibilityLabel={`${title}, ${photoCount}`}
      >
        <Image source={{ uri: item.coverUrl }} style={styles.albumCover} />
        <View style={styles.countBadge}>
          <Ionicons name="images" size={12} color={colors.white} />
          <Text style={styles.countText}>{photoCount}</Text>
        </View>
        <View style={styles.albumInfo}>
          <Text style={styles.albumTitle} numberOfLines={2}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title={t('gallery.title')} />

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.saffron} />
        </View>
      ) : error ? (
        <ErrorState onRetry={() => refetch()} />
      ) : albums.length === 0 ? (
        <EmptyState message={t('gallery.noAlbums')} icon="images-outline" />
      ) : (
        <FlatList
          data={albums}
          keyExtractor={(item) => item.id}
          renderItem={renderAlbum}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: spacing.base,
    paddingBottom: 40,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: spacing.base,
  },
  albumCard: {
    width: ALBUM_WIDTH,
    backgroundColor: colors.white,
    borderRadius: radius.card,
    overflow: 'hidden',
    ...shadow.card,
  },
  albumCover: {
    width: '100%',
    height: 140,
  },
  countBadge: {
    position: 'absolute',
    top: spacing.xs + 2,
    right: spacing.xs + 2,
    backgroundColor: 'rgba(0,0,0,0.65)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
    gap: 4,
  },
  countText: {
    color: colors.white,
    fontSize: fontSize.caption - 2,
    fontWeight: fontWeight.bold,
  },
  albumInfo: {
    padding: spacing.sm,
  },
  albumTitle: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
    minHeight: 40,
  },
});
