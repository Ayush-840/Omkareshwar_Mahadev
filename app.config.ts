import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'Onkareshwar Mandir',
  slug: 'mandir-app',
  scheme: 'mandir',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#FFF6E3',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'in.mandir.onkareshwar',
    infoPlist: {
      UIBackgroundModes: ['audio'],
      NSCameraUsageDescription: 'Used to upload photos to albums.',
      NSPhotoLibraryUsageDescription: 'Used to select photos for albums.',
    },
  },
  android: {
    package: 'in.mandir.onkareshwar',
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#FFF6E3',
    },
    permissions: [
      'RECEIVE_BOOT_COMPLETED',
      'VIBRATE',
      'SCHEDULE_EXACT_ALARM',
    ],
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    'expo-font',
    [
      'expo-notifications',
      {
        icon: './assets/images/notification-icon.png',
        color: '#F28C28',
        sounds: [],
        androidMode: 'default',
        androidCollapsedTitle: 'मंदिर सूचना',
      },
    ],
    [
      'expo-audio',
      {
        microphonePermission: false,
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID,
    },
  },
};

export default config;
