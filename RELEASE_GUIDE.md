# Release Guide: Google Play and App Store

Facts below were checked against official pages on 19 Oct 2026. Re-check before you pay or submit; policies change.

## 0. Before you start

- Written permission from the temple committee to publish under its name.
- Decide who owns the store listings: you (individual) or the trust (organization). An organization account needs legal documents; Apple organization enrolment typically needs a D-U-N-S number (not verified).
- Unique bundle ID / package name, for example `in.mandir.onkareshwar`. It cannot be changed after the first upload.
- Privacy policy hosted at a public URL.
- Demo admin login for reviewers (a separate, limited account).

## 1. Google Play

### Account
- One-time US$25 registration fee, card required (prepaid not accepted).
- Age 18+, identity verification with government ID in your legal name.
- Personal accounts created after 13 Nov 2023: confirm access to an Android device via the Play Console app.

### Closed testing requirement
New personal accounts must run a closed test with at least 12 testers opted in continuously for 14 days, then apply for production access. If a tester opts out and rejoins, their 14 days restart. Recruit 15 to 20.

### Steps
1. Build the Android App Bundle: `eas build --platform android --profile production`.
2. Target API level 36 or higher for new apps and updates (required from 31 Aug 2026; an extension to 1 Nov 2026 can be requested). Confirm in the build.
3. Create the app in Play Console; upload to the Closed testing track; add testers by email list or Google Group.
4. Complete: App content (privacy policy URL, Data safety, content rating, target audience not for children, ads: none, app access with demo login).
5. Store listing: name, short description (80 chars), full description, 512 px icon, 1024 x 500 feature graphic, at least 2 phone screenshots, category (Lifestyle or similar).
6. After 14 days with 12+ testers: apply for production access, answer questions about testing.
7. Promote the release to Production. Staged rollout (for example 20%) is sensible.
8. Automate later with `eas submit --platform android` (first upload to a new app may need to be manual; check Expo docs).

### Donations on Play
Payments policy lists tax-exempt donations among payments that do not require Play Billing. Confirm the trust's tax-exempt status with its accountant. The recommended v1 design still links to a web page.

## 2. Apple App Store

### Account
- Apple Developer Program: US$99 per membership year (local price shown at enrolment).
- Apple Account with two-factor authentication, legal name, age of majority (otherwise a parent or guardian enrols), verified contact details.

### Steps
1. Create the app in App Store Connect with the same bundle ID as `app.config.ts`.
2. Build: `eas build --platform ios --profile production`.
3. Upload: `eas submit --platform ios`; test with TestFlight on 3 to 5 real iPhones.
4. Listing: name, subtitle, description, keywords, support URL, privacy policy URL, screenshots for required iPhone sizes, age rating.
5. App Privacy answers: crash logs, analytics (if used), push token; no tracking.
6. Review notes: demo admin login; explain the donation screen links to a website; list native features (push, offline mode, background audio, calendar, share).
7. Submit for review. If rejected, read the cited guideline, fix, reply in Resolution Center, resubmit.

### Guidelines that matter
| Guideline | Rule | Your approach |
| --- | --- | --- |
| 4.2 | Must go beyond a repackaged website | Native features, no WebView-only screens |
| 3.2.1(vi), 3.2.2(iv) | Only approved nonprofits fundraise in-app; otherwise collect outside the app (Safari or SMS) | Link out |
| 5.1.1(v) | Account creation requires in-app deletion; avoid forced login | No devotee accounts |
| 1.2 | UGC needs filter, report, block, contact | No UGC in v1 |

## 3. Store listing text (draft)

**Name:** Onkareshwar Mandir
**Short description (hi):** मंदिर की आरती, कार्यक्रम, सूचनाएं और फोटो एक जगह।
**Short description (en):** Aarti, events, notices and photos from the temple in one app.

**Full description (en):**
Stay connected with Shri Onkareshwar Mahadev Hanuman Mandir. See daily aarti timings, listen to aarti, get event and notice alerts, browse festival photos and videos, find temple information and contact details, and learn how to support the temple. Available in Hindi and English. Works offline for key content.

Keep the Hindi and English listings consistent and free of claims you cannot support.

## 4. Pre-submission checklist

- [ ] Version and build numbers set
- [ ] Icons, splash and screenshots final
- [ ] Privacy policy live and linked
- [ ] Data safety / App Privacy match the app
- [ ] Demo admin login works
- [ ] No test data or lorem ipsum
- [ ] Crash reporting enabled
- [ ] Firestore and Storage rules deployed and tested
- [ ] Release notes written (CHANGELOG.md)
- [ ] Committee approved screenshots and text

## 5. After launch

- Share the store links in village WhatsApp groups and at the temple (QR poster).
- Monitor crashes and reviews weekly; reply to reviews.
- Ship fixes with EAS Update for JavaScript-only changes where store rules allow; native changes need a new build.
- Renew Apple membership yearly and keep Play account contact details current.
