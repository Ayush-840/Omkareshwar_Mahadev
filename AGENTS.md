# AGENTS.md (instructions for AI coding assistants)

Project: Onkareshwar Mandir app. Expo (React Native) + TypeScript + Firebase. Android and iOS.

## Read first
README.md, PRD.md, TRD.md, DESIGN.md, UI_SPEC.md, DATA_MODEL.md, SECURITY.md.

## Commands
- Install: `npm install`
- Start: `npx expo start` (use a development build for push and audio)
- Lint: `npm run lint` | Types: `npm run typecheck` | Tests: `npm test`
- Check SDK compatibility: `npx expo install --check`

## Rules
1. TypeScript strict. No `any` without a comment.
2. Use Expo Router; screens in `app/`, feature code in `src/features/<name>`.
3. All user-facing text goes through i18next with `hi` and `en` keys. Hindi is the default.
4. Use theme tokens from `src/theme`; no hard-coded colours or sizes in screens.
5. Every screen needs loading, empty, error and offline states.
6. Touch targets at least 48 dp; support large font scale; add Hindi `accessibilityLabel`.
7. Devotees never log in. Do not add accounts or user-generated content without updating SECURITY.md and PRD.md.
8. No in-app payments. The donation screen links out to a web page (store policy).
9. Never commit secrets, keystores, service account files or `.env`.
10. Use `npx expo install <pkg>` so versions match the SDK; check current Expo docs before using a library API.
11. Dates are stored as UTC and shown in IST.
12. Keep changes small and focused; update CHANGELOG.md for user-facing changes.

## Definition of done
Lint, typecheck and tests pass; works offline; Hindi and English strings present; tested on Android and iOS; docs updated.

## Do not
- Change Firestore rules without adding rules tests.
- Add dependencies that need native config without noting it in TRD.md.
- Use temple images, audio or logos that the committee has not provided.
