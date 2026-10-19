export interface BilingualText {
  hi: string;
  en: string;
}

export interface Deity {
  name: BilingualText;
  imageUrl?: string;
  description?: BilingualText;
}

export interface TempleTiming {
  label: BilingualText;
  from: string; // "HH:mm"
  to: string;   // "HH:mm"
}

export interface TempleInfo {
  name: BilingualText;
  history: BilingualText;
  deities: Deity[];
  address: BilingualText;
  location: {
    lat: number;
    lng: number;
  };
  timings: TempleTiming[];
  facilities: BilingualText[];
  heroImageUrl?: string;
  updatedAt?: string;
}

export interface TemplePhone {
  label: string;
  number: string;
}

export interface TempleContact {
  phones: TemplePhone[];
  whatsapp: string;
  email: string;
  mapUrl: string;
  addressText?: BilingualText;
}

export interface Aarti {
  id: string;
  title: BilingualText;
  time: string; // "HH:mm" in IST
  days: number[]; // 0-6, Sunday = 0
  audioUrl?: string;
  bundledAudioKey?: string;
  lyrics: BilingualText;
  order: number;
  active: boolean;
  meaning?: BilingualText;
}

export interface EventItem {
  id: string;
  title: BilingualText;
  description: BilingualText;
  startAt: string; // ISO string
  endAt?: string;  // ISO string
  location?: BilingualText;
  imageUrl?: string;
  pinned: boolean;
  createdAt: string;
}

export interface Notice {
  id: string;
  title: BilingualText;
  body: BilingualText;
  imageUrl?: string;
  pinned: boolean;
  createdAt: string;
  pushSent?: boolean;
  createdBy?: string;
}

export interface Album {
  id: string;
  title: BilingualText;
  coverUrl: string;
  date: string;
  count: number;
  order: number;
}

export interface Photo {
  id: string;
  url: string;
  thumbUrl: string;
  caption?: BilingualText;
  order: number;
}

export interface VideoItem {
  id: string;
  title: BilingualText;
  youtubeId: string;
  category: 'aarti' | 'festival' | 'katha';
  createdAt: string;
}

export interface Member {
  id: string;
  name: BilingualText;
  role: BilingualText;
  photoUrl?: string;
  phone?: string;
  showPhone: boolean;
  order: number;
}

export interface Volunteer {
  name: string;
  phone?: string;
  interest: string;
  createdAt: string;
}

export interface DonationPurpose {
  title: BilingualText;
  description: BilingualText;
}

export interface FinancialSummary {
  month: string; // 'YYYY-MM'
  income: number;
  spend: number;
  note?: BilingualText;
}

export interface DonationInfo {
  purposes: DonationPurpose[];
  trustName: string;
  registrationNote?: string;
  externalDonateUrl: string;
  receiptContact: string;
  summaries: FinancialSummary[];
}

export interface PushTokenRecord {
  token: string;
  platform: 'ios' | 'android';
  language: 'hi' | 'en';
  createdAt: string;
}

export interface FeedbackMessage {
  message: string;
  contact?: string;
  createdAt: string;
}

export interface AdminUser {
  email: string;
  role: 'admin';
  createdAt: string;
}
