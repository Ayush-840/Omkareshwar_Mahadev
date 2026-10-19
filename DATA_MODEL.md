# Data Model (Firestore)

Bilingual text fields use `{ hi: string, en: string }`. Timestamps are Firestore `Timestamp`. IDs are auto-generated unless noted.

## temple/info (document)

```ts
{
  name: { hi, en },
  history: { hi, en },
  deities: [{ name: { hi, en }, imageUrl }],
  address: { hi, en },
  location: { lat: number, lng: number },
  timings: [{ label: { hi, en }, from: 'HH:mm', to: 'HH:mm' }],
  facilities: [{ hi, en }],
  heroImageUrl: string,
  updatedAt: Timestamp
}
```

## temple/contact (document)

```ts
{ phones: [{ label, number }], whatsapp: string, email: string, mapUrl: string }
```

## aartis

```ts
{
  title: { hi, en },
  time: 'HH:mm',            // IST
  days: number[],            // 0 to 6, Sunday = 0
  audioUrl?: string,
  bundledAudioKey?: string,  // for audio shipped inside the app
  lyrics: { hi, en },
  order: number,
  active: boolean
}
```

## events

```ts
{
  title: { hi, en }, description: { hi, en },
  startAt: Timestamp, endAt?: Timestamp,
  location?: { hi, en }, imageUrl?: string,
  pinned: boolean, createdAt: Timestamp
}
```

## notices

```ts
{
  title: { hi, en }, body: { hi, en },
  imageUrl?: string, pinned: boolean,
  createdAt: Timestamp, pushSent: boolean, createdBy: string
}
```

## albums and albums/{albumId}/photos

```ts
// album
{ title: { hi, en }, coverUrl: string, date: Timestamp, count: number, order: number }
// photo
{ url: string, thumbUrl: string, caption?: { hi, en }, order: number }
```

## videos

```ts
{ title: { hi, en }, youtubeId: string, category: 'aarti' | 'festival' | 'katha', createdAt: Timestamp }
```

## members

```ts
{ name: { hi, en }, role: { hi, en }, photoUrl?: string, phone?: string, showPhone: boolean, order: number }
```

## volunteers (create-only from clients)

```ts
{ name: string, phone?: string, interest: string, createdAt: Timestamp }
```

## donationInfo (document)

```ts
{
  purposes: [{ title: { hi, en }, description: { hi, en } }],
  trustName: string, registrationNote?: string,
  externalDonateUrl: string,
  receiptContact: string,
  summaries: [{ month: 'YYYY-MM', income: number, spend: number, note?: { hi, en } }]
}
```

Bank and UPI details: publish only if the committee approves, and check store rules before showing them in the iOS app.

## pushTokens (create-only from clients)

```ts
{ token: string, platform: 'ios' | 'android', language: 'hi' | 'en', createdAt: Timestamp }
```

Document ID = a hash of the token to avoid duplicates.

## feedback (create-only from clients, admin read)

```ts
{ message: string, contact?: string, createdAt: Timestamp }
```

## admins

```ts
// docId = Firebase Auth uid
{ email: string, role: 'admin', createdAt: Timestamp }
```

## Indexes

- `events`: `startAt` ascending
- `notices`: `pinned` descending, `createdAt` descending
- `videos`: `category` ascending, `createdAt` descending

## Storage layout

```
/albums/{albumId}/{photoId}.jpg
/albums/{albumId}/thumbs/{photoId}.jpg
/audio/{aartiId}.mp3
/events/{eventId}.jpg
/notices/{noticeId}.jpg
```

Limits: images up to 1600 px long edge, audio up to 5 MB each.
