# Roadmap

Assumes a start on 19 Oct 2026 with weekly slices. Shift dates around your exams; keep the order. The Google Play closed test (minimum 14 days, at least 12 testers) is the critical path: start it with week 5.

## Plan

| Week | Dates | Focus | Done when |
| --- | --- | --- | --- |
| 0 | 19 to 25 Oct | Accounts, repo, Figma, collect content, committee permission | Content folder and written permission in hand |
| 1 | 26 Oct to 1 Nov | Expo project, theme, hero, tile grid, i18n | Home screen matches reference on a phone |
| 2 | 2 to 8 Nov | Firebase, Info, Contact, Notices (read-only) | Content loads from Firestore and offline |
| 3 | 9 to 15 Nov | Events, Gallery, Videos | Calendar add, photo viewer, YouTube links work |
| 4 | 16 to 22 Nov | Aarti audio, lyrics, offline, reminders | Audio plays with screen locked |
| 5 | 23 to 29 Nov | Push, admin forms; **start Play closed test** | Admin posts notice, phone receives push |
| 6 | 30 Nov to 6 Dec | Donation screen, Community v1, polish | All 9 tiles complete |
| 7 | 7 to 13 Dec | QA, accessibility, store assets, privacy page, TestFlight | Zero known crashes, listings ready |
| 8 | 14 to 20 Dec | Production builds, submit both stores | Submitted |

Closed test: 23 Nov to 7 Dec at minimum, then request production access (about 8 Dec).

## Release phases

- **v1.0:** MVP from PRD.
- **v1.1:** tithi/panchang, audio upgrades, calendar and share polish, widget research.
- **v1.2:** seva/pooja request form without payment; home-screen widget.
- **v2.0:** live darshan link, moderated community wall (report, block, filter, contact), Hindi FAQ chatbot.

## Milestone checklist

- [ ] M0 Written permission and content received
- [ ] M1 Home grid on device
- [ ] M2 Firebase connected, rules deployed
- [ ] M3 All read screens done
- [ ] M4 Audio and offline done
- [ ] M5 Push works end to end; closed test started
- [ ] M6 Feature complete
- [ ] M7 Release candidate, store assets ready
- [ ] M8 Submitted to both stores
- [ ] M9 Live; share in village WhatsApp groups

## Risks

| Risk | Plan |
| --- | --- |
| Not enough testers | Recruit 15 to 20 early, remind weekly |
| Apple 4.2 | Native features, clear review notes |
| Exams | Cut Videos or Community from v1 first |
| Committee delays content | Placeholder content, weekly check-in |
| Firebase billing | Budget alert, resize media |
| Scope creep | Park ideas in v1.1 list |

## Post-launch

- Week 1: watch crashes, fix top issues.
- Month 1: collect feedback, publish v1.0.1.
- Monthly: update Expo SDK if needed, check store policy changes.
