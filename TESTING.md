# Testing Strategy

## Levels

| Level | Tool | What |
| --- | --- | --- |
| Static | ESLint, TypeScript strict, Prettier | Every commit |
| Unit | Jest | Date/time helpers (IST, next aarti), i18n keys, formatters, data mappers |
| Component | React Native Testing Library | TileGrid, NoticeCard, AudioPlayer states |
| Rules | Firebase emulator + rules unit testing | Public read, admin-only write, create-only collections |
| E2E (optional) | Maestro | Open app, navigate each tile, switch language |
| Manual | Real devices | Audio, push, offline, accessibility |

## CI (GitHub Actions)

Run on every push and pull request: install, lint, typecheck, unit tests. Block merge on failure.

## Device matrix

| Device | Why |
| --- | --- |
| Old low-RAM Android (Android 8 to 10) | Performance baseline |
| Recent Android | Current behaviour |
| iPhone (recent iOS) | iOS review and push |
| Small-screen phone | Layout |
| Tablet (quick check) | Stores show tablet screenshots if supported |

## Manual test checklist

**General**
- [ ] Cold start under 3 s on the old Android
- [ ] Language switch persists after restart
- [ ] Offline: every read screen opens with cached data
- [ ] Airplane mode banner appears and clears

**Home**
- [ ] All 9 tiles open the right screen
- [ ] Pinned notice shows

**Aarti**
- [ ] Next-aarti countdown correct around midnight and across days
- [ ] Audio keeps playing with screen locked
- [ ] Lock-screen controls work
- [ ] Download for offline, then airplane mode playback

**Events**
- [ ] Add to calendar creates the right date/time in IST
- [ ] Reminder fires on time

**Gallery**
- [ ] Smooth scroll with 200 photos
- [ ] Pinch zoom and share work

**Push**
- [ ] Permission asked in context, not at launch
- [ ] Notice from admin reaches Android and iOS
- [ ] Tapping opens the right notice (app closed, background, foreground)
- [ ] Token cleanup on uninstall

**Admin**
- [ ] Non-admin account cannot write (verify in emulator)
- [ ] Notice, event and photo creation work
- [ ] Wrong password shows Hindi error

**Donation**
- [ ] Button opens the browser page; no payment inside the app

**Accessibility**
- [ ] 200% font scale: no clipped Hindi text
- [ ] TalkBack and VoiceOver read all tiles in Hindi
- [ ] Contrast checked

**Security/privacy**
- [ ] No keys in repo history
- [ ] Privacy policy URL loads
- [ ] Data safety and App Privacy answers match actual behaviour

## Release gate

Do not submit until: all P0 tests pass, no crash in 3 days of beta use, rules tests pass, store listings and privacy policy are live.

## Bug template

```
Title:
Device / OS / app version:
Steps:
Expected:
Actual:
Screenshot or recording:
Severity: P0 crash / P1 broken feature / P2 visual / P3 idea
```
