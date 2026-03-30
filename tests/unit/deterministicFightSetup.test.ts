import { describe, expect, it } from 'vitest';
import {
  createDeterministicFightSetup,
  createMatchSession,
  resolveDeterministicFightOutcome,
} from '../../src/systems/deterministicFightSetup';

describe('deterministicFightSetup', () => {
  it('produces the same setup for the same selection inputs', () => {
    const first = createDeterministicFightSetup(25, 25);
    const second = createDeterministicFightSetup(25, 25);

    expect(first).toEqual(second);
    expect(first.playerPokemonId).toBe(25);
    expect(first.sourceSelectionId).toBe(25);
    expect(first.opponentPokemonId).toBeGreaterThanOrEqual(1);
    expect(first.opponentPokemonId).toBeLessThanOrEqual(150);
  });

  it('creates pending sessions and resolves outcomes deterministically', () => {
    const setup = createDeterministicFightSetup(7, 7);
    const session = createMatchSession(setup);

    expect(session.status).toBe('Pending');
    expect(session.winner).toBeNull();
    expect(resolveDeterministicFightOutcome(setup)).toMatch(/^(Player|Opponent|Draw)$/);
  });
});

