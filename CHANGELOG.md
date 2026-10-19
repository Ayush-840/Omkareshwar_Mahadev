# Changelog

All notable changes are documented here. Format follows Keep a Changelog; versions follow Semantic Versioning.

## [Unreleased]

### Added
- Project documentation set (PRD, TRD, design, UI spec, data model, security, roadmap, testing, release guide).

## [1.0.0] - 2026-10-19

### Added
- Complete Expo Router application codebase for Android, iOS, and Web.
- Home screen with hero banner, 7-tap admin secret entry, next-aarti countdown strip, pinned notice banner, and responsive 3 x 3 devotional tile grid.
- Temple Info screen: deities, history, daily timings table, address with Google Maps integration, facilities.
- Aarti Darshan screen: full schedule with next aarti indicator, detailed audio player with playback speed, offline download, "remind me 10 min before" offline notifications, and complete lyrics in Hindi & English.
- Events module: list & calendar toggles, event detail with native phone calendar integration (`expo-calendar`) and WhatsApp share.
- Photo Gallery: 2-column album grid and 3-column photo gallery with fullscreen viewer and sharing.
- Devotee Community: committee list with direct call action, volunteer registration form, and WhatsApp group invitation.
- Donation Support: store-compliant external web payment link, donation purposes, trust registration details, and monthly financial transparency reports.
- Notices / News: priority pinned notices, date-sorted feed, detail view, and WhatsApp sharing.
- Videos screen: category chips (Aarti, Festivals, Katha), video cards with YouTube launcher.
- Contact Us screen: quick-action grid for Call, WhatsApp, Email, Maps, plus feedback form.
- Settings screen: language switcher (Hindi / English with immediate persistence), notification toggles, privacy policy.
- Hidden Admin Portal: 7-tap logo trigger, authentication, dashboard, new notice creation with push notification alert dialog, new event creation, and photo upload.
- Full offline caching with TanStack Query and AsyncStorage.
- Strict TypeScript and Jest unit tests for IST date calculations, next aarti countdowns, and i18n parity.

## [1.1.0] - planned

### Added
- Tithi / panchang and festival countdown on home
- Audio player improvements
- Calendar and WhatsApp share polish
