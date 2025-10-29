export type AbilityEntry = {
  ability: { name: string; url: string };
  is_hidden: boolean;
  slot: number;
};

export type PokemonResponse = {
  pokemon: string;
  abilities: string[];
};
