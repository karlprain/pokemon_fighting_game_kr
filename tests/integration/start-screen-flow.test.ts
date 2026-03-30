import { describe, expect, it } from 'vitest';
import { SCENE_ORDER } from '../../src/app';
import { createGameFlowController } from '../../src/state/gameFlow';

describe('start-screen flow', () => {
  it('launches with the Start Screen scene order and enters selection on request', () => {
    expect(SCENE_ORDER[0]).toBe('StartScreenScene');
    expect(SCENE_ORDER).toContain('PokemonSelectScene');

    const controller = createGameFlowController();
    expect(controller.state.currentScreen).toBe('StartScreen');

    controller.requestStartFight();
    expect(controller.state.currentScreen).toBe('PokemonSelect');
  });
});

