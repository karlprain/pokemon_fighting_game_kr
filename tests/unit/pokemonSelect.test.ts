import { describe, expect, it } from 'vitest';
import { getSelectablePokemonRoster } from '../../src/data/pokemonRoster';
import {
  confirmPokemonSelection,
  createInitialGameFlowState,
  highlightPokemonSelection,
  requestStartFight,
} from '../../src/state/gameFlow';

describe('pokemon selection flow', () => {
  it('highlights valid choices and rejects out-of-range choices', () => {
    const start = requestStartFight(createInitialGameFlowState());
    const invalid = highlightPokemonSelection(start, 999);

    expect(invalid.selection.selectedPokemonId).toBeNull();

    const valid = highlightPokemonSelection(start, 25);
    expect(valid.selection.selectedPokemonId).toBe(25);
  });

  it('keeps a single confirmed Pokémon and only exposes the first 150 roster entries', () => {
    const start = requestStartFight(createInitialGameFlowState());
    const confirmed = confirmPokemonSelection(highlightPokemonSelection(start, 150));

    expect(confirmed.selection.isConfirmed).toBe(true);
    expect(confirmed.selection.confirmedPokemonId).toBe(150);
    expect(getSelectablePokemonRoster()).toHaveLength(150);
  });
});

