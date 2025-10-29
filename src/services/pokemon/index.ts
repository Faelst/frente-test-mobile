import api from "../api";
import type { PokemonResponse } from "../../types/pokemon";

export async function fetchPokemon(name: string): Promise<{
  pokemon: string;
  abilities: string[];
}> {
  const res = await api.get<PokemonResponse>(
    `/pokemon/fetch-skills-by-pokemon-name-order-by-skill-name/${encodeURIComponent(
      name
    )}`
  );

  return {
    pokemon: res.data.pokemon,
    abilities: res.data.abilities,
  };
}
