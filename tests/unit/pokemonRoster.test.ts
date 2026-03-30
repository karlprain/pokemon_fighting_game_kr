import { describe, expect, it } from 'vitest';
import {
  getPokemonById,
  getSelectablePokemonRoster,
  POKEMON_ROSTER,
  POKEMON_ROSTER_LIMIT,
  isEligiblePokemonId,
  validatePokemonRoster,
} from '../../src/data/pokemonRoster';

describe('pokemonRoster', () => {
  it('contains exactly the first 150 Pokémon in stable order', () => {
    expect(POKEMON_ROSTER).toHaveLength(POKEMON_ROSTER_LIMIT);
    expect(validatePokemonRoster()).toBe(true);
    expect(POKEMON_ROSTER[0]).toMatchObject({ id: 1, nationalDexNumber: 1, name: 'Bulbasaur' });
    expect(POKEMON_ROSTER[149]).toMatchObject({ id: 150, nationalDexNumber: 150, name: 'Mewtwo' });
  });

  it('filters to eligible roster entries only', () => {
    const roster = getSelectablePokemonRoster();

    expect(roster).toHaveLength(150);
    expect(roster.every((entry) => isEligiblePokemonId(entry.id))).toBe(true);
    expect(getPokemonById(151)).toBeUndefined();
  });
});

