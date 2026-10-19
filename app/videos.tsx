import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { fetchVideos } from '../src/services/firebase';
import { VideoItem } from '../src/types';
import { ScreenHeader } from '../src/components/common/ScreenHeader';
import { Card } from '../src/components/common/Card';
import { EmptyState } from '../src/components/common/EmptyState';
import { ErrorState } from '../src/components/common/ErrorState';
import { colors, spacing, fontSize, fontWeight, radius, shadow } from '../src/theme';
import { getCurrentLanguage } from '../src/i18n';

type VideoCategory = 'all' | 'aarti' | 'festival' | 'katha';

export default function VideosScreen() {
  const { t } = useTranslation();
  const lang = getCurrentLanguage();
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory>('all');

  const { data: videos = [], isLoading, error, refetch } = useQuery({
    queryKey: ['videos'],
    queryFn: fetchVideos,
  });

  const filteredVideos =
    selectedCategory === 'all'
      ? videos
      : videos.filter((v) => v.category === selectedCategory);

  const categories: { key: VideoCategory; label: string }[] = [
    { key: 'all', label: lang === 'hi' ? 'सभी वीडियो' : 'All Videos' },
    { key: 'aarti', label: t('videos.categories.aarti') },
    { key: 'festival', label: t('videos.categories.festival') },
    { key: 'katha', label: t('videos.categories.katha') },
  ];

  const handleWatchVideo = (youtubeId: string) => {
    Linking.openURL(`https://www.youtube.com/watch?v=${youtubeId}`);
  };

  const renderVideoItem = ({ item }: { item: VideoItem }) => {
    const title = lang === 'hi' ? item.title.hi : item.title.en;
    const thumbUrl = `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;

    return (
      <TouchableOpacity
        onPress={() => handleWatchVideo(item.youtubeId)}
        activeOpacity={0.88}
        accessibilityRole="button"
        accessibilityLabel={`${title}, YouTube पर देखने हेतु टैप करें`}
      >
        <Card style={styles.videoCard}>
          <View style={styles.thumbnailContainer}>
            <Image source={{ uri: thumbUrl }} style={styles.thumbnail} />
            <View style={styles.playOverlay}>
              <View style={styles.playCircle}>
                <Ionicons name="play" size={28} color={colors.white} />
              </View>
            </View>
          </View>
          <View style={styles.videoMeta}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>
                {t(`videos.categories.${item.category}`)}
              </Text>
            </View>
            <Text style={styles.videoTitle} numberOfLines={2}>
              {title}
            </Text>
            <View style={styles.youtubeRow}>
              <Ionicons name="logo-youtube" size={18} color="#FF0000" />
              <Text style={styles.youtubeText}>{t('videos.watchOnYouTube')}</Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title={t('videos.title')} />

      {/* Category Filter Chips */}
      <View style={styles.chipsRow}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(c) => c.key}
          renderItem={({ item }) => {
            const isSelected = selectedCategory === item.key;
            return (
              <TouchableOpacity
                style={[styles.chip, isSelected && styles.chipActive]}
                onPress={() => setSelectedCategory(item.key)}
                accessibilityRole="button"
                accessibilityLabel={item.label}
              >
                <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={styles.chipsContainer}
        />
      </View>

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.saffron} />
        </View>
      ) : error ? (
        <ErrorState onRetry={() => refetch()} />
      ) : filteredVideos.length === 0 ? (
        <EmptyState message={t('common.noData')} icon="videocam-outline" />
      ) : (
        <FlatList
          data={filteredVideos}
          keyExtractor={(item) => item.id}
          renderItem={renderVideoItem}
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
  chipsRow: {
    paddingVertical: spacing.sm,
    backgroundColor: colors.cream,
  },
  chipsContainer: {
    paddingHorizontal: spacing.base,
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: '#E6DCB8',
    minHeight: 38,
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: colors.maroon,
    borderColor: colors.maroon,
  },
  chipText: {
    fontSize: fontSize.caption + 1,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
  },
  chipTextActive: {
    color: colors.white,
  },
  listContent: {
    padding: spacing.base,
    paddingBottom: 40,
  },
  videoCard: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: spacing.base,
  },
  thumbnailContainer: {
    width: '100%',
    height: 190,
    backgroundColor: '#000',
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  playCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(214, 69, 69, 0.9)', // YouTube red tone
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 4,
    ...shadow.card,
  },
  videoMeta: {
    padding: spacing.base,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFEBD0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.pill,
    marginBottom: spacing.xs,
  },
  categoryText: {
    fontSize: fontSize.caption - 1,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
  },
  videoTitle: {
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
    marginBottom: spacing.sm,
    lineHeight: 22,
  },
  youtubeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  youtubeText: {
    fontSize: fontSize.caption + 1,
    fontWeight: fontWeight.bold,
    color: colors.inkMuted,
  },
});
