import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { fetchDonationInfo } from '../src/services/firebase';
import { ScreenHeader } from '../src/components/common/ScreenHeader';
import { Card } from '../src/components/common/Card';
import { PrimaryButton } from '../src/components/common/PrimaryButton';
import { colors, spacing, fontSize, fontWeight, radius } from '../src/theme';
import { getCurrentLanguage } from '../src/i18n';
import { toDevanagariNumerals } from '../src/utils/date';

export default function DonationSupportScreen() {
  const { t } = useTranslation();
  const lang = getCurrentLanguage();

  const { data: donateInfo, isLoading } = useQuery({
    queryKey: ['donationInfo'],
    queryFn: fetchDonationInfo,
  });

  const handleOpenDonateWeb = () => {
    if (donateInfo?.externalDonateUrl) {
      Linking.openURL(donateInfo.externalDonateUrl);
    }
  };

  const formatAmount = (amt: number): string => {
    const str = amt.toLocaleString('en-IN');
    return lang === 'hi' ? `₹ ${toDevanagariNumerals(str)}` : `₹ ${str}`;
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title={t('donate.title')} />

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.saffron} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Trust Banner Card */}
          <Card style={styles.trustCard}>
            <View style={styles.badgeRow}>
              <Ionicons name="shield-checkmark" size={20} color={colors.maroon} />
              <Text style={styles.badgeText}>{t('donate.trustDetails')}</Text>
            </View>
            <Text style={styles.trustName}>{donateInfo?.trustName}</Text>
            {donateInfo?.registrationNote && (
              <Text style={styles.regNote}>{donateInfo.registrationNote}</Text>
            )}

            {donateInfo?.receiptContact && (
              <View style={styles.receiptRow}>
                <Ionicons name="call-outline" size={16} color={colors.maroon} />
                <Text style={styles.receiptContact}>
                  {lang === 'hi' ? 'रसीद व संपर्क' : 'Receipt & queries'}:{' '}
                  {donateInfo.receiptContact}
                </Text>
              </View>
            )}

            {/* External Donation Button - compliant with Apple/Google policies */}
            <PrimaryButton
              title={t('donate.donateOnWebsite')}
              onPress={handleOpenDonateWeb}
              style={styles.donateBtn}
            />
            <Text style={styles.policyNotice}>
              {lang === 'hi'
                ? '* ऐप के माध्यम से सीधे कोई भुगतान स्वीकार नहीं किया जाता है।'
                : '* No payments are collected inside the mobile app.'}
            </Text>
          </Card>

          {/* Donation Purposes */}
          <Card>
            <View style={styles.sectionHeader}>
              <Ionicons name="heart" size={22} color={colors.maroon} />
              <Text style={styles.sectionTitle}>{t('donate.purposes')}</Text>
            </View>

            {donateInfo?.purposes.map((purpose, idx) => (
              <View key={idx} style={styles.purposeItem}>
                <View style={styles.purposeDot} />
                <View style={styles.purposeTextContainer}>
                  <Text style={styles.purposeTitle}>
                    {lang === 'hi' ? purpose.title.hi : purpose.title.en}
                  </Text>
                  <Text style={styles.purposeDesc}>
                    {lang === 'hi' ? purpose.description.hi : purpose.description.en}
                  </Text>
                </View>
              </View>
            ))}
          </Card>

          {/* Transparency / Financial Summary */}
          <Card>
            <View style={styles.sectionHeader}>
              <Ionicons name="stats-chart" size={22} color={colors.maroon} />
              <Text style={styles.sectionTitle}>{t('donate.transparency')}</Text>
            </View>

            {donateInfo?.summaries.map((sum, idx) => (
              <View key={idx} style={styles.summaryItem}>
                <Text style={styles.summaryMonth}>
                  {lang === 'hi' ? `माह: ${sum.month}` : `Month: ${sum.month}`}
                </Text>

                <View style={styles.finRow}>
                  <View style={styles.finBox}>
                    <Text style={styles.finLabel}>{t('donate.income')}</Text>
                    <Text style={[styles.finValue, { color: colors.success }]}>
                      {formatAmount(sum.income)}
                    </Text>
                  </View>
                  <View style={styles.finBox}>
                    <Text style={styles.finLabel}>{t('donate.spend')}</Text>
                    <Text style={[styles.finValue, { color: colors.danger }]}>
                      {formatAmount(sum.spend)}
                    </Text>
                  </View>
                </View>

                {sum.note && (
                  <Text style={styles.summaryNote}>
                    {lang === 'hi' ? sum.note.hi : sum.note.en}
                  </Text>
                )}
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
  trustCard: {
    backgroundColor: '#FFF7EC',
    borderColor: colors.gold,
    borderWidth: 1.5,
    padding: spacing.lg,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  badgeText: {
    fontSize: fontSize.caption + 1,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
  },
  trustName: {
    fontSize: fontSize.screenTitle - 2,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
    marginBottom: 4,
  },
  regNote: {
    fontSize: fontSize.caption + 1,
    color: colors.inkMuted,
    lineHeight: 18,
  },
  receiptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.sm,
    backgroundColor: colors.cream,
    padding: spacing.sm,
    borderRadius: radius.card / 2,
  },
  receiptContact: {
    fontSize: fontSize.caption + 1,
    color: colors.ink,
    fontWeight: fontWeight.semibold,
  },
  donateBtn: {
    marginTop: spacing.base,
  },
  policyNotice: {
    fontSize: fontSize.caption - 1,
    color: colors.inkMuted,
    textAlign: 'center',
    marginTop: spacing.xs + 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6D8',
    paddingBottom: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
  },
  purposeItem: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  purposeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.saffron,
    marginTop: 6,
  },
  purposeTextContainer: {
    flex: 1,
  },
  purposeTitle: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.ink,
  },
  purposeDesc: {
    fontSize: fontSize.caption + 1,
    color: colors.inkMuted,
    marginTop: 2,
    lineHeight: 18,
  },
  summaryItem: {
    backgroundColor: colors.cream,
    padding: spacing.md,
    borderRadius: radius.card / 2,
    marginBottom: spacing.sm,
  },
  summaryMonth: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
    marginBottom: spacing.xs,
  },
  finRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  finBox: {
    flex: 1,
  },
  finLabel: {
    fontSize: fontSize.caption,
    color: colors.inkMuted,
  },
  finValue: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    marginTop: 2,
  },
  summaryNote: {
    fontSize: fontSize.caption,
    color: colors.inkMuted,
    lineHeight: 16,
    marginTop: 4,
  },
});
