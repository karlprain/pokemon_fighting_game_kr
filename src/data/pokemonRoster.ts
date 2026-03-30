export interface PokemonRosterEntry {
  id: number;
  nationalDexNumber: number;
  name: string;
  displayOrder: number;
  assetKey: string;
}

export const POKEMON_ROSTER_LIMIT = 150;

const POKEMON_NAMES = [
  'Bulbasaur',
  'Ivysaur',
  'Venusaur',
  'Charmander',
  'Charmeleon',
  'Charizard',
  'Squirtle',
  'Wartortle',
  'Blastoise',
  'Caterpie',
  'Metapod',
  'Butterfree',
  'Weedle',
  'Kakuna',
  'Beedrill',
  'Pidgey',
  'Pidgeotto',
  'Pidgeot',
  'Rattata',
  'Raticate',
  'Spearow',
  'Fearow',
  'Ekans',
  'Arbok',
  'Pikachu',
  'Raichu',
  'Sandshrew',
  'Sandslash',
  'Nidoran♀',
  'Nidorina',
  'Nidoqueen',
  'Nidoran♂',
  'Nidorino',
  'Nidoking',
  'Clefairy',
  'Clefable',
  'Vulpix',
  'Ninetales',
  'Jigglypuff',
  'Wigglytuff',
  'Zubat',
  'Golbat',
  'Oddish',
  'Gloom',
  'Vileplume',
  'Paras',
  'Parasect',
  'Venonat',
  'Venomoth',
  'Diglett',
  'Dugtrio',
  'Meowth',
  'Persian',
  'Psyduck',
  'Golduck',
  'Mankey',
  'Primeape',
  'Growlithe',
  'Arcanine',
  'Poliwag',
  'Poliwhirl',
  'Poliwrath',
  'Abra',
  'Kadabra',
  'Alakazam',
  'Machop',
  'Machoke',
  'Machamp',
  'Bellsprout',
  'Weepinbell',
  'Victreebel',
  'Tentacool',
  'Tentacruel',
  'Geodude',
  'Graveler',
  'Golem',
  'Ponyta',
  'Rapidash',
  'Slowpoke',
  'Slowbro',
  'Magnemite',
  'Magneton',
  "Farfetch'd",
  'Doduo',
  'Dodrio',
  'Seel',
  'Dewgong',
  'Grimer',
  'Muk',
  'Shellder',
  'Cloyster',
  'Gastly',
  'Haunter',
  'Gengar',
  'Onix',
  'Drowzee',
  'Hypno',
  'Krabby',
  'Kingler',
  'Voltorb',
  'Electrode',
  'Exeggcute',
  'Exeggutor',
  'Cubone',
  'Marowak',
  'Hitmonlee',
  'Hitmonchan',
  'Lickitung',
  'Koffing',
  'Weezing',
  'Rhyhorn',
  'Rhydon',
  'Chansey',
  'Tangela',
  'Kangaskhan',
  'Horsea',
  'Seadra',
  'Goldeen',
  'Seaking',
  'Staryu',
  'Starmie',
  'Mr. Mime',
  'Scyther',
  'Jynx',
  'Electabuzz',
  'Magmar',
  'Pinsir',
  'Tauros',
  'Magikarp',
  'Gyarados',
  'Lapras',
  'Ditto',
  'Eevee',
  'Vaporeon',
  'Jolteon',
  'Flareon',
  'Porygon',
  'Omanyte',
  'Omastar',
  'Kabuto',
  'Kabutops',
  'Aerodactyl',
  'Snorlax',
  'Articuno',
  'Zapdos',
  'Moltres',
  'Dratini',
  'Dragonair',
  'Dragonite',
  'Mewtwo',
] as const;

export const POKEMON_ROSTER = Object.freeze(
  POKEMON_NAMES.map((name, index) => {
    const id = index + 1;
    return Object.freeze({
      id,
      nationalDexNumber: id,
      name,
      displayOrder: id,
      assetKey: `pokemon-${String(id).padStart(3, '0')}`,
    }) as PokemonRosterEntry;
  }),
) as readonly PokemonRosterEntry[];

export const isEligiblePokemonId = (pokemonId: number): boolean =>
  Number.isInteger(pokemonId) && pokemonId >= 1 && pokemonId <= POKEMON_ROSTER_LIMIT;

export const getSelectablePokemonRoster = (): readonly PokemonRosterEntry[] =>
  POKEMON_ROSTER.filter((entry) => isEligiblePokemonId(entry.nationalDexNumber));

export const getPokemonById = (pokemonId: number): PokemonRosterEntry | undefined =>
  POKEMON_ROSTER.find((entry) => entry.id === pokemonId);

export const validatePokemonRoster = (
  roster: readonly PokemonRosterEntry[] = POKEMON_ROSTER,
): boolean => {
  if (roster.length !== POKEMON_ROSTER_LIMIT) {
    return false;
  }

  return roster.every(
    (entry, index) =>
      entry.id === index + 1 &&
      entry.nationalDexNumber === index + 1 &&
      entry.displayOrder === index + 1 &&
      entry.name.length > 0 &&
      isEligiblePokemonId(entry.id),
  );
};

