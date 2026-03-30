import { confirmSelection, createInitialSelectionState, highlightSelection, resetSelectionState, type SelectionState } from './selectionState';
import {
  createDeterministicFightSetup,
  createMatchSession,
  resolveDeterministicFightOutcome,
  type BattleWinner,
  type MatchSession,
} from '../systems/deterministicFightSetup';

export type ScreenState = 'Boot' | 'StartScreen' | 'PokemonSelect' | 'FightSetup' | 'FightActive' | 'Result';

export interface GameFlowState {
  currentScreen: ScreenState;
  canStartFight: boolean;
  canReturnToStart: boolean;
  selection: SelectionState;
  session: MatchSession | null;
}

export const createInitialGameFlowState = (): GameFlowState => ({
  currentScreen: 'StartScreen',
  canStartFight: true,
  canReturnToStart: false,
  selection: createInitialSelectionState(),
  session: null,
});

export const requestStartFight = (state: GameFlowState): GameFlowState => ({
  ...state,
  currentScreen: 'PokemonSelect',
  canStartFight: false,
  canReturnToStart: true,
  selection: resetSelectionState(),
  session: null,
});

export const highlightPokemonSelection = (
  state: GameFlowState,
  pokemonId: number,
): GameFlowState => {
  if (state.currentScreen !== 'PokemonSelect') {
    return state;
  }

  return {
    ...state,
    selection: highlightSelection(state.selection, pokemonId),
  };
};

export const confirmPokemonSelection = (state: GameFlowState): GameFlowState => {
  if (state.currentScreen !== 'PokemonSelect') {
    return state;
  }

  const nextSelection = confirmSelection(state.selection);

  return {
    ...state,
    selection: nextSelection,
  };
};

export const beginFightSetup = (state: GameFlowState): GameFlowState => {
  if (state.currentScreen !== 'PokemonSelect' || !state.selection.isConfirmed || state.selection.confirmedPokemonId === null) {
    return state;
  }

  const sourceSelectionId = state.selection.confirmedPokemonId;
  const setup = createDeterministicFightSetup(sourceSelectionId, state.selection.confirmedPokemonId);

  return {
    ...state,
    currentScreen: 'FightSetup',
    canStartFight: false,
    canReturnToStart: true,
    session: createMatchSession(setup),
  };
};

export const activateFight = (state: GameFlowState): GameFlowState => {
  if (state.currentScreen !== 'FightSetup' || state.session === null) {
    return state;
  }

  return {
    ...state,
    currentScreen: 'FightActive',
    session: {
      ...state.session,
      status: 'Active',
    },
  };
};

export const completeFight = (
  state: GameFlowState,
  winner: BattleWinner = state.session ? resolveDeterministicFightOutcome(state.session.setup) : 'Draw',
): GameFlowState => {
  if (state.session === null) {
    return state;
  }

  return {
    ...state,
    currentScreen: 'Result',
    canReturnToStart: true,
    session: {
      ...state.session,
      status: 'Complete',
      winner,
    },
  };
};

export const returnToStart = (): GameFlowState => ({
  currentScreen: 'StartScreen',
  canStartFight: true,
  canReturnToStart: false,
  selection: createInitialSelectionState(),
  session: null,
});

export class GameFlowController {
  private currentState: GameFlowState = createInitialGameFlowState();

  get state(): GameFlowState {
    return this.currentState;
  }

  requestStartFight(): GameFlowState {
    this.currentState = requestStartFight(this.currentState);
    return this.currentState;
  }

  highlightPokemon(pokemonId: number): GameFlowState {
    this.currentState = highlightPokemonSelection(this.currentState, pokemonId);
    return this.currentState;
  }

  confirmPokemon(): GameFlowState {
    this.currentState = confirmPokemonSelection(this.currentState);
    return this.currentState;
  }

  beginFightSetup(): GameFlowState {
    this.currentState = beginFightSetup(this.currentState);
    return this.currentState;
  }

  activateFight(): GameFlowState {
    this.currentState = activateFight(this.currentState);
    return this.currentState;
  }

  completeFight(winner?: BattleWinner): GameFlowState {
    this.currentState = completeFight(this.currentState, winner);
    return this.currentState;
  }

  returnToStart(): GameFlowState {
    this.currentState = returnToStart();
    return this.currentState;
  }
}

let activeGameFlowController: GameFlowController | null = null;

export const createGameFlowController = (): GameFlowController => new GameFlowController();

export const setGameFlowController = (controller: GameFlowController): void => {
  activeGameFlowController = controller;
};

export const getGameFlowController = (): GameFlowController => {
  if (activeGameFlowController === null) {
    activeGameFlowController = createGameFlowController();
  }

  return activeGameFlowController;
};

