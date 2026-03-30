import { describe, expect, it } from 'vitest';
import {
  beginFightSetup,
  completeFight,
  confirmPokemonSelection,
  createInitialGameFlowState,
  highlightPokemonSelection,
  requestStartFight,
  returnToStart,
} from '../../src/state/gameFlow';

describe('gameFlow', () => {
  it('opens on StartScreen and transitions to PokemonSelect', () => {
    const initial = createInitialGameFlowState();

    expect(initial.currentScreen).toBe('StartScreen');
    expect(initial.canStartFight).toBe(true);
    expect(initial.canReturnToStart).toBe(false);

    const selection = requestStartFight(initial);
    expect(selection.currentScreen).toBe('PokemonSelect');
    expect(selection.selection.selectedPokemonId).toBeNull();
    expect(selection.selection.isConfirmed).toBe(false);
  });

  it('stores confirmed selection, builds a fight setup, and resets cleanly', () => {
    const start = requestStartFight(createInitialGameFlowState());
    const highlighted = highlightPokemonSelection(start, 25);
    const confirmed = confirmPokemonSelection(highlighted);
    const setup = beginFightSetup(confirmed);

    expect(setup.currentScreen).toBe('FightSetup');
    expect(setup.session?.setup.playerPokemonId).toBe(25);
    expect(setup.session?.setup.sourceSelectionId).toBe(25);

    const completed = completeFight(setup, 'Player');
    expect(completed.currentScreen).toBe('Result');
    expect(completed.session?.winner).toBe('Player');

    const reset = returnToStart();
    expect(reset.currentScreen).toBe('StartScreen');
    expect(reset.selection.selectedPokemonId).toBeNull();
    expect(reset.selection.confirmedPokemonId).toBeNull();
    expect(reset.session).toBeNull();
  });
});

