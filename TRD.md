# Technical Requirements Document (TRD)

**Version:** 0.1 | **Date:** 2026-10-19 | **Related:** PRD.md, DATA_MODEL.md, SECURITY.md

## 1. Overview

A single Expo (React Native) TypeScript app for Android and iOS, backed by Firebase. Devotees use the app without logging in; committee admins log in with email and password and write content. Push notifications use `expo-notifications` and the Expo Push Service.

## 2. Architecture

```
Admin area (login) ---> Firebase (Auth, Firestore, Storage, Cloud Function) ---> Devotee screens (read-only)
                                   |
                                   +-- on new notice --> Expo Push Service --> FCM / APNs --> phones
Videos: Firestore stores YouTube IDs; app plays from YouTube.
```

## 3. Technology choices

| Concern | Choice | Notes |
| --- | --- | --- |
| Framework | Expo SDK (current at start; check `npx create-expo-app@latest`) | Dev builds, not Expo Go, for push/audio testing |
| Language | TypeScript (strict) | |
| Navigation | Expo Router | File-based, deep links |
| State/data | TanStack Query + Firestore | Persist cache to AsyncStorage for offline |
| Backend | Firebase: Firestore, Auth, Storage, Functions | Storage and Functions need Blaze plan; set budget alert |
| Push | expo-notifications + Expo Push Service | FCM v1 credentials for Android, APNs key via EAS |
| i18n | i18next + expo-localization | hi, en |
| Lists/images | FlashList, expo-image | |
| Audio/video | expo-audio, expo-video | Verify current Expo docs |
| Build/release | EAS Build, EAS Submit, EAS Update | |
| CI | GitHub Actions: lint, typecheck, test | |
| Monitoring | Firebase Crashlytics or Sentry | Disclose in privacy policy |

## 3.1 Platform requirements

- Android builds must target API level 36 or higher for new apps and updates (Google Play requirement from 31 Aug 2026; extension to 1 Nov 2026 can be requested). Confirm in the build output.
- iOS: build with EAS; real iPhone testing through TestFlight.

## 4. Module breakdown

| Module | Responsibility |
| --- | --- |
| `app/` | Routes and screens |
| `src/features/<tile>` | Hooks, queries, types, components per feature |
| `src/services/firebase.ts` | Firebase init (JS SDK), Firestore and Auth helpers |
| `src/services/notifications.ts` | Permission, token registration, handlers, local reminders |
| `src/services/audio.ts` | Player state, background audio, download manager |
| `src/i18n` | Translations and language persistence |
| `src/theme` | Tokens, typography, spacing |
| `functions/` | Cloud Function: send push on new notice/event |

## 5. Key technical decisions

1. **Offline:** the Firebase JS SDK has no on-disk cache in React Native, so persist TanStack Query data with AsyncStorage. Alternative: React Native Firebase (native SDK) with a development build.
2. **Push sending:** Cloud Function triggered on `notices` create calls the Expo Push API in batches of up to 100 tokens. Fallback if you stay on the free plan: admin screen calls the Expo API directly (less secure; keep tokens out of public read).
3. **No devotee accounts:** avoids Apple's account-deletion rule and reduces privacy work.
4. **Donations:** external web link only (see PRD constraints).
5. **Media:** images resized client-side before upload (long edge 1600 px, plus 400 px thumbnail); video via YouTube; audio MP3 96 to 128 kbps.

## 6. Notifications design

- Ask permission after the user taps "Remind me" or "Notify me", not at launch.
- Store `{token, platform, language, createdAt}` in `pushTokens` (create-only for clients).
- Android: create notification channels (`notices`, `events`, `aarti`).
- Local scheduled notifications for aarti reminders (work offline).
- Handle token refresh and invalid tokens (remove on `DeviceNotRegistered` receipts).
- Deep link payload example: `{ "url": "mandir://notices/abc123" }`.

## 7. Audio design

- Background playback enabled (iOS `UIBackgroundModes: ["audio"]`, Android foreground service via the library).
- Lock-screen controls and metadata.
- 2 to 3 aartis bundled; others streamed with optional download to app storage.
- Lyrics: plain Hindi text with line timestamps optional in v1.1.

## 8. Performance targets

| Metric | Target |
| --- | --- |
| Cold start | under 3 s on mid-range Android |
| Gallery scroll | 60 fps with thumbnails and FlashList |
| App size | under 60 MB |
| Firestore reads per session | under 30 (cache aggressively) |

Firestore free tier (Spark) allows 50K reads and 20K writes per day; design to stay far below.

## 9. Security summary

Public read on content, admin-only write via allow-list, create-only for tokens and feedback, no secrets in the app bundle other than public Firebase config. Details in SECURITY.md.

## 10. Environments

| Env | Firebase project | Use |
| --- | --- | --- |
| dev | mandir-dev | Local and emulator |
| prod | mandir-prod | Store builds |

EAS profiles: `development`, `preview` (internal), `production`.

## 11. `eas.json` skeleton

```json
{
  "cli": { "version": ">= 12.0.0", "appVersionSource": "remote" },
  "build": {
    "development": { "developmentClient": true, "distribution": "internal" },
    "preview": { "distribution": "internal" },
    "production": { "autoIncrement": true }
  },
  "submit": { "production": {} }
}
```

## 12. `app.config.ts` essentials

```ts
export default {
  name: 'Onkareshwar Mandir',
  slug: 'mandir-app',
  scheme: 'mandir',
  version: '1.0.0',
  ios: {
    bundleIdentifier: 'in.mandir.onkareshwar',
    infoPlist: { UIBackgroundModes: ['audio'] },
  },
  android: { package: 'in.mandir.onkareshwar' },
  plugins: ['expo-router', 'expo-notifications', 'expo-font'],
  extra: { eas: { projectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID } },
};
```

Replace bundle IDs with your real, unique values before the first store upload; they cannot be changed later.

## 13. Dependencies to install

```bash
npx expo install expo-router expo-font expo-localization expo-image expo-linking \
  expo-constants expo-notifications expo-audio expo-video expo-calendar expo-sharing
npm i firebase @tanstack/react-query @tanstack/query-async-storage-persister \
  @tanstack/react-query-persist-client @react-native-async-storage/async-storage \
  i18next react-i18next @shopify/flash-list
```

Check each library against the current Expo SDK with `npx expo install --check`.

## 14. Observability

Crash reporting, anonymous screen-view analytics (optional), and a weekly check of Firestore usage. Disclose all in the privacy policy and store data forms.

## 15. Technical risks

| Risk | Mitigation |
| --- | --- |
| Library not compatible with current SDK | Use `expo install`, pin versions, test early |
| Background audio rejected or buggy | Test on real devices in week 4 |
| Blaze billing | Budget alert, small media, YouTube for video |
| Hindi text clipped | Test with long strings and large font scale |
