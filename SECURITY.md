# Security and Privacy

## Principles

1. Devotees never log in and never give personal data.
2. Only allow-listed admins can write content.
3. Rules enforce permissions, not the app UI.
4. Keep secrets out of the app and the repo.

## Firestore rules (starting point)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isAdmin() {
      return request.auth != null
        && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }

    // Public content: anyone reads, only admins write
    match /temple/{doc}            { allow read: if true; allow write: if isAdmin(); }
    match /aartis/{id}             { allow read: if true; allow write: if isAdmin(); }
    match /events/{id}             { allow read: if true; allow write: if isAdmin(); }
    match /notices/{id}            { allow read: if true; allow write: if isAdmin(); }
    match /videos/{id}             { allow read: if true; allow write: if isAdmin(); }
    match /members/{id}            { allow read: if true; allow write: if isAdmin(); }
    match /donationInfo/{doc}      { allow read: if true; allow write: if isAdmin(); }
    match /albums/{id} {
      allow read: if true; allow write: if isAdmin();
      match /photos/{pid}          { allow read: if true; allow write: if isAdmin(); }
    }

    // Client create-only collections
    match /pushTokens/{id} {
      allow create: if request.resource.data.keys().hasOnly(['token','platform','language','createdAt'])
                    && request.resource.data.token is string;
      allow read, update, delete: if isAdmin();
    }
    match /volunteers/{id} {
      allow create: if request.resource.data.name is string && request.resource.data.name.size() < 100;
      allow read, update, delete: if isAdmin();
    }
    match /feedback/{id} {
      allow create: if request.resource.data.message is string && request.resource.data.message.size() < 1000;
      allow read, update, delete: if isAdmin();
    }

    match /admins/{uid} { allow read: if request.auth != null && request.auth.uid == uid; allow write: if false; }
  }
}
```

Add admins manually in the Firebase console. Test every rule in the Firebase emulator before launch, including attempts to write as a non-admin.

## Storage rules (starting point)

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null
        && request.resource.size < 6 * 1024 * 1024
        && (request.resource.contentType.matches('image/.*') || request.resource.contentType.matches('audio/.*'));
    }
  }
}
```

Tighten `write` to admins by checking the Firestore `admins` collection with `firestore.exists(...)` once rules are stable.

## Admin access

- 2 to 3 named admins; strong unique passwords; enable multi-factor where available.
- Remove an admin by deleting the `admins/{uid}` doc and disabling the Auth user.
- Never share one login among many people.
- Admin route is hidden but not a security control; rules are.

## Secrets

- Firebase web config is public by design; protect data with rules.
- Do not commit service account keys, Play API keys or Apple keys. Use EAS secrets and GitHub secrets.
- Add `.env`, `google-services.json` handling per Expo docs, and keystores to `.gitignore` as appropriate.

## Privacy

| Data | Collected? | Purpose |
| --- | --- | --- |
| Name, phone, email of devotees | No (only voluntary forms) | n/a |
| Push token | Yes, anonymous | Notifications |
| Crash logs | Yes | Fix bugs |
| Analytics events | Optional, anonymous | Usage counts |
| Feedback and volunteer forms | Only what the user types | Respond to the user |

- Publish a privacy policy (see PRIVACY_POLICY.md) and link it in both stores.
- Fill Google Data safety and Apple App Privacy forms to match exactly.
- Do not collect children's data; the app is a general audience devotional app.
- Provide a contact email for data requests and deletion of form submissions.

## Content safety

- v1 has no user-generated posts. Before adding a community wall, implement filtering, report, block and published contact info (Apple 1.2).
- Committee approves all media before publishing.

## Dependency hygiene

- `npm audit` before each release.
- Pin major versions; update Expo SDK on a schedule.
- Enable GitHub Dependabot.

## Incident checklist

1. Disable the affected admin account.
2. Rotate credentials.
3. Review Firestore changes and restore from the last good export.
4. Notify the committee.
