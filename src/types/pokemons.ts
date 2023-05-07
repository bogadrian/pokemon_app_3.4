export interface Pokemon {
  name: string;
  image: string;
  id: string;
  url: string;
}

export interface Pokemons {
  next: string;
  results: Pokemon[];
}
