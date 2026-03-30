export type MatchStatus = 'Pending' | 'Active' | 'Complete' | 'Abandoned';
export type BattleWinner = 'Player' | 'Opponent' | 'Draw';

export interface FightSetup {
  matchId: string;
  playerPokemonId: number;
  opponentPokemonId: number;
  deterministicSeed: string;
  sourceSelectionId: number;
}

export interface MatchSession {
  sessionId: string;
  setup: FightSetup;
  status: MatchStatus;
  winner: BattleWinner | null;
}

const POKEMON_POOL_SIZE = 150;

const wrapPokemonId = (value: number): number => ((value - 1) % POKEMON_POOL_SIZE + POKEMON_POOL_SIZE) % POKEMON_POOL_SIZE + 1;

export const createDeterministicFightSetup = (
  sourceSelectionId: number,
  playerPokemonId: number,
): FightSetup => {
  const deterministicSeed = `pokemon-select:${sourceSelectionId}:${playerPokemonId}`;
  let opponentPokemonId = wrapPokemonId(playerPokemonId + sourceSelectionId * 7);

  if (opponentPokemonId === playerPokemonId) {
    opponentPokemonId = wrapPokemonId(opponentPokemonId + 1);
  }

  return {
    matchId: `match-${sourceSelectionId}-${playerPokemonId}`,
    playerPokemonId,
    opponentPokemonId,
    deterministicSeed,
    sourceSelectionId,
  };
};

export const createMatchSession = (setup: FightSetup): MatchSession => ({
  sessionId: `session-${setup.matchId}`,
  setup,
  status: 'Pending',
  winner: null,
});

export const resolveDeterministicFightOutcome = (setup: FightSetup): BattleWinner => {
  const score = (setup.playerPokemonId * 3 + setup.opponentPokemonId + setup.sourceSelectionId) % 3;

  if (score === 0) {
    return 'Player';
  }

  if (score === 1) {
    return 'Opponent';
  }

  return 'Draw';
};

