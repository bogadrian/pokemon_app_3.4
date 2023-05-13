import { Pokemon } from '../types/pokemons';

// get random pokemon name by calling the pokemon api with a random offset (pages form min to max, where min is for ex 50 and max is 70)
export const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const pokemonsStore = () => {
  const pokemonsList: { [sessionId: string]: Pokemon[] } = { sessionId: [] };

  const pokemonsResponse: {
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
      if (pokemonsList[sessionId].length === 0) {
        pokemonsList[sessionId] = [...pokemons];
      }

      if (pokemonsList[sessionId].length > 0) {
        const listPokemons = pokemonsList[sessionId].map(p => p.name);

        pokemons.forEach(pok => {
          if (!listPokemons.includes(pok.name)) {
            pokemonsList[sessionId].push(pok);
          }
        });
      }
      pokemonsList[sessionId].sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

      // // set the pokemonsResponses to the local list of pokemons
      pokemonsResponse[sessionId] = {
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
      if (sessionId) {
        // if no search query resolve with all the local list
        const response = {
          ...pokemonsResponse[sessionId],
          results: !!searchQuery
            ? pokemonsList[sessionId].filter(pok => {
                return pok.name.includes(searchQuery);
              })
            : pokemonsList[sessionId]
        };

        resolve(response);
      }
    });
  };

  return { setPokemons, getPokemonsList };
};

export const { setPokemons, getPokemonsList } = pokemonsStore();
