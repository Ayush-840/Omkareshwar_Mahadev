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
import { fetchTempleContact, submitFeedbackMessage } from '../src/services/firebase';
import { ScreenHeader } from '../src/components/common/ScreenHeader';
import { Card } from '../src/components/common/Card';
import { PrimaryButton } from '../src/components/common/PrimaryButton';
import { colors, spacing, fontSize, fontWeight, radius, shadow } from '../src/theme';
import { getCurrentLanguage } from '../src/i18n';

export default function ContactScreen() {
  const { t } = useTranslation();
  const lang = getCurrentLanguage();

  const [message, setMessage] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [sending, setSending] = useState(false);

  const { data: contact, isLoading } = useQuery({
    queryKey: ['templeContact'],
    queryFn: fetchTempleContact,
  });

  const handleCall = (num: string) => {
    Linking.openURL(`tel:${num.replace(/\s+/g, '')}`);
  };

  const handleWhatsApp = () => {
    if (contact?.whatsapp) {
      Linking.openURL(`whatsapp://send?phone=${contact.whatsapp.replace(/\D/g, '')}`);
    }
  };

  const handleEmail = () => {
    if (contact?.email) {
      Linking.openURL(`mailto:${contact.email}?subject=Mandir%20Devotee%20Inquiry`);
    }
  };

  const handleOpenMap = () => {
    if (contact?.mapUrl) {
      Linking.openURL(contact.mapUrl);
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!message.trim()) {
      Alert.alert(
        lang === 'hi' ? 'संदेश आवश्यक है' : 'Message required',
        lang === 'hi' ? 'कृपया अपना संदेश या सुझाव लिखें।' : 'Please enter your message or suggestion.'
      );
      return;
    }

    setSending(true);
    await submitFeedbackMessage({
      message: message.trim(),
      contact: contactInfo.trim() || undefined,
    });
    setSending(false);

    Alert.alert(
      lang === 'hi' ? 'प्रतिक्रिया प्रेषित' : 'Feedback Sent',
      t('contact.feedbackSent')
    );
    setMessage('');
    setContactInfo('');
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title={t('contact.title')} />

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.saffron} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Quick Action Buttons Grid (48 dp targets) */}
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={styles.actionTile}
              onPress={() => contact?.phones[0] && handleCall(contact.phones[0].number)}
              accessibilityRole="button"
              accessibilityLabel={t('contact.call')}
            >
              <View style={[styles.actionIconCircle, { backgroundColor: colors.tileNavy }]}>
                <Ionicons name="call" size={24} color={colors.white} />
              </View>
              <Text style={styles.actionLabel}>{t('contact.call')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionTile}
              onPress={handleWhatsApp}
              accessibilityRole="button"
              accessibilityLabel={t('contact.whatsapp')}
            >
              <View style={[styles.actionIconCircle, { backgroundColor: '#25D366' }]}>
                <Ionicons name="logo-whatsapp" size={24} color={colors.white} />
              </View>
              <Text style={styles.actionLabel}>{t('contact.whatsapp')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionTile}
              onPress={handleEmail}
              accessibilityRole="button"
              accessibilityLabel={t('contact.email')}
            >
              <View style={[styles.actionIconCircle, { backgroundColor: colors.tileRed }]}>
                <Ionicons name="mail" size={24} color={colors.white} />
              </View>
              <Text style={styles.actionLabel}>{t('contact.email')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionTile}
              onPress={handleOpenMap}
              accessibilityRole="button"
              accessibilityLabel={t('contact.openMap')}
            >
              <View style={[styles.actionIconCircle, { backgroundColor: colors.tileGreen }]}>
                <Ionicons name="map" size={24} color={colors.white} />
              </View>
              <Text style={styles.actionLabel}>{t('contact.openMap')}</Text>
            </TouchableOpacity>
          </View>

          {/* Contact Numbers & Hours */}
          <Card>
            <View style={styles.sectionHeader}>
              <Ionicons name="call-outline" size={22} color={colors.maroon} />
              <Text style={styles.sectionTitle}>{t('contact.hours')}</Text>
            </View>

            {contact?.phones.map((phone, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.phoneItem}
                onPress={() => handleCall(phone.number)}
                accessibilityRole="button"
                accessibilityLabel={`कॉल करें ${phone.label} ${phone.number}`}
              >
                <View style={styles.phoneMeta}>
                  <Text style={styles.phoneLabel}>{phone.label}</Text>
                  <Text style={styles.phoneNumber}>{phone.number}</Text>
                </View>
                <Ionicons name="call" size={20} color={colors.saffron} />
              </TouchableOpacity>
            ))}

            <View style={styles.emailRow}>
              <Ionicons name="mail-outline" size={18} color={colors.maroon} />
              <Text style={styles.emailText}>{contact?.email}</Text>
            </View>
          </Card>

          {/* Feedback & Suggestion Form */}
          <Card>
            <View style={styles.sectionHeader}>
              <Ionicons name="chatbubbles-outline" size={22} color={colors.maroon} />
              <Text style={styles.sectionTitle}>{t('contact.feedback')}</Text>
            </View>

            <Text style={styles.inputLabel}>{t('contact.feedback')}</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={message}
              onChangeText={setMessage}
              placeholder={t('contact.feedbackPlaceholder')}
              placeholderTextColor={colors.inkMuted}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <Text style={styles.inputLabel}>{t('contact.contactOptional')}</Text>
            <TextInput
              style={styles.input}
              value={contactInfo}
              onChangeText={setContactInfo}
              placeholder={
                lang === 'hi'
                  ? 'अपना नाम या फोन नंबर (वैकल्पिक)'
                  : 'Your name or phone (optional)'
              }
              placeholderTextColor={colors.inkMuted}
            />

            <PrimaryButton
              title={t('contact.send')}
              onPress={handleFeedbackSubmit}
              loading={sending}
              style={styles.submitBtn}
            />
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
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.base,
  },
  actionTile: {
    alignItems: 'center',
    flex: 1,
  },
  actionIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
    ...shadow.card,
  },
  actionLabel: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
    textAlign: 'center',
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
  phoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 0.8,
    borderBottomColor: '#F5ECE0',
    minHeight: 48,
  },
  phoneMeta: {
    flex: 1,
  },
  phoneLabel: {
    fontSize: fontSize.caption + 1,
    color: colors.inkMuted,
  },
  phoneNumber: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.ink,
    marginTop: 2,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingTop: spacing.md,
  },
  emailText: {
    fontSize: fontSize.body,
    color: colors.ink,
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
  textArea: {
    minHeight: 90,
  },
  submitBtn: {
    marginTop: spacing.xs,
  },
});
