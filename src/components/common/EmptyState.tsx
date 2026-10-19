import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { colors, spacing, fontSize } from '../../theme';
import { PrimaryButton } from './PrimaryButton';

interface EmptyStateProps {
  message?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  icon = 'document-text-outline',
  actionText,
  onAction,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={64} color={colors.inkMuted} style={styles.icon} />
      <Text style={styles.message}>{message || t('common.noData')}</Text>
      {actionText && onAction && (
        <PrimaryButton
          title={actionText}
          onPress={onAction}
          style={styles.actionBtn}
          variant="outline"
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
    minHeight: 220,
  },
  icon: {
    opacity: 0.5,
    marginBottom: spacing.md,
  },
  message: {
    fontSize: fontSize.body,
    color: colors.inkMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  actionBtn: {
    marginTop: spacing.lg,
    minWidth: 160,
  },
});
