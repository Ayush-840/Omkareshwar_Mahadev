import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  TempleInfo,
  TempleContact,
  Aarti,
  EventItem,
  Notice,
  Album,
  Photo,
  VideoItem,
  Member,
  DonationInfo,
  Volunteer,
  FeedbackMessage,
  PushTokenRecord,
} from '../types';

import {
  initialTempleInfo,
  initialTempleContact,
  initialAartis,
  initialEvents,
  initialNotices,
  initialAlbums,
  initialPhotos,
  initialVideos,
  initialMembers,
  initialDonationInfo,
} from './mockData';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || 'AIzaSyMockKeyForDevOTE1234567890',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || 'onkareshwar-mandir.firebaseapp.com',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || 'onkareshwar-mandir',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || 'onkareshwar-mandir.appspot.com',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '1234567890',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '1:1234567890:web:abcdef123456',
};

const hasRealFirebase = Boolean(
  process.env.EXPO_PUBLIC_FIREBASE_API_KEY &&
  process.env.EXPO_PUBLIC_FIREBASE_API_KEY !== 'AIzaSyMockKeyForDevOTE1234567890'
);

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

// Local storage keys for caching and offline resilience (TRD decision 1)
const CACHE_KEYS = {
  TEMPLE_INFO: '@mandir_temple_info',
  TEMPLE_CONTACT: '@mandir_temple_contact',
  AARTIS: '@mandir_aartis',
  EVENTS: '@mandir_events',
  NOTICES: '@mandir_notices',
  ALBUMS: '@mandir_albums',
  PHOTOS: '@mandir_photos_',
  VIDEOS: '@mandir_videos',
  MEMBERS: '@mandir_members',
  DONATION_INFO: '@mandir_donation_info',
};

// Generic storage helper
async function getCachedOrFallback<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // continue
  }
  return fallback;
}

async function setCache<T>(key: string, data: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch {
    // ignore
  }
}

// Data fetchers with caching
export const fetchTempleInfo = async (): Promise<TempleInfo> => {
  if (hasRealFirebase) {
    try {
      const docRef = doc(db, 'temple', 'info');
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data() as TempleInfo;
        await setCache(CACHE_KEYS.TEMPLE_INFO, data);
        return data;
      }
    } catch {
      // fallback to cache
    }
  }
  return getCachedOrFallback(CACHE_KEYS.TEMPLE_INFO, initialTempleInfo);
};

export const fetchTempleContact = async (): Promise<TempleContact> => {
  if (hasRealFirebase) {
    try {
      const docRef = doc(db, 'temple', 'contact');
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data() as TempleContact;
        await setCache(CACHE_KEYS.TEMPLE_CONTACT, data);
        return data;
      }
    } catch {
      // fallback
    }
  }
  return getCachedOrFallback(CACHE_KEYS.TEMPLE_CONTACT, initialTempleContact);
};

export const fetchAartis = async (): Promise<Aarti[]> => {
  if (hasRealFirebase) {
    try {
      const snap = await getDocs(collection(db, 'aartis'));
      if (!snap.empty) {
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Aarti));
        items.sort((a, b) => a.order - b.order);
        await setCache(CACHE_KEYS.AARTIS, items);
        return items;
      }
    } catch {
      // fallback
    }
  }
  return getCachedOrFallback(CACHE_KEYS.AARTIS, initialAartis);
};

export const fetchEvents = async (): Promise<EventItem[]> => {
  if (hasRealFirebase) {
    try {
      const snap = await getDocs(collection(db, 'events'));
      if (!snap.empty) {
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as EventItem));
        items.sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
        await setCache(CACHE_KEYS.EVENTS, items);
        return items;
      }
    } catch {
      // fallback
    }
  }
  return getCachedOrFallback(CACHE_KEYS.EVENTS, initialEvents);
};

export const fetchNotices = async (): Promise<Notice[]> => {
  if (hasRealFirebase) {
    try {
      const snap = await getDocs(collection(db, 'notices'));
      if (!snap.empty) {
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Notice));
        items.sort((a, b) => {
          if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        await setCache(CACHE_KEYS.NOTICES, items);
        return items;
      }
    } catch {
      // fallback
    }
  }
  return getCachedOrFallback(CACHE_KEYS.NOTICES, initialNotices);
};

export const fetchAlbums = async (): Promise<Album[]> => {
  if (hasRealFirebase) {
    try {
      const snap = await getDocs(collection(db, 'albums'));
      if (!snap.empty) {
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Album));
        items.sort((a, b) => a.order - b.order);
        await setCache(CACHE_KEYS.ALBUMS, items);
        return items;
      }
    } catch {
      // fallback
    }
  }
  return getCachedOrFallback(CACHE_KEYS.ALBUMS, initialAlbums);
};

export const fetchPhotos = async (albumId: string): Promise<Photo[]> => {
  if (hasRealFirebase) {
    try {
      const snap = await getDocs(collection(db, 'albums', albumId, 'photos'));
      if (!snap.empty) {
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Photo));
        items.sort((a, b) => a.order - b.order);
        await setCache(`${CACHE_KEYS.PHOTOS}${albumId}`, items);
        return items;
      }
    } catch {
      // fallback
    }
  }
  const fallback = initialPhotos[albumId] || [];
  return getCachedOrFallback(`${CACHE_KEYS.PHOTOS}${albumId}`, fallback);
};

export const fetchVideos = async (): Promise<VideoItem[]> => {
  if (hasRealFirebase) {
    try {
      const snap = await getDocs(collection(db, 'videos'));
      if (!snap.empty) {
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as VideoItem));
        items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        await setCache(CACHE_KEYS.VIDEOS, items);
        return items;
      }
    } catch {
      // fallback
    }
  }
  return getCachedOrFallback(CACHE_KEYS.VIDEOS, initialVideos);
};

