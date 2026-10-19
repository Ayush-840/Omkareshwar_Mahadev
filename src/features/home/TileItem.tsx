import React, { useRef } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  View,
  Image,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, fontSize, fontWeight, shadow } from '../../theme';

export interface TileConfig {
  id: string;
  labelKey: string;
  labelFallbackHi: string;
  labelFallbackEn: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  image?: ImageSourcePropType;
  route: string;
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
        <View style={styles.iconContainer}>
          {tile.image ? (
            <Image
              source={tile.image}
              style={styles.tileImage}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.iconSquare, { backgroundColor: tile.color }]}>
              <Ionicons name={tile.icon} size={32} color={colors.white} />
            </View>
          )}
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
    marginBottom: spacing.base + 2,
  },
  touchable: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: spacing.xs,
  },
  iconContainer: {
    width: 68,
    height: 68,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: spacing.xs + 4,
    ...shadow.card,
    elevation: 4,
  },
  tileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  iconSquare: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
