# Tasks: Start Screen Pokémon Selection

**Input**: Design documents from `/specs/001-pokemon-select-screen/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/game-flow.md`  
**Scope**: Single-project TypeScript frontend with Phaser 3, Vite, and Vitest. Offline-only, local-first, deterministic flow.

**Tests**: Gameplay, state-machine, and deterministic setup changes require tests. Keep tests close to the feature slices they verify.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Bootstrap the single-project frontend and create the minimal app entry points.

- [X] T001 Create the frontend project manifest, scripts, and dependencies in `package.json`.
- [X] T002 [P] Add TypeScript and Vite configuration in `tsconfig.json`, `tsconfig.node.json`, and `vite.config.ts`.
- [X] T003 [P] Create the application entry scaffold in `index.html`, `src/main.ts`, and `src/app.ts`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build the shared flow, data, and deterministic helpers that every user story depends on.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [X] T004 [P] Add unit tests for flow-state transitions and roster validation in `tests/unit/gameFlow.test.ts` and `tests/unit/pokemonRoster.test.ts`.
- [X] T005 [P] Add unit tests for deterministic fight setup in `tests/unit/deterministicFightSetup.test.ts`.
- [X] T006 Implement the shared screen state machine and transition helpers in `src/state/gameFlow.ts`.
- [X] T007 Implement selection-state models and reset behavior in `src/state/selectionState.ts`.
- [X] T008 Implement the local first-150 roster dataset and validation helper in `src/data/pokemonRoster.ts`.
- [X] T009 Implement deterministic fight setup helpers in `src/systems/deterministicFightSetup.ts`.
- [X] T010 Create the Phaser scene registry and base scene shells in `src/scenes/PokemonSelectScene.ts` and `src/scenes/FightSetupScene.ts`.

**Checkpoint**: Shared flow control, roster rules, and deterministic setup helpers are ready for story work.

---

## Phase 3: User Story 1 - Reach the Fight Flow from the Start Screen (Priority: P1) 🎯 MVP

**Goal**: The player can launch the game, see a Start Screen, and start the pre-fight flow without any network dependency.

**Independent Test**: Launch the game, confirm the Start Screen is the first visible screen, then press Start Fight and verify the Pokémon selection screen shell appears.

### Tests for User Story 1

- [X] T011 [P] [US1] Add integration coverage for the initial launch and Start Fight transition in `tests/integration/start-screen-flow.test.ts`.

### Implementation for User Story 1

- [X] T012 [US1] Implement the `StartScreenScene` UI and Start Fight action in `src/scenes/StartScreenScene.ts`.
- [X] T013 [US1] Wire the launch flow so `src/app.ts` opens `StartScreenScene` first and transitions to `PokemonSelectScene`.

**Checkpoint**: The game opens on Start Screen and can enter the pre-fight flow.

---

## Phase 4: User Story 2 - Choose a Pokémon Before the Fight (Priority: P1)

**Goal**: The player can choose exactly one Pokémon before the fight, and only the first 150 Pokémon are available.

**Independent Test**: Open the selection flow, verify only the first 150 Pokémon are shown, select one Pokémon, confirm it, and verify invalid out-of-range choices are rejected.

### Tests for User Story 2

- [X] T014 [P] [US2] Add unit tests for roster filtering, selection highlighting, confirmation, and out-of-range rejection in `tests/unit/pokemonSelect.test.ts`.

### Implementation for User Story 2

- [X] T015 [US2] Render the filtered roster and selection highlight in `src/scenes/PokemonSelectScene.ts`.
- [X] T016 [US2] Implement selection confirmation, temporary-state reset, and invalid selection guards in `src/state/selectionState.ts` and `src/scenes/PokemonSelectScene.ts`.
- [X] T017 [US2] Persist the confirmed Pokémon into the fight handoff state in `src/state/gameFlow.ts`.

**Checkpoint**: The player can make a valid pre-fight selection and the choice is stored for the upcoming match.

---

## Phase 5: User Story 3 - Start and Repeat Local Matches with the Chosen Pokémon (Priority: P2)

**Goal**: The player can start a deterministic local match with the confirmed Pokémon, then return to Start Screen and begin again cleanly.

**Independent Test**: Confirm a Pokémon, start the fight, complete or exit the match, and verify the game returns to a clean Start Screen state with no stale selection.

