import React from 'react';
import { ScrollView, StyleSheet, RefreshControl, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchTempleInfo, fetchAartis, fetchNotices } from '../src/services/firebase';
import { HeroBanner } from '../src/components/common/HeroBanner';
import { NextAartiBanner } from '../src/components/common/NextAartiBanner';
import { PinnedNoticeBanner } from '../src/components/common/PinnedNoticeBanner';
import { TileGrid } from '../src/features/home/TileGrid';
import { colors } from '../src/theme';

export default function HomeScreen() {
  const {
    refetch: refetchInfo,
    isRefetching: isRefetchingInfo,
  } = useQuery({
    queryKey: ['templeInfo'],
    queryFn: fetchTempleInfo,
  });

  const {
    data: aartis = [],
    refetch: refetchAartis,
    isRefetching: isRefetchingAartis,
  } = useQuery({
    queryKey: ['aartis'],
    queryFn: fetchAartis,
  });

  const {
    data: notices = [],
    refetch: refetchNotices,
    isRefetching: isRefetchingNotices,
  } = useQuery({
    queryKey: ['notices'],
    queryFn: fetchNotices,
  });

  const isRefreshing = isRefetchingInfo || isRefetchingAartis || isRefetchingNotices;

  const onRefresh = async () => {
    await Promise.all([refetchInfo(), refetchAartis(), refetchNotices()]);
  };

  const pinnedNotice = notices.find((n) => n.pinned);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      bounces={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          colors={[colors.saffron]}
          tintColor={colors.saffron}
        />
      }
    >
      {/* 1. Hero Artwork matching user reference image */}
      <HeroBanner />

      {/* 2. Seamless 3 x 3 Devotional Tile Grid (overlaps hero, per reference) */}
      <TileGrid />

      {/* 3. Live aarti countdown + pinned notice below the grid */}
      <View style={styles.extrasContainer}>
        <NextAartiBanner aartis={aartis} />
        {pinnedNotice && <PinnedNoticeBanner notice={pinnedNotice} />}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9EE',
  },
  contentContainer: {
    paddingBottom: 24,
  },
  extrasContainer: {
    marginTop: -16,
    paddingHorizontal: 8,
    gap: 8,
  },
});