export const fetchMembers = async (): Promise<Member[]> => {
  if (hasRealFirebase) {
    try {
      const snap = await getDocs(collection(db, 'members'));
      if (!snap.empty) {
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Member));
        items.sort((a, b) => a.order - b.order);
        await setCache(CACHE_KEYS.MEMBERS, items);
        return items;
      }
    } catch {
      // fallback
    }
  }
  return getCachedOrFallback(CACHE_KEYS.MEMBERS, initialMembers);
};

export const fetchDonationInfo = async (): Promise<DonationInfo> => {
  if (hasRealFirebase) {
    try {
      const docRef = doc(db, 'donationInfo', 'main');
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data() as DonationInfo;
        await setCache(CACHE_KEYS.DONATION_INFO, data);
        return data;
      }
    } catch {
      // fallback
    }
  }
  return getCachedOrFallback(CACHE_KEYS.DONATION_INFO, initialDonationInfo);
};

// Client create-only submissions (volunteers, feedback, push tokens)
export const submitVolunteerRegistration = async (volunteer: Omit<Volunteer, 'createdAt'>): Promise<boolean> => {
  if (hasRealFirebase) {
    try {
      await addDoc(collection(db, 'volunteers'), {
        ...volunteer,
        createdAt: serverTimestamp(),
      });
      return true;
    } catch {
      // ignore
    }
  }
  // Store locally as backup
  try {
    const raw = await AsyncStorage.getItem('@mandir_pending_volunteers');
    const existing = raw ? JSON.parse(raw) : [];
    existing.push({ ...volunteer, createdAt: new Date().toISOString() });
    await AsyncStorage.setItem('@mandir_pending_volunteers', JSON.stringify(existing));
    return true;
  } catch {
    return true;
  }
};

export const submitFeedbackMessage = async (feedback: Omit<FeedbackMessage, 'createdAt'>): Promise<boolean> => {
  if (hasRealFirebase) {
    try {
      await addDoc(collection(db, 'feedback'), {
        ...feedback,
        createdAt: serverTimestamp(),
      });
      return true;
    } catch {
      // ignore
    }
  }
  try {
    const raw = await AsyncStorage.getItem('@mandir_pending_feedback');
    const existing = raw ? JSON.parse(raw) : [];
    existing.push({ ...feedback, createdAt: new Date().toISOString() });
    await AsyncStorage.setItem('@mandir_pending_feedback', JSON.stringify(existing));
    return true;
  } catch {
    return true;
  }
};

export const registerPushToken = async (record: Omit<PushTokenRecord, 'createdAt'>): Promise<void> => {
  if (hasRealFirebase) {
    try {
      await addDoc(collection(db, 'pushTokens'), {
        ...record,
        createdAt: serverTimestamp(),
      });
    } catch {
      // ignore
    }
  }
};

// Admin operations
export const adminLogin = async (email: string, pass: string): Promise<boolean> => {
  if (hasRealFirebase) {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      return true;
    } catch {
      return false;
    }
  }
  // Local admin mock credentials for development/testing
  if (email.trim().toLowerCase() === 'admin@mandir.org' && pass === 'mandir108') {
    await AsyncStorage.setItem('@mandir_admin_auth', JSON.stringify({ email, token: 'local_token' }));
    return true;
  }
  return false;
};

export const adminLogout = async (): Promise<void> => {
  if (hasRealFirebase) {
    try {
      await signOut(auth);
    } catch {
      // ignore
    }
  }
  await AsyncStorage.removeItem('@mandir_admin_auth');
};

export const isAdminLoggedIn = async (): Promise<boolean> => {
  if (hasRealFirebase && auth.currentUser) {
    return true;
  }
  try {
    const raw = await AsyncStorage.getItem('@mandir_admin_auth');
    return Boolean(raw);
  } catch {
    return false;
  }
};

export const createNotice = async (notice: Omit<Notice, 'id' | 'createdAt'>): Promise<Notice> => {
  const newNotice: Notice = {
    ...notice,
    id: `notice-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  if (hasRealFirebase) {
    try {
      const docRef = await addDoc(collection(db, 'notices'), {
        ...notice,
        createdAt: serverTimestamp(),
      });
      newNotice.id = docRef.id;
    } catch {
      // continue with local store
    }
  }

  const notices = await fetchNotices();
  const updated = [newNotice, ...notices];
  await setCache(CACHE_KEYS.NOTICES, updated);
  return newNotice;
};

export const createEvent = async (event: Omit<EventItem, 'id' | 'createdAt'>): Promise<EventItem> => {
  const newEvent: EventItem = {
    ...event,
    id: `event-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  if (hasRealFirebase) {
    try {
      const docRef = await addDoc(collection(db, 'events'), {
        ...event,
        createdAt: serverTimestamp(),
      });
      newEvent.id = docRef.id;
    } catch {
      // continue
    }
  }

  const events = await fetchEvents();
  const updated = [...events, newEvent];
  await setCache(CACHE_KEYS.EVENTS, updated);
  return newEvent;
};

export const createPhotoInAlbum = async (
  albumId: string,
  photo: Omit<Photo, 'id'>
): Promise<Photo> => {
  const newPhoto: Photo = {
    ...photo,
    id: `photo-${Date.now()}`,
  };

  if (hasRealFirebase) {
    try {
      const docRef = await addDoc(collection(db, 'albums', albumId, 'photos'), photo);
      newPhoto.id = docRef.id;
    } catch {
      // continue
    }
  }

  const photos = await fetchPhotos(albumId);
  const updated = [...photos, newPhoto];
  await setCache(`${CACHE_KEYS.PHOTOS}${albumId}`, updated);
  return newPhoto;
};
