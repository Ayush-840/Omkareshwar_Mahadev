# Product Requirements Document (PRD)

**Product:** Shri Onkareshwar Mahadev Hanuman Mandir App
**Owner:** [Your Name] | **Stakeholder:** Temple committee [chair name]
**Version:** 0.1 | **Date:** 2026-10-19

## 1. Summary

A bilingual mobile app that gives devotees one place for aarti timings and audio, events, notices, photos, videos, temple information, contact and donation information, and gives the committee a simple way to keep it current.

## 2. Problem

- Timings, festival dates and notices travel through WhatsApp forwards and word of mouth; people miss them and old messages get lost.
- Relatives living away have no reliable way to follow temple life.
- The committee has no single, official channel.

## 3. Goals and non-goals

**Goals**
1. Official source of truth for timings, events and notices.
2. Committee can publish in under 2 minutes from a phone.
3. Works for elderly users: Hindi, large text, few taps.
4. Works on poor networks (offline reading).
5. Available on Google Play and the App Store.

**Non-goals for v1**
- In-app payments, devotee accounts, free-form user posts, online pooja booking with payment, live streaming infrastructure.

## 4. Users and personas

| Persona | Needs | Constraints |
| --- | --- | --- |
| Ramesh, 65, local devotee | Aarti time, festival dates, big Hindi text | Low-end Android, limited data, minimal English |
| Priya, 28, lives in a city | Photos, aarti audio, event reminders, how to donate | Busy, wants share to WhatsApp |
| Committee member | Post notices and photos quickly | Not technical, uses a phone only |
| Developer (you) | Low maintenance | Part-time, student |

## 5. User stories

- As a devotee, I open the app and see today's aarti times.
- As a devotee, I get a notification when a special event is announced.
- As a devotee, I can listen to the aarti and read the lyrics offline.
- As a devotee, I can view festival photo albums and share a photo.
- As a devotee, I can add an event to my phone calendar.
- As a devotee, I can call or WhatsApp the temple and open the map.
- As a devotee, I can see how to donate and what donations are used for.
- As an admin, I can log in and post a notice that sends a push notification.
- As an admin, I can add an event and upload photos to an album.

## 6. Functional requirements

| ID | Requirement | Priority |
| --- | --- | --- |
| F1 | Home screen with hero banner and 3 x 3 tile grid | Must |
| F2 | Temple Info: history, deities, timings, address, map, facilities | Must |
| F3 | Aarti Darshan: schedule, next-aarti countdown, audio player, lyrics | Must |
| F4 | Events: list and calendar view, add to calendar, reminder | Must |
| F5 | Photo Gallery: albums, grid, full-screen view, pinch zoom, share | Must |
| F6 | Videos: list with YouTube links, categories | Should |
| F7 | Notices/News: list, pinned notice, detail, share | Must |
| F8 | Contact: call, WhatsApp, email, map, feedback form | Must |
| F9 | Donation Support: purposes, trust details, link to web payment page, transparency summary | Must |
| F10 | Devotee Community v1: committee list, volunteer sign-up, WhatsApp group link | Should |
| F11 | Push notifications with permission asked in context | Must |
| F12 | Hindi/English switch, remembered | Must |
| F13 | Offline cache for read screens and key audio | Must |
| F14 | Admin login and forms for notices, events, photos | Must |
| F15 | Share to WhatsApp with store link | Should |

## 7. Non-functional requirements

- Cold start under 3 seconds on a mid-range Android phone.
- App size under 60 MB (bundle only 2 to 3 audio files).
- Works on Android 8+ and iOS 15+ (confirm against current Expo SDK minimums).
- Accessible: text scales with system settings, 48 dp touch targets, contrast 4.5:1, screen reader labels in Hindi.
- Crash-free sessions above 99% after launch.
- No personal data collected from devotees beyond an anonymous push token.

## 8. Success metrics (suggested)

| Metric | Target |
| --- | --- |
| Installs in first month | 100 |
| Weekly active users after 3 months | 40% of installs |
| Notices published per month | 4 or more |
| Crash-free sessions | 99% or more |
| Store rating | 4.0 or more |

## 9. Constraints and policies

- Apple 3.2.1(vi)/3.2.2(iv): no in-app fundraising unless an approved nonprofit; link to web.
- Apple 4.2: must feel like an app, not a website.
- Apple 1.2: no user-generated content in v1.
- Google Play: closed test with at least 12 testers for 14 days for new personal accounts.
- Content rights: only temple-owned or licensed media, with written permission.

## 10. Release plan

| Release | Scope |
| --- | --- |
| v1.0 | F1 to F9, F11 to F14 (F6, F10 simplified) |
| v1.1 | Panchang/tithi, audio player upgrades, calendar and share polish |
| v1.2 | Seva/pooja request form (no payment), home-screen widget |
| v2.0 | Live darshan link, moderated community wall, FAQ chatbot |

## 11. Risks

See ROADMAP.md and the research document: tester recruitment, Apple 4.2, donation policy, committee adoption, Firebase billing.

## 12. Open questions

- Is there a registered trust, and who is the legal owner of the app listing?
- Which payment page will the committee use, and who holds the account?
- Who are the 2 or 3 admin users?
- Which aartis and how many audio files are available with usage rights?
- Are foreign donations expected (FCRA)?

## 13. Approval

| Name | Role | Date |
| --- | --- | --- |
| [Committee chair] | Content owner | |
| [Your Name] | Developer | |
