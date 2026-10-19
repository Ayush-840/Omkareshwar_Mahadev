import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { colors, spacing, fontSize, fontWeight } from '../../theme';
import { PrimaryButton } from './PrimaryButton';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container} accessibilityRole="alert">
      <Ionicons name="alert-circle-outline" size={60} color={colors.danger} />
      <Text style={styles.title}>{t('common.error')}</Text>
      <Text style={styles.message}>{message || t('common.error')}</Text>
      {onRetry && (
        <PrimaryButton
          title={t('common.retry')}
          onPress={onRetry}
          style={styles.retryBtn}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 250,
  },
  title: {
    fontSize: fontSize.screenTitle,
    fontWeight: fontWeight.bold,
    color: colors.danger,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  message: {
    fontSize: fontSize.body,
    color: colors.inkMuted,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  retryBtn: {
    minWidth: 160,
  },
});
