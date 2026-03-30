import { describe, expect, it } from 'vitest';
import { createInitialGameFlowState, highlightPokemonSelection, beginFightSetup, confirmPokemonSelection, requestStartFight, returnToStart } from '../../src/state/gameFlow';
import { createDeterministicFightSetup } from '../../src/systems/deterministicFightSetup';

describe('fightSetup', () => {
  it('builds repeatable setup data from the confirmed Pokémon', () => {
    const first = createDeterministicFightSetup(42, 42);
    const second = createDeterministicFightSetup(42, 42);

    expect(first).toEqual(second);
    expect(first.matchId).toBe('match-42-42');
  });

  it('clears selection and session state when returning to the start screen', () => {
    const setup = beginFightSetup(
      confirmPokemonSelection(highlightPokemonSelection(requestStartFight(createInitialGameFlowState()), 42)),
    );

    expect(setup.session).not.toBeNull();
    const reset = returnToStart();

    expect(reset.selection.selectedPokemonId).toBeNull();
    expect(reset.session).toBeNull();
  });
});

