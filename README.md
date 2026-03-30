# Pokémon Fighting Game MVP

Offline-first, local-only Pokémon-themed fighting game prototype built with TypeScript, Phaser 3, Vite, and Vitest.

## What it includes
- Start Screen with a `Start Fight` action.
- Pre-fight Pokémon selection limited to National Dex IDs 1-150.
- Deterministic fight setup and repeatable local match handoff.
- Offline-only guards and test coverage for the core flow.

## Getting started
```powershell
npm install
npm run dev
```

## Validate
```powershell
npm test
npm run build
```

## Notes
- No network requests are required at runtime.
- The roster is static and deterministic.
- The flow resets cleanly when returning to the Start Screen.

