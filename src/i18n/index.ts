import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import hi from './locales/hi.json';
import en from './locales/en.json';

const LANGUAGE_KEY = '@mandir_app_language';

export const resources = {
  hi: { translation: hi },
  en: { translation: en },
} as const;

export type SupportedLanguage = 'hi' | 'en';

export const initI18n = async (): Promise<void> => {
  let savedLanguage: string | null = null;
  try {
    savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
  } catch {
    // fallback
  }

  // If no saved language, use device locale if it starts with 'hi', otherwise default to 'hi' as per rule 3
  const deviceLocale = Localization.getLocales()[0]?.languageCode;
  const initialLanguage: SupportedLanguage =
    savedLanguage === 'hi' || savedLanguage === 'en'
      ? savedLanguage
      : deviceLocale === 'en'
      ? 'en'
      : 'hi';

  await i18n.use(initReactI18next).init({
    resources,
    lng: initialLanguage,
    fallbackLng: 'hi',
    compatibilityJSON: 'v4',
    interpolation: {
      escapeValue: false,
    },
  });
};

export const changeLanguage = async (lang: SupportedLanguage): Promise<void> => {
  await i18n.changeLanguage(lang);
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
  } catch {
    // Ignore storage errors
  }
};

export const getCurrentLanguage = (): SupportedLanguage => {
  const current = i18n.language;
  return current === 'en' ? 'en' : 'hi';
};

export default i18n;
