import { describe, expect, it } from 'vitest';
import { createGameFlowController } from '../../src/state/gameFlow';

describe('fight flow', () => {
  it('runs a complete deterministic fight flow and resets back to Start Screen', () => {
    const controller = createGameFlowController();

    controller.requestStartFight();
    controller.highlightPokemon(33);
    controller.confirmPokemon();
    controller.beginFightSetup();

    expect(controller.state.currentScreen).toBe('FightSetup');
    expect(controller.state.session?.setup.playerPokemonId).toBe(33);

    controller.activateFight();
    expect(controller.state.currentScreen).toBe('FightActive');

    controller.completeFight('Opponent');
    expect(controller.state.currentScreen).toBe('Result');
    expect(controller.state.session?.winner).toBe('Opponent');

    controller.returnToStart();
    expect(controller.state.currentScreen).toBe('StartScreen');
    expect(controller.state.selection.selectedPokemonId).toBeNull();
    expect(controller.state.session).toBeNull();
  });
});

