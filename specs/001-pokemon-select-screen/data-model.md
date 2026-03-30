# Data Model: Start Screen Pokémon Selection
## Entities
### ScreenState
- `currentScreen`: `Boot | StartScreen | PokemonSelect | FightSetup | FightActive | Result`
- `canStartFight`: boolean
- `canReturnToStart`: boolean
Rules: the game opens on `StartScreen`; `PokemonSelect` must occur before any fight begins.
### PokemonRosterEntry
- `id`: number
- `nationalDexNumber`: number
- `name`: string
- `displayOrder`: number
- `assetKey`: string
Rules: only National Dex numbers 1 through 150 are valid; roster order must be stable and deterministic.
### SelectionState
- `selectedPokemonId`: number | null
- `confirmedPokemonId`: number | null
- `isConfirmed`: boolean
Rules: a confirmed selection is required to start the fight; leaving the selection flow resets unconfirmed state.
### FightSetup
- `matchId`: string
- `playerPokemonId`: number
- `opponentPokemonId`: number
- `deterministicSeed`: string | number
- `sourceSelectionId`: number
Rules: `playerPokemonId` must match the confirmed selection; the same selection and inputs must produce the same setup.
### MatchSession
- `sessionId`: string
- `setup`: `FightSetup`
- `status`: `Pending | Active | Complete | Abandoned`
- `winner`: `Player | Opponent | Draw | null`
Rules: match sessions start only after confirmation, and returning to Start Screen clears session-specific selection state.
## Relationships
- `ScreenState` gates edits to `SelectionState`.
- `SelectionState` feeds into `FightSetup`.
- `FightSetup` creates `MatchSession`.
- `MatchSession` completion returns the flow to `StartScreen`.
## Validation Rules
- Reject any roster entry beyond the first 150.
- Reject fight start unless a Pokémon is confirmed.
- Clear selection state on return to start.
- Keep setup deterministic for the same selected Pokémon and inputs.