### Tests for User Story 3

- [X] T018 [P] [US3] Add integration coverage for fight setup, result flow, and return-to-start reset in `tests/integration/fight-flow.test.ts`.
- [X] T019 [P] [US3] Add unit tests for deterministic fight setup and state reset in `tests/unit/fightSetup.test.ts` and `tests/unit/gameFlow.test.ts`.

### Implementation for User Story 3

- [X] T020 [US3] Implement the deterministic fight setup scene and builder in `src/scenes/FightSetupScene.ts` and `src/systems/deterministicFightSetup.ts`.
- [X] T021 [US3] Implement the active fight and result handoff scenes in `src/scenes/FightScene.ts`, `src/scenes/ResultScene.ts`, and `src/state/gameFlow.ts`.
- [X] T022 [US3] Clear selection and session state when returning to the Start Screen in `src/state/selectionState.ts` and `src/state/gameFlow.ts`.

**Checkpoint**: The local fight loop is deterministic, repeatable, and resets cleanly.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final hardening, offline-only safeguards, and end-to-end validation.

- [X] T023 [P] Add offline-only guard coverage and no-network assertions in `tests/unit/offlineGuard.test.ts` and `src/systems/offlineGuard.ts`.
- [X] T024 [P] Update the manual smoke-test checklist and implementation notes in `specs/001-pokemon-select-screen/quickstart.md`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion; blocks all user stories.
- **User Stories (Phase 3+)**: Depend on Foundation completion.
- **Polish (Phase 6)**: Depends on the implemented stories you want to harden.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundation; no dependency on later stories.
- **User Story 2 (P1)**: Can start after Foundation; uses the shared selection shell from Phase 2 and remains independently testable.
- **User Story 3 (P2)**: Depends on confirmed selection and deterministic setup from User Story 2.

### Parallel Opportunities

- Setup: `T002` and `T003` can run in parallel after `T001`.
- Foundation: `T004` and `T005` can run in parallel; `T007` can proceed alongside the roster work if the file boundaries are respected.
- User Story 1: `T011` can be prepared independently of the scene implementation.
- User Story 2: `T014` can run independently of the scene implementation tasks.
- User Story 3: `T018` and `T019` can run in parallel.
- Polish: `T023` and `T024` can run in parallel.

---

## Parallel Example: User Story 1

```text
Task: "Add integration coverage for the initial launch and Start Fight transition in `tests/integration/start-screen-flow.test.ts`."
Task: "Implement the `StartScreenScene` UI and Start Fight action in `src/scenes/StartScreenScene.ts`."
Task: "Wire the launch flow so `src/app.ts` opens `StartScreenScene` first and transitions to `PokemonSelectScene`."
```

---

## Parallel Example: User Story 2

```text
Task: "Add unit tests for roster filtering, selection highlighting, confirmation, and out-of-range rejection in `tests/unit/pokemonSelect.test.ts`."
Task: "Render the filtered roster and selection highlight in `src/scenes/PokemonSelectScene.ts`."
Task: "Implement selection confirmation, temporary-state reset, and invalid selection guards in `src/state/selectionState.ts` and `src/scenes/PokemonSelectScene.ts`."
```

---

## Parallel Example: User Story 3

```text
Task: "Add integration coverage for fight setup, result flow, and return-to-start reset in `tests/integration/fight-flow.test.ts`."
Task: "Add unit tests for deterministic fight setup and state reset in `tests/unit/fightSetup.test.ts` and `tests/unit/gameFlow.test.ts`."
Task: "Implement the deterministic fight setup scene and builder in `src/scenes/FightSetupScene.ts` and `src/systems/deterministicFightSetup.ts`."
```

---

## Implementation Strategy

### MVP First

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational.
3. Complete Phase 3: User Story 1.
4. Stop and validate the Start Screen to selection shell handoff.

### Incremental Delivery

1. Ship the start screen entry flow first.
2. Add the full first-150 Pokémon selection flow next.
3. Add deterministic fight setup and return-to-start reset last.
4. Keep every step local-first and offline-only.

### Parallel Team Strategy

With multiple developers:

1. One developer can handle Setup while another prepares Foundation tests.
2. After Foundation, split work by story:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Integrate after each story checkpoint to keep the flow deterministic and regression-free.



