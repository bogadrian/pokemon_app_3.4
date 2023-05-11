import { Pokemon } from '../types/pokemons';

// get random pokemon name by calling the pokemon api with a random offset (pages form min to max, where min is for ex 50 and max is 70)
export const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const pokemonsStore = () => {
  const pokemonsList: { [sessionId: string]: Pokemon[] } = { sessionId: [] };
  const pokemonsResponses: {
    [sessionId: string]: { results: Pokemon[] };
  } = {
    sessionId: {
      results: []
    }
  };

  const setPokemons = ({
    pokemons,
    sessionId
  }: {
    pokemons: Pokemon[];
    sessionId: string | undefined;
  }) => {
    // create the array
    if (!!sessionId && !Array.isArray(pokemonsList[sessionId])) {
      pokemonsList[sessionId] = [];
    }

    if (!!sessionId && Array.isArray(pokemonsList[sessionId])) {
      // filter the pokemons arrived out form pokemonsList[sessionId]
      const newPokemons = pokemons.filter(pokemon => {
        return pokemonsList[sessionId].map(pok => pok.name !== pokemon.name);
      });
      //push the newPokemons in the local pokemons
      pokemonsList[sessionId].push(...newPokemons);
      // set the pokemonsResponses to the local list of pokemons
      pokemonsResponses[sessionId] = {
        results: pokemonsList[sessionId]
      };
    }
  };

  const getPokemonsList = async ({
    searchQuery,
    sessionId
  }: {
    searchQuery: string;
    sessionId: string | undefined;
  }): Promise<{ results: Pokemon[] }> => {
    return new Promise(resolve => {
      if (sessionId)
        if (!searchQuery) {
          // if no search query resolve with all the local list
          resolve(pokemonsResponses[sessionId]);
        } else {
          // if search quesry resolve with filtred pokemons form local list based on that query
          const pokemonsFiltered = pokemonsResponses[sessionId].results.filter(
            pok => {
              return pok.name.includes(searchQuery);
            }
          );

          // construct the response out of filtered pokemons
          const response = {
            ...pokemonsResponses[sessionId],
            results: pokemonsFiltered
          };
          resolve(response);
        }
    });
  };

  const clearStore = (sessionId: string | undefined) => {
    // set local pokemons list to length 0 and rsults to empty array when cleaning the store
    if (sessionId && Array.isArray(pokemonsList[sessionId])) {
      pokemonsList[sessionId].length = 0;
      pokemonsResponses[sessionId] = { results: [] };
    }
  };

  return { setPokemons, getPokemonsList, clearStore };
};

export const { setPokemons, getPokemonsList, clearStore } = pokemonsStore();
