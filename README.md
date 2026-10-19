# Shri Onkareshwar Mahadev Hanuman Mandir App

A Hindi-first (with English) mobile app for the village temple: aarti timings and audio, events, notices, photo gallery, videos, temple information, contact, and donation information. One React Native codebase for Android and iOS, with an admin area so the temple committee can publish content without a developer.

> Status: planning. Replace the bracketed placeholders and screenshots as you build.

## Features

- 3 x 3 home grid: Temple Info, Aarti Darshan, Events, Photo Gallery, Devotee Community, Donation Support, Notices/News, Videos, Contact
- Hindi / English switch, large-text friendly
- Push notifications for notices, events and special aarti
- Offline reading and offline aarti audio
- Admin area (login) to post notices, events and photos
- Donation screen that links out to the temple's web payment page

## Tech stack

Expo (React Native) + TypeScript, Expo Router, Firebase (Firestore, Auth, Storage, Cloud Functions), TanStack Query, i18next, EAS Build/Submit.
Details: see [TRD.md](TRD.md).

## Documents

| File | Purpose |
| --- | --- |
| [PRD.md](PRD.md) | What and why: users, requirements, scope |
| [TRD.md](TRD.md) | How: architecture, stack, performance, security |
| [DESIGN.md](DESIGN.md) | Visual design system |
| [UI_SPEC.md](UI_SPEC.md) | Screen-by-screen specification |
| [DATA_MODEL.md](DATA_MODEL.md) | Firestore collections and fields |
| [SECURITY.md](SECURITY.md) | Security rules, privacy, admin access |
| [ROADMAP.md](ROADMAP.md) | Weekly plan and release phases |
| [TESTING.md](TESTING.md) | Test strategy and checklists |
| [RELEASE_GUIDE.md](RELEASE_GUIDE.md) | Google Play and App Store publishing |
| [PRIVACY_POLICY.md](PRIVACY_POLICY.md) | Template to host publicly |
| [ADMIN_GUIDE.md](ADMIN_GUIDE.md) | One-page guide for committee members |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Branching, commits, code style |
| [CHANGELOG.md](CHANGELOG.md) | Release notes |
| [AGENTS.md](AGENTS.md) | Instructions for AI coding assistants |

## Getting started

```bash
git clone https://github.com/[your-username]/mandir-app.git
cd mandir-app
npm install
cp .env.example .env        # add your Firebase keys
npx expo start
```

Run on a device with a development build:

```bash
eas build --profile development --platform android
```

## Environment variables

```
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_APP_ID=
EXPO_PUBLIC_EAS_PROJECT_ID=
```

## Screenshots

[Add home, aarti, events, gallery screenshots]

## Demo

[Link to 60-90 second screen recording]

## Links

- Google Play: [link after launch]
- App Store: [link after launch]
- Privacy policy: [GitHub Pages URL]

## License

Code: MIT (or your choice). Temple photos, audio, logo and deity images belong to the temple committee and are not covered by the code licence.

## Credits

Built by [Your Name] for [Temple Name], [Village, District, State]. Content provided by the temple committee.
