import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { registerPushToken } from './firebase';
import { getCurrentLanguage } from '../i18n';

// Configure notification behavior for foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/**
 * Creates Android notification channels as specified in TRD.md
 */
export const setupNotificationChannels = async (): Promise<void> => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('notices', {
      name: 'सूचनाएं एवं समाचार (Notices)',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#F28C28',
      sound: 'default',
    });

    await Notifications.setNotificationChannelAsync('events', {
      name: 'कार्यक्रम (Events)',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 200, 200, 200],
      lightColor: '#F5C24B',
      sound: 'default',
    });

    await Notifications.setNotificationChannelAsync('aarti', {
      name: 'आरती अनुस्मारक (Aarti Reminders)',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 300, 200, 300],
      lightColor: '#7A1F1F',
      sound: 'default',
    });
  }
};

/**
 * Contextual permission request: asks only when the user taps "Remind me" or "Notify me".
 */
export const requestNotificationPermissionInContext = async (): Promise<boolean> => {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return false;
    }

    await setupNotificationChannels();

    // Get push token anonymously and register
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;

      const tokenData = await Notifications.getExpoPushTokenAsync({
        projectId: projectId || undefined,
      });

      if (tokenData?.data) {
        await registerPushToken({
          token: tokenData.data,
          platform: Platform.OS === 'ios' ? 'ios' : 'android',
          language: getCurrentLanguage(),
        });
      }
    } catch {
      // Continue gracefully
    }

    return true;
  } catch {
    return false;
  }
};

/**
 * Schedule a local offline reminder 10 minutes before an aarti time (e.g. "19:00")
 */
export const scheduleAartiReminder = async (
  aartiId: string,
  titleHi: string,
  titleEn: string,
  timeStr: string // "HH:mm"
): Promise<string | null> => {
  const permitted = await requestNotificationPermissionInContext();
  if (!permitted) return null;

  const [hh, mm] = timeStr.split(':').map(Number);
  let reminderMinutes = mm - 10;
  let reminderHours = hh;

  if (reminderMinutes < 0) {
    reminderMinutes += 60;
    reminderHours = (reminderHours - 1 + 24) % 24;
  }

  const lang = getCurrentLanguage();
  const title = lang === 'hi' ? `आरती अनुस्मारक: ${titleHi}` : `Aarti Reminder: ${titleEn}`;
  const body =
    lang === 'hi'
      ? `${titleHi} 10 मिनट में प्रारंभ होगी (${timeStr})।`
      : `${titleEn} will start in 10 minutes (${timeStr}).`;

  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: 'default',
        data: { url: `mandir://aarti/${aartiId}`, aartiId },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: reminderHours,
        minute: reminderMinutes,
        channelId: 'aarti',
      },
    });

    return notificationId;
  } catch {
    return null;
  }
};

export const cancelScheduledNotification = async (notificationId: string): Promise<void> => {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  } catch {
    // ignore
  }
};
