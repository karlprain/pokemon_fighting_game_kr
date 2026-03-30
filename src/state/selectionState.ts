import { isEligiblePokemonId } from '../data/pokemonRoster';

export interface SelectionState {
  selectedPokemonId: number | null;
  confirmedPokemonId: number | null;
  isConfirmed: boolean;
}

export const createInitialSelectionState = (): SelectionState => ({
  selectedPokemonId: null,
  confirmedPokemonId: null,
  isConfirmed: false,
});

export const highlightSelection = (
  state: SelectionState,
  pokemonId: number,
): SelectionState => {
  if (!isEligiblePokemonId(pokemonId)) {
    return state;
  }

  return {
    selectedPokemonId: pokemonId,
    confirmedPokemonId: null,
    isConfirmed: false,
  };
};

export const confirmSelection = (
  state: SelectionState,
  pokemonId: number | null = state.selectedPokemonId,
): SelectionState => {
  if (pokemonId === null || !isEligiblePokemonId(pokemonId)) {
    return state;
  }

  return {
    selectedPokemonId: pokemonId,
    confirmedPokemonId: pokemonId,
    isConfirmed: true,
  };
};

export const resetSelectionState = (): SelectionState => createInitialSelectionState();

