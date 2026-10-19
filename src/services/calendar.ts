import * as Calendar from 'expo-calendar';
import { Platform } from 'react-native';
import { EventItem } from '../types';
import { getCurrentLanguage } from '../i18n';

async function getDefaultCalendarSource(): Promise<Calendar.Source | undefined> {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

export const addEventToPhoneCalendar = async (event: EventItem): Promise<boolean> => {
  try {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== 'granted') {
      return false;
    }

    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    let targetCalendarId = calendars.find((cal) => cal.allowsModifications)?.id;

    if (!targetCalendarId && Platform.OS === 'ios') {
      const defaultSource = await getDefaultCalendarSource();
      if (defaultSource) {
        targetCalendarId = await Calendar.createCalendarAsync({
          title: 'Mandir Events',
          color: '#F28C28',
          entityType: Calendar.EntityTypes.EVENT,
          sourceId: defaultSource.id,
          source: defaultSource,
          name: 'Mandir Events',
          ownerAccount: 'personal',
          accessLevel: Calendar.CalendarAccessLevel.OWNER,
        });
      }
    }

    if (!targetCalendarId && calendars.length > 0) {
      targetCalendarId = calendars[0].id;
    }

    if (!targetCalendarId) return false;

    const lang = getCurrentLanguage();
    const title = lang === 'hi' ? event.title.hi : event.title.en;
    const notes = lang === 'hi' ? event.description.hi : event.description.en;
    const location = event.location
      ? lang === 'hi'
        ? event.location.hi
        : event.location.en
      : 'Shri Onkareshwar Mahadev Mandir';

    const startDate = new Date(event.startAt);
    const endDate = event.endAt
      ? new Date(event.endAt)
      : new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours default

    await Calendar.createEventAsync(targetCalendarId, {
      title,
      notes,
      location,
      startDate,
      endDate,
      timeZone: 'Asia/Kolkata',
    });

    return true;
  } catch {
    return false;
  }
};
