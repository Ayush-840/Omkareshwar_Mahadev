// Colour palette from DESIGN.md
export const colors = {
  saffron: '#F28C28',    // Primary buttons, header gradient start
  gold: '#F5C24B',       // Header gradient end, highlights
  cream: '#FFF6E3',      // Screen and card background
  maroon: '#7A1F1F',     // Titles, ribbons, active tab
  ink: '#2B1B12',        // Body text
  inkMuted: '#6B5A4E',   // Secondary text
  white: '#FFFFFF',      // Cards on cream
  success: '#2E9E4F',    // Confirmations
  danger: '#D64545',     // Errors

  // Tile colours
  tileOrange: '#F26A21',
  tileAmber: '#E8962B',
  tilePurple: '#6B2FBF',
  tileBlue: '#2F5BEA',
  tileGreen: '#2E9E4F',
  tileRed: '#E04848',
  tileViolet: '#7B3FD1',
  tileGold: '#F0A020',
  tileNavy: '#2A52C9',
} as const;

// Spacing scale (4-pt grid)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 24,
  xl: 32,
} as const;

// Screen padding
export const screenPadding = spacing.base;

// Border radius
export const radius = {
  tile: 20,
  card: 16,
  button: 14,
  pill: 999,
} as const;

// Typography sizes
export const fontSize = {
  heroTitle: 28,
  screenTitle: 22,
  body: 16,
  bodyLarge: 18,
  tileLabel: 15,
  caption: 13,
} as const;

// Font weights
export const fontWeight = {
  regular: '400' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

// Font families (loaded via expo-font)
export const fontFamily = {
  devanagari: 'NotoSansDevanagari',
  devanagariSerif: 'TiroDevanagariHindi',
  sans: 'NotoSans',
} as const;

// Line height multiplier
export const lineHeight = 1.4;

// Elevation / shadow
export const shadow = {
  card: {
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
};
