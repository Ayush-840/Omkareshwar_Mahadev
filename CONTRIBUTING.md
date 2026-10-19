# Contributing

Even as a solo project, work like a team: it makes the GitHub history a strong resume asset.

## Branching

- `main`: always releasable.
- `feat/<short-name>`, `fix/<short-name>`, `docs/<short-name>`, `chore/<short-name>`.
- One pull request per feature, squash merge.

## Commits (Conventional Commits)

```
feat(aarti): add audio player with lyrics
fix(events): correct IST offset in calendar add
docs: update release guide
chore: bump expo sdk
```

Keep the subject under 72 characters, in the imperative mood.

## Pull requests

Describe what and why, add screenshots for UI changes, list manual tests done, link the issue. Checklist:

- [ ] Lint, typecheck and tests pass
- [ ] Hindi and English strings added
- [ ] Works offline and at 200% font scale
- [ ] CHANGELOG updated for user-facing change

## Code style

- TypeScript strict; no `any` without a comment.
- Function components and hooks.
- One feature per folder under `src/features`.
- Styles from `src/theme` tokens; no hard-coded colours in screens.
- No secrets in code; use `EXPO_PUBLIC_*` only for public config.
- Dates: store UTC timestamps, display in IST.

## Setup

```bash
npm install
npx expo start
npm run lint
npm run typecheck
npm test
```

## Issues

Use labels: `bug`, `feature`, `content`, `store`, `good first issue`. Keep a `v1.1` milestone for deferred ideas.

## Releases

1. Update version in `app.config.ts` and CHANGELOG.
2. Tag: `git tag v1.0.0 && git push --tags`.
3. Build and submit with EAS (see RELEASE_GUIDE.md).

## Content licence

Photos, audio, logo and deity images belong to the temple committee and must not be copied from this repository for other uses without permission.
