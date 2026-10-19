import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { fetchTempleInfo } from '../src/services/firebase';
import { ScreenHeader } from '../src/components/common/ScreenHeader';
import { Card } from '../src/components/common/Card';
import { PrimaryButton } from '../src/components/common/PrimaryButton';
import { OfflineBanner } from '../src/components/common/OfflineBanner';
import { colors, spacing, fontSize, fontWeight, radius } from '../src/theme';
import { getCurrentLanguage } from '../src/i18n';

export default function TempleInfoScreen() {
  const { t } = useTranslation();
  const lang = getCurrentLanguage();

  const { data: info, isLoading, error } = useQuery({
    queryKey: ['templeInfo'],
    queryFn: fetchTempleInfo,
  });
  const handleOpenMap = () => {
    if (!info?.location) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${info.location.lat},${info.location.lng}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title={t('templeInfo.title')} />

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.saffron} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {error && <OfflineBanner lastUpdated={info?.updatedAt} />}

          {/* Hero Image */}
          {info?.heroImageUrl && (
            <Image
              source={{ uri: info.heroImageUrl }}
              style={styles.heroImage}
              resizeMode="cover"
            />
          )}

          {/* Temple Name & Brief */}
          <Card style={styles.headerCard}>
            <Text style={styles.mandirTitle}>
              {lang === 'hi' ? info?.name.hi : info?.name.en}
            </Text>
            <View style={styles.omBadge}>
              <Text style={styles.omText}>॥ ॐ नमः शिवाय ॥</Text>
            </View>
          </Card>

          {/* Deities Section */}
          <Card>
            <View style={styles.sectionHeader}>
              <Ionicons name="sparkles" size={22} color={colors.maroon} />
              <Text style={styles.sectionTitle}>{t('templeInfo.deities')}</Text>
            </View>
            {info?.deities.map((deity, idx) => (
              <View key={idx} style={styles.deityItem}>
                {deity.imageUrl && (
                  <Image source={{ uri: deity.imageUrl }} style={styles.deityImage} />
                )}
                <View style={styles.deityTextContainer}>
                  <Text style={styles.deityName}>
                    {lang === 'hi' ? deity.name.hi : deity.name.en}
                  </Text>
                  {deity.description && (
                    <Text style={styles.deityDesc}>
                      {lang === 'hi' ? deity.description.hi : deity.description.en}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </Card>

          {/* Timings Table */}
          <Card>
            <View style={styles.sectionHeader}>
              <Ionicons name="time" size={22} color={colors.maroon} />
              <Text style={styles.sectionTitle}>{t('templeInfo.timings')}</Text>
            </View>
            <View style={styles.table}>
              {info?.timings.map((tm, idx) => (
                <View key={idx} style={styles.tableRow}>
                  <Text style={styles.tableLabel}>
                    {lang === 'hi' ? tm.label.hi : tm.label.en}
                  </Text>
                  <Text style={styles.tableTime}>
                    {tm.from} - {tm.to}
                  </Text>
                </View>
              ))}
            </View>
          </Card>

          {/* History */}
          <Card>
            <View style={styles.sectionHeader}>
              <Ionicons name="book" size={22} color={colors.maroon} />
              <Text style={styles.sectionTitle}>{t('templeInfo.history')}</Text>
            </View>
            <Text style={styles.bodyText}>
              {lang === 'hi' ? info?.history.hi : info?.history.en}
            </Text>
          </Card>

          {/* Address & Maps */}
          <Card>
            <View style={styles.sectionHeader}>
              <Ionicons name="location" size={22} color={colors.maroon} />
              <Text style={styles.sectionTitle}>{t('templeInfo.address')}</Text>
            </View>
            <Text style={styles.bodyText}>
              {lang === 'hi' ? info?.address.hi : info?.address.en}
            </Text>
            <PrimaryButton
              title={t('templeInfo.openInMaps')}
              onPress={handleOpenMap}
              style={styles.mapButton}
            />
          </Card>

          {/* Facilities */}
          <Card>
            <View style={styles.sectionHeader}>
              <Ionicons name="checkmark-circle" size={22} color={colors.maroon} />
              <Text style={styles.sectionTitle}>{t('templeInfo.facilities')}</Text>
            </View>
            {info?.facilities.map((fac, idx) => (
              <View key={idx} style={styles.facilityItem}>
                <Ionicons name="checkmark" size={18} color={colors.success} />
                <Text style={styles.facilityText}>
                  {lang === 'hi' ? fac.hi : fac.en}
                </Text>
              </View>
            ))}
          </Card>
        </ScrollView>
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
  scrollContent: {
    padding: spacing.base,
    paddingBottom: 40,
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: radius.card,
    marginBottom: spacing.base,
  },
  headerCard: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  mandirTitle: {
    fontSize: fontSize.screenTitle,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  omBadge: {
    backgroundColor: '#FFE8B8',
    paddingHorizontal: spacing.base,
    paddingVertical: 4,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.gold,
  },
  omText: {
    color: colors.maroon,
    fontWeight: fontWeight.bold,
    fontSize: fontSize.body,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.xs + 2,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6D8',
    paddingBottom: spacing.xs + 2,
  },
  sectionTitle: {
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
  },
  deityItem: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    alignItems: 'center',
    gap: spacing.md,
  },
  deityImage: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: colors.saffron,
  },
  deityTextContainer: {
    flex: 1,
  },
  deityName: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.ink,
  },
  deityDesc: {
    fontSize: fontSize.caption,
    color: colors.inkMuted,
    marginTop: 2,
    lineHeight: 18,
  },
  table: {
    gap: spacing.sm,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs + 2,
    borderBottomWidth: 0.8,
    borderBottomColor: '#F5ECE0',
  },
  tableLabel: {
    fontSize: fontSize.body,
    color: colors.ink,
    flex: 1,
  },
  tableTime: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.saffron,
  },
  bodyText: {
    fontSize: fontSize.body,
    color: colors.ink,
    lineHeight: 24,
  },
  mapButton: {
    marginTop: spacing.md,
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs + 2,
  },
  facilityText: {
    fontSize: fontSize.body,
    color: colors.ink,
    flex: 1,
  },
});
