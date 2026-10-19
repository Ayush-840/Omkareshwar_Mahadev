import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, radius, spacing, fontSize, fontWeight, shadow } from '../../theme';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
  accessibilityLabel,
  variant = 'primary',
}) => {
  const getBackgroundColor = () => {
    if (disabled) return '#E0D6C8';
    if (variant === 'secondary') return colors.maroon;
    if (variant === 'outline') return 'transparent';
    return colors.saffron;
  };

  const getTextColor = () => {
    if (disabled) return '#8C8276';
    if (variant === 'outline') return colors.maroon;
    return colors.white;
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        variant === 'outline' && styles.outlineButton,
        variant !== 'outline' && !disabled && shadow.card,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 52, // >= 48 dp touch target rule
    borderRadius: radius.button,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: colors.maroon,
  },
  text: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
  },
});
