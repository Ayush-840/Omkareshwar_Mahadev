import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  Share,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { fetchAlbums, fetchPhotos } from '../../src/services/firebase';
import { Photo } from '../../src/types';
import { ScreenHeader } from '../../src/components/common/ScreenHeader';
import { EmptyState } from '../../src/components/common/EmptyState';
import { ErrorState } from '../../src/components/common/ErrorState';
import { colors, spacing, fontSize, fontWeight, radius } from '../../src/theme';
import { getCurrentLanguage } from '../../src/i18n';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
const THUMB_SIZE = (windowWidth - spacing.base * 2 - spacing.xs * 4) / 3;

export default function AlbumPhotosScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const lang = getCurrentLanguage();

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const { data: albums = [] } = useQuery({
    queryKey: ['albums'],
    queryFn: fetchAlbums,
  });

  const {
    data: photos = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['photos', id],
    queryFn: () => fetchPhotos(id || ''),
    enabled: Boolean(id),
  });

  const album = albums.find((a) => a.id === id);
  const albumTitle = album
    ? lang === 'hi'
      ? album.title.hi
      : album.title.en
    : t('gallery.title');

  const handleSharePhoto = async (photo: Photo) => {
    try {
      const caption = photo.caption
        ? lang === 'hi'
          ? photo.caption.hi
          : photo.caption.en
        : albumTitle;
      await Share.share({
        message: `${caption}\n\nश्री ओंकारेश्वर महादेव हनुमान मंदिर\n${photo.url}`,
      });
    } catch {
      // ignore
    }
  };

  const renderThumb = ({ item }: { item: Photo }) => {
    const caption = item.caption
      ? lang === 'hi'
        ? item.caption.hi
        : item.caption.en
      : null;

    return (
      <TouchableOpacity
        style={styles.thumbWrapper}
        onPress={() => setSelectedPhoto(item)}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel={caption || 'फोटो देखें (View Photo)'}
      >
        <Image source={{ uri: item.thumbUrl || item.url }} style={styles.thumbImage} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title={albumTitle} />

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.saffron} />
        </View>
      ) : error ? (
        <ErrorState onRetry={() => refetch()} />
      ) : photos.length === 0 ? (
        <EmptyState message={t('common.noData')} icon="images-outline" />
      ) : (
        <FlatList
          data={photos}
          keyExtractor={(item) => item.id}
          renderItem={renderThumb}
          numColumns={3}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Fullscreen Photo Viewer Modal */}
      {selectedPhoto && (
        <Modal
          visible={Boolean(selectedPhoto)}
          transparent
          animationType="fade"
          onRequestClose={() => setSelectedPhoto(null)}
        >
          <View style={styles.modalBackdrop}>
            {/* Top Toolbar */}
            <View style={styles.modalTopBar}>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => setSelectedPhoto(null)}
                accessibilityRole="button"
                accessibilityLabel={t('common.close')}
              >
                <Ionicons name="close" size={28} color={colors.white} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => handleSharePhoto(selectedPhoto)}
                accessibilityRole="button"
                accessibilityLabel={t('common.share')}
              >
                <Ionicons name="share-social" size={24} color={colors.white} />
              </TouchableOpacity>
            </View>

            {/* Image Center */}
            <View style={styles.modalImageContainer}>
              <Image
                source={{ uri: selectedPhoto.url }}
                style={styles.modalImage}
                resizeMode="contain"
              />
            </View>

            {/* Caption */}
            {selectedPhoto.caption && (
              <View style={styles.captionContainer}>
                <Text style={styles.captionText}>
                  {lang === 'hi'
                    ? selectedPhoto.caption.hi
                    : selectedPhoto.caption.en}
                </Text>
              </View>
            )}
          </View>
        </Modal>
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
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  thumbWrapper: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: radius.card / 2,
    overflow: 'hidden',
    backgroundColor: '#EAE0D2',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'space-between',
  },
  modalTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingTop: 48,
    zIndex: 10,
  },
  modalBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: windowWidth,
    height: windowHeight * 0.75,
  },
  captionContainer: {
    padding: spacing.base,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingBottom: 36,
  },
  captionText: {
    color: colors.white,
    fontSize: fontSize.body,
    textAlign: 'center',
    fontWeight: fontWeight.semibold,
  },
});
