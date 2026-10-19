import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { fetchMembers, submitVolunteerRegistration } from '../src/services/firebase';
import { Member } from '../src/types';
import { ScreenHeader } from '../src/components/common/ScreenHeader';
import { Card } from '../src/components/common/Card';
import { PrimaryButton } from '../src/components/common/PrimaryButton';
import { colors, spacing, fontSize, fontWeight, radius } from '../src/theme';
import { getCurrentLanguage } from '../src/i18n';

export default function DevoteeCommunityScreen() {
  const { t } = useTranslation();
  const lang = getCurrentLanguage();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { data: members = [], isLoading } = useQuery({
    queryKey: ['members'],
    queryFn: fetchMembers,
  });

  const handleJoinWhatsApp = () => {
    Linking.openURL('https://chat.whatsapp.com/invite/OnkareshwarMandirDevotees');
  };

  const handleVolunteerSubmit = async () => {
    if (!name.trim()) {
      Alert.alert(
        lang === 'hi' ? 'नाम आवश्यक है' : 'Name is required',
        lang === 'hi' ? 'कृपया अपना नाम दर्ज करें।' : 'Please enter your name.'
      );
      return;
    }

    setSubmitting(true);
    await submitVolunteerRegistration({
      name: name.trim(),
      phone: phone.trim() || undefined,
      interest: interest.trim() || 'सामान्य सेवा (General Seva)',
    });
    setSubmitting(false);

    Alert.alert(
      lang === 'hi' ? 'धन्यवाद!' : 'Thank you!',
      t('community.submitted')
    );
    setName('');
    setPhone('');
    setInterest('');
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title={t('community.title')} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* WhatsApp Group Card */}
        <Card style={styles.whatsappCard}>
          <View style={styles.whatsappRow}>
            <View style={styles.whatsappIconCircle}>
              <Ionicons name="logo-whatsapp" size={30} color={colors.white} />
            </View>
            <View style={styles.whatsappTextContainer}>
              <Text style={styles.whatsappTitle}>
                {lang === 'hi' ? 'आधिकारिक भक्त परिवार ग्रुप' : 'Official Devotee WhatsApp Group'}
              </Text>
              <Text style={styles.whatsappSub}>
                {lang === 'hi'
                  ? 'नित्य दर्शन, सूचनाएं एवं उत्सव अपडेट प्राप्त करें'
                  : 'Receive daily darshan, notices & festival updates'}
              </Text>
            </View>
          </View>
          <PrimaryButton
            title={t('community.joinWhatsApp')}
            onPress={handleJoinWhatsApp}
            style={styles.whatsappButton}
          />
        </Card>

        {/* Committee Members List */}
        <Card>
          <View style={styles.sectionHeader}>
            <Ionicons name="people" size={22} color={colors.maroon} />
            <Text style={styles.sectionTitle}>{t('community.committee')}</Text>
          </View>

          {isLoading ? (
            <ActivityIndicator color={colors.saffron} style={styles.loader} />
          ) : (
            members.map((member: Member) => {
              const memberName = lang === 'hi' ? member.name.hi : member.name.en;
              const memberRole = lang === 'hi' ? member.role.hi : member.role.en;

              return (
                <View key={member.id} style={styles.memberItem}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarInitial}>
                      {memberName.charAt(0)}
                    </Text>
                  </View>
                  <View style={styles.memberMeta}>
                    <Text style={styles.memberName}>{memberName}</Text>
                    <Text style={styles.memberRole}>{memberRole}</Text>
                  </View>
                  {member.showPhone && member.phone && (
                    <TouchableOpacity
                      style={styles.callIconBtn}
                      onPress={() => Linking.openURL(`tel:${member.phone}`)}
                      accessibilityRole="button"
                      accessibilityLabel={`कॉल करें ${memberName}`}
                    >
                      <Ionicons name="call" size={20} color={colors.saffron} />
                    </TouchableOpacity>
                  )}
                </View>
              );
            })
          )}
        </Card>

        {/* Volunteer Form */}
        <Card>
          <View style={styles.sectionHeader}>
            <Ionicons name="hand-right" size={22} color={colors.maroon} />
            <Text style={styles.sectionTitle}>{t('community.volunteer')}</Text>
          </View>
          <Text style={styles.formIntro}>
            {lang === 'hi'
              ? 'उत्सवों, भंडारे एवं सेवा कार्यों में अपना योगदान देने हेतु कृपया अपनी जानकारी दें:'
              : 'Please register your details to contribute towards temple festivals and seva:'}
          </Text>

          <Text style={styles.inputLabel}>{t('community.volunteerName')} *</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder={lang === 'hi' ? 'उदा. राजेश शर्मा' : 'e.g. Rajesh Sharma'}
            placeholderTextColor={colors.inkMuted}
          />

          <Text style={styles.inputLabel}>{t('community.volunteerPhone')}</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder={lang === 'hi' ? 'उदा. 9876543210' : 'e.g. 9876543210'}
            placeholderTextColor={colors.inkMuted}
            keyboardType="phone-pad"
          />

          <Text style={styles.inputLabel}>{t('community.volunteerInterest')}</Text>
          <TextInput
            style={styles.input}
            value={interest}
            onChangeText={setInterest}
            placeholder={
              lang === 'hi'
                ? 'उदा. भंडारा सेवा / सजावट / व्यवस्था'
                : 'e.g. Bhandara / Decoration / Crowd management'
            }
            placeholderTextColor={colors.inkMuted}
          />

          <PrimaryButton
            title={t('community.submit')}
            onPress={handleVolunteerSubmit}
            loading={submitting}
            style={styles.submitBtn}
          />
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  scrollContent: {
    padding: spacing.base,
    paddingBottom: 40,
  },
  whatsappCard: {
    backgroundColor: '#E8F5E9',
    borderColor: '#C8E6C9',
    borderWidth: 1.5,
  },
  whatsappRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  whatsappIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#25D366',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  whatsappTextContainer: {
    flex: 1,
  },
  whatsappTitle: {
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.bold,
    color: '#1B5E20',
  },
  whatsappSub: {
    fontSize: fontSize.caption + 1,
    color: colors.inkMuted,
    marginTop: 2,
  },
  whatsappButton: {
    backgroundColor: '#2E7D32',
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
  loader: {
    marginVertical: spacing.md,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 0.8,
    borderBottomColor: '#F5ECE0',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.saffron,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  avatarInitial: {
    color: colors.white,
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.bold,
  },
  memberMeta: {
    flex: 1,
  },
  memberName: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.ink,
  },
  memberRole: {
    fontSize: fontSize.caption + 1,
    color: colors.inkMuted,
    marginTop: 2,
  },
  callIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFEBD0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formIntro: {
    fontSize: fontSize.body - 1,
    color: colors.ink,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  inputLabel: {
    fontSize: fontSize.caption + 1,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
    marginBottom: 4,
  },
  input: {
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: '#D8CCA6',
    borderRadius: radius.button,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm + 2,
    fontSize: fontSize.body,
    color: colors.ink,
    marginBottom: spacing.md,
  },
  submitBtn: {
    marginTop: spacing.xs,
  },
});
