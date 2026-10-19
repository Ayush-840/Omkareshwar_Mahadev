# Design System

Design for a 65-year-old devotee on a budget Android phone first. If it works for them, it works for everyone.

## 1. Principles

1. Hindi first, English second.
2. One obvious action per screen.
3. Big text, high contrast, generous spacing.
4. Warm, devotional, calm: saffron, gold, cream, maroon.
5. Never block on network: show cached content with a "last updated" label.

## 2. Colour tokens

| Token | Hex | Use |
| --- | --- | --- |
| saffron | #F28C28 | Primary buttons, header gradient start |
| gold | #F5C24B | Header gradient end, highlights |
| cream | #FFF6E3 | Screen and card background |
| maroon | #7A1F1F | Titles, ribbons, active tab |
| ink | #2B1B12 | Body text |
| inkMuted | #6B5A4E | Secondary text |
| white | #FFFFFF | Cards on cream |
| success | #2E9E4F | Confirmations |
| danger | #D64545 | Errors |

Tile colours (from the reference): orange #F26A21, amber #E8962B, purple #6B2FBF, blue #2F5BEA, green #2E9E4F, red #E04848, violet #7B3FD1, gold #F0A020, navy #2A52C9.

Check every text/background pair for 4.5:1 contrast before release.

## 3. Typography

| Role | Font | Size | Weight |
| --- | --- | --- | --- |
| Temple name (hero) | Tiro Devanagari Hindi (or similar serif) | 26 to 30 | 600 |
| Screen title | Noto Sans Devanagari | 22 | 700 |
| Body | Noto Sans Devanagari or Mukta | 16 to 18 | 400 |
| Tile label | Noto Sans Devanagari | 15 | 700 |
| Caption | Noto Sans Devanagari | 13 | 400 |

Line height 1.4 or more. Do not disable system font scaling. Load with `expo-font`.

## 4. Spacing, radius, elevation

- Spacing scale: 4, 8, 12, 16, 24, 32.
- Screen padding 16.
- Radius: tiles 18 to 24, cards 16, buttons 14.
- Elevation: one soft shadow for cards (opacity 0.08); no heavy shadows.

## 5. Components

| Component | Notes |
| --- | --- |
| HeroBanner | Temple photo, circular logo, Hindi name ribbon |
| TileGrid / Tile | 3 columns, 64 px icon square, label below, whole tile pressable |
| ScreenHeader | Back arrow, Hindi title, optional action |
| Card | White on cream, 16 radius |
| NoticeCard | Title, date, 2-line preview, pinned badge |
| EventCard | Date block, title, location, add-to-calendar button |
| AudioPlayer | Play/pause, seek, speed, lyrics toggle, download |
| PhotoGrid | 3 columns thumbnails, full-screen pager |
| LanguageToggle | hi / EN pill in top right |
| EmptyState, ErrorState, OfflineBanner | Hindi message, retry action |
| PrimaryButton | Saffron fill, white text, 48 dp height |

## 6. Iconography

One icon family (Lucide or Phosphor via react-native-svg). Tile backgrounds are coloured rounded squares with white glyphs. Do not reuse proprietary icon art from the reference.

## 7. Motion

- Tile press: scale to 0.96, 100 ms.
- Screen transitions: platform default.
- Avoid parallax or long animations; test on low-RAM phones.

## 8. Accessibility checklist

- [ ] Touch targets at least 48 x 48 dp
- [ ] Contrast at least 4.5:1
- [ ] Works at 200% font scale
- [ ] Hindi `accessibilityLabel` on every tile, icon button and image
- [ ] Tested with TalkBack and VoiceOver
- [ ] No information conveyed by colour alone

## 9. Content rules

- Hindi copy reviewed by a native speaker (committee member).
- Dates shown in IST, Devanagari or Latin numerals per setting.
- Deity images and logo only from the temple's own, approved files.

## 10. Assets to prepare

| Asset | Spec |
| --- | --- |
| App icon | 1024 x 1024 PNG, no transparency, no rounded corners (stores round them) |
| Android adaptive icon | Foreground 1024 px with safe zone, background colour |
| Splash | Logo on cream |
| Play feature graphic | 1024 x 500 |
| Screenshots | Real screens, Hindi and English sets |
| Hero photo | Own photo of the temple, 1600 px wide |
