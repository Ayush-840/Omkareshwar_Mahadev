import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { adminLogin, isAdminLoggedIn } from '../../src/services/firebase';
import { ScreenHeader } from '../../src/components/common/ScreenHeader';
import { Card } from '../../src/components/common/Card';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { colors, spacing, fontSize, fontWeight, radius } from '../../src/theme';
import { getCurrentLanguage } from '../../src/i18n';

export default function AdminLoginScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const lang = getCurrentLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const loggedIn = await isAdminLoggedIn();
      if (loggedIn) {
        router.replace('/admin/dashboard');
      }
    }
    checkAuth();
  }, [router]);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setErrorMessage(
        lang === 'hi'
          ? 'कृपया ईमेल और पासवर्ड दोनों दर्ज करें।'
          : 'Please enter both email and password.'
      );
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    const success = await adminLogin(email.trim(), password);
    setLoading(false);

    if (success) {
      router.replace('/admin/dashboard');
    } else {
      setErrorMessage(t('admin.loginError'));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScreenHeader title={lang === 'hi' ? 'समिति प्रबंधक लॉगिन' : 'Admin Login'} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.iconCircle}>
          <Ionicons name="lock-closed" size={36} color={colors.maroon} />
        </View>

        <Text style={styles.title}>
          {lang === 'hi' ? 'मंदिर समिति व्यवस्थापक' : 'Mandir Committee Portal'}
        </Text>
        <Text style={styles.subtitle}>
          {lang === 'hi'
            ? 'केवल अधिकृत समिति सदस्यों हेतु'
            : 'For authorized committee members only'}
        </Text>

        <Card style={styles.loginCard}>
          {errorMessage && (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle" size={18} color={colors.danger} />
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}

          <Text style={styles.label}>{t('admin.email')}</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(txt) => {
              setEmail(txt);
              setErrorMessage(null);
            }}
            placeholder="admin@mandir.org"
            placeholderTextColor={colors.inkMuted}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>{t('admin.password')}</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(txt) => {
              setPassword(txt);
              setErrorMessage(null);
            }}
            placeholder="••••••••"
            placeholderTextColor={colors.inkMuted}
            secureTextEntry
          />

          <PrimaryButton
            title={t('admin.login')}
            onPress={handleLogin}
            loading={loading}
            style={styles.loginBtn}
          />
        </Card>

        {/* Development Helper Hint */}
        <View style={styles.devHintBox}>
          <Text style={styles.devHintText}>
            {lang === 'hi'
              ? 'डेमो लॉगिन: admin@mandir.org / mandir108'
              : 'Demo Login: admin@mandir.org / mandir108'}
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  scrollContent: {
    padding: spacing.base,
    paddingTop: spacing.xl,
    alignItems: 'center',
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FFE8B8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSize.screenTitle,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fontSize.caption + 1,
    color: colors.inkMuted,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  loginCard: {
    width: '100%',
    padding: spacing.lg,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    padding: spacing.sm,
    borderRadius: radius.card / 2,
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  errorText: {
    fontSize: fontSize.caption + 1,
    color: colors.danger,
    flex: 1,
  },
  label: {
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
  loginBtn: {
    marginTop: spacing.sm,
  },
  devHintBox: {
    marginTop: spacing.lg,
    padding: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: radius.pill,
  },
  devHintText: {
    fontSize: fontSize.caption,
    color: colors.inkMuted,
  },
});
