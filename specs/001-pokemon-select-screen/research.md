# Research: Start Screen Pokémon Selection

## 1) Game stack and runtime architecture
- **Decision**: Use TypeScript 5.x with Vite, Phaser 3, and Vitest.
- **Rationale**: Phaser gives a lightweight 2D scene system suitable for a start screen, selection screen, and fight handoff without introducing engine churn. Vite keeps the offline build simple, and Vitest supports fast deterministic tests.
- **Alternatives considered**:
  - **Pure HTML5 Canvas + custom state management**: smaller dependency surface, but more boilerplate for scenes and asset handling.
  - **Unity/Godot**: strong game tooling, but overkill for this MVP and a larger workflow change than needed.

## 2) Flow architecture
- **Decision**: Model the feature as an explicit finite state machine with pure transitions between `StartScreen`, `PokemonSelect`, `FightSetup`, `FightActive`, `Result`, and `ReturnToStart` states.
- **Rationale**: The constitution requires deterministic combat rules and testable game-loop behavior. A state machine makes the Start Screen, selection gating, and reset behavior easy to validate.
- **Alternatives considered**:
  - **Implicit scene flags / ad hoc booleans**: simpler at first, but harder to test and easier to regress.
  - **Navigation-only scene switching**: acceptable for UI, but insufficient to guarantee deterministic setup and reset rules.

## 3) Roster data strategy
- **Decision**: Store the first 150 Pokémon as local static content ordered by National Dex number and filtered before render time.
- **Rationale**: The spec is offline-only and the roster must be deterministic. Static local content avoids network dependency and guarantees the exact available set.
- **Alternatives considered**:
  - **Live API lookups**: rejected because the feature must be offline-first and local-only.
  - **On-demand generation from remote metadata**: rejected for the same reason and because it complicates tests.

## 4) Deterministic combat setup
- **Decision**: Make the fight handoff deterministic from the confirmed Pokémon selection plus explicit setup inputs; any randomness must be seeded and isolated.
- **Rationale**: The spec requires repeated runs with the same selection and inputs to produce identical setup behavior.
- **Alternatives considered**:
  - **Unseeded randomness**: rejected because it would break repeatability.
  - **Hidden runtime-derived state**: rejected because it would make replay and test failures difficult to diagnose.

## 5) Asset and content policy
- **Decision**: Use original or properly licensed placeholder assets for the MVP implementation.
- **Rationale**: The constitution requires original/licensed assets only. Placeholder art is acceptable until approved assets exist.
- **Alternatives considered**:
  - **Unlicensed Pokémon sprites or artwork**: rejected for legal and policy reasons.
  - **External asset streaming**: rejected because it would undermine offline-only behavior.

