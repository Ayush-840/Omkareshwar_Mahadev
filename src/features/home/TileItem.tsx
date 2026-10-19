import React, { useRef } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  View,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { Href } from 'expo-router';
import { colors, spacing, fontSize, fontWeight, shadow } from '../../theme';

export interface TileConfig {
  id: string;
  labelKey: string;
  labelFallbackHi: string;
  labelFallbackEn: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  route: Href;
}

interface TileItemProps {
  tile: TileConfig;
  label: string;
  onPress: () => void;
}

const { width: windowWidth } = Dimensions.get('window');
const TILE_WIDTH = Math.min((windowWidth - spacing.base * 2) / 3, 120);

export const TileItem: React.FC<TileItemProps> = ({ tile, label, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.94,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, styles.tileWrapper]}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.88}
        accessibilityRole="button"
        accessibilityLabel={`${label} खोलने के लिए टैप करें`}
      >
        <View style={[styles.iconSquare, { backgroundColor: tile.color }]}>
          {/* Glossy top highlight for the 3D squircle look */}
          <View style={styles.iconHighlight} pointerEvents="none" />
          <MaterialCommunityIcons name={tile.icon} size={34} color={colors.white} />
        </View>

        <Text style={styles.label} numberOfLines={2}>
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tileWrapper: {
    width: TILE_WIDTH,
    alignItems: 'center',
    marginBottom: spacing.base + 4,
  },
  touchable: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: spacing.xs,
  },
  iconSquare: {
    width: 70,
    height: 70,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: spacing.sm + 2,
    ...shadow.card,
    shadowOpacity: 0.22,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  iconHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '46%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  label: {
    fontSize: fontSize.tileLabel,
    fontWeight: fontWeight.bold,
    color: '#1A1A1A',
    textAlign: 'center',
    paddingHorizontal: 2,
    lineHeight: 20,
  },
});
