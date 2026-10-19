# UI Specification

Screen-by-screen. Use DESIGN.md tokens. All text exists in `hi` and `en`.

## Navigation map

```
Home (grid)
 |- Temple Info
 |- Aarti Darshan --- Aarti Detail (audio + lyrics)
 |- Events ---------- Event Detail
 |- Photo Gallery --- Album --- Photo Viewer
 |- Devotee Community
 |- Donation Support
 |- Notices / News -- Notice Detail
 |- Videos
 |- Contact
Settings (language, notifications, about)
Admin (hidden): Login -> Dashboard -> New Notice / New Event / Upload Photos
```

## 1. Home

- Top: hero banner (about 40% of height) with temple photo, circular logo, ribbon "श्री ओंकारेश्वर महादेव हनुमान मंदिर" (use the committee-approved spelling).
- Top right: language pill (हिं / EN) and settings icon.
- Strip under the hero: "Next aarti: 6:30 PM in 1h 20m" and today's tithi (v1.1).
- Cream card with 3 x 3 grid of tiles.
- Pinned notice banner appears above the grid when one exists.
- States: offline banner; no data yet shows static defaults.

## 2. Temple Info (मंदिर जानकारी)

Sections: history, deities, daily timings table, address with "Open in Maps", facilities, how to reach. Scrollable single column. Image carousel at top.

## 3. Aarti Darshan (आरती दर्शन)

- List of aartis with time and days; today's next one highlighted.
- Tap opens Aarti Detail: title, audio player, lyrics (scroll), "Remind me 10 min before" toggle, download for offline.
- Latest darshan photo or video card at top (v1.1); live darshan link (v2).

## 4. Events (कार्यक्रम)

- Toggle: List / Month.
- Event card: date block, title, time, place, image.
- Detail: description, "Add to calendar", "Remind me", share.

## 5. Photo Gallery (फोटो गैलरी)

- Albums grid (cover, title, count).
- Album: 3-column thumbnails.
- Viewer: swipe, pinch zoom, share, caption.

## 6. Devotee Community (भक्त समुदाय) v1

- Committee members with role and photo.
- Volunteer sign-up form (name, phone optional, interest area).
- Button: Join WhatsApp group.
- No free-form posts in v1.

## 7. Donation Support (दान सहयोग)

- Purposes list (anna daan, repairs, festivals) with short text.
- Trust name, registration details, contact for receipts.
- Button "Donate on website" opens the browser.
- Monthly transparency summary (income, spend).
- Note: no payment is collected inside the app.

## 8. Notices / News (नोटिस / समाचार)

- Pinned first, then newest first.
- Detail: title, date, body, image, share.
- Push opens the detail directly.

## 9. Videos (वीडियो)

- Category chips (Aarti, Festivals, Katha).
- Cards with thumbnail and title; tap opens YouTube player.

## 10. Contact (संपर्क करें)

- Buttons: Call, WhatsApp, Email, Open map.
- Feedback form: message plus optional contact.
- Hours and committee phone numbers (only with consent).

## 11. Settings

Language, notification toggles per category (notices, events, aarti reminders), app version, privacy policy link, contact developer.

## 12. Admin (hidden)

- Entry: tap temple logo 7 times, or a direct link.
- Login: email + password. Show error in Hindi on failure.
- Dashboard: three buttons (New notice, New event, Upload photos) and a recent items list with edit/delete.
- Forms: three or four fields each, image picker, preview, publish button, confirmation dialog for "send push notification".

## Copy keys (excerpt)

| Key | hi | en |
| --- | --- | --- |
| tiles.info | मंदिर जानकारी | Temple Info |
| tiles.aarti | आरती दर्शन | Aarti Darshan |
| tiles.events | कार्यक्रम | Events |
| tiles.gallery | फोटो गैलरी | Photo Gallery |
| tiles.community | भक्त समुदाय | Devotee Community |
| tiles.donate | दान सहयोग | Donation Support |
| tiles.notices | नोटिस / समाचार | Notices / News |
| tiles.videos | वीडियो | Videos |
| tiles.contact | संपर्क करें | Contact Us |
| common.offline | इंटरनेट नहीं है | You are offline |
| common.retry | दोबारा कोशिश करें | Try again |

## Acceptance criteria (every screen)

- Loads cached content offline.
- Has loading, empty, error states.
- Passes 200% font scale without clipping.
- Hindi labels for screen reader.
