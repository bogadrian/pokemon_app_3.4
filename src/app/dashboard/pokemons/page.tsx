import { ListComponentTransparentDown } from '@/components/auth/ListComponentTransparent';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { cache } from 'react';
import 'server-only';
import { PokemonCard } from '@/components/PokemonCard';
import { Pokemon, Pokemons } from '../../../types/pokemons';
import {
  getPokemonsList,
  randomIntFromInterval,
  setPokemons
} from '../../../utils';
import rootStyles from '../../page.module.css';
import style from './pokemons.module.css';

/**
 * 1 step: get pokemons list. returns pokemon name and url, no id
 * step 2 add image and id to pokemon in the list. call getpokemon Image and getPokemon to get those boths for addImageToPokemon function
 *
 *
 */

const getPokemons = async ({
  offset = '0'
}: {
  offset: string;
}): Promise<Pokemons> => {
  const pokemons = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=18&offset=${offset}`
  );

  if (!pokemons?.ok) {
    throw new Error('Failed to fetch getPokemons');
  }

  const list = await pokemons.json();

  return list;
};

// get pokemon image bu the pokemon id
const getPokemonImage = cache(
  async ({ id }: { id: string }): Promise<string> => {
    // return a Promise so I can await for it to move forward below in addImageToPokemon array.map async function. the URL called here is a fetch anyway, so async but I cannot use fetch for it, so I have to make myself a Promise in prder to await it. without the Promise here the image is not fetched and an error is thrwon because this function is called before the currentPokemon
    return new Promise(resolve => {
      resolve(
        `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`
      );
    });
  }
);

// get the images for each URL fetched here, so I get a final list of pokemons included images
const addImageToPokemon = cache(
  async (pokemons: { results: Pokemon[] }): Promise<Omit<Pokemon, 'url'>[]> => {
    // return an array of solved Promises when all the map finishes and none fails
    return Promise.all(
      // returns an array of unresolved promises becuase of async in map, so I have to Promise.all on that array
      pokemons.results.map(async (pokemon: Pokemon) => {
        // get the pokemon id form url property, avoid calling other api for the id
        const currentPokemon = pokemon.url.split('/');
        const id = currentPokemon[currentPokemon.length - 2];

        const image = await getPokemonImage({ id });

        return { image, name: pokemon.name, id };
      })
    );
  }
);

const Pokemons = async ({
  searchQuery,
  nextLink
}: {
  searchQuery: string;
  nextLink: string;
}) => {
  const cookieStore = cookies();

  const sessionId = cookieStore.get('serverSessionId');

  // get pokemons form internal store
  const pokemonsResponse = await getPokemonsList({
    searchQuery,
    sessionId: sessionId?.value
  });

  // use console.time to see how long a async function takes last measure: 352.ms can I do better?
  console.time('init');
  const pokemonWithImageAndId = await addImageToPokemon(pokemonsResponse);
  console.timeEnd('init');

  const isArrayNotEmpty = pokemonsResponse.results.length > 0;

  return (
    <>
      <div className={rootStyles.main}>
        <div className={rootStyles.card}>
          <div className={style.title}>
            {isArrayNotEmpty && (
              <Image
                src={
                  pokemonWithImageAndId[
                    randomIntFromInterval(
                      0,
                      pokemonsResponse.results.length - 1
                    )
                  ]?.image
                }
                alt="pokemon left"
                width={60}
                height={60}
              />
            )}
            <h1 className={style.titleText}>Pokemons list</h1>
            {isArrayNotEmpty && (
              <Image
                src={
                  pokemonWithImageAndId[
                    randomIntFromInterval(
                      0,
                      pokemonsResponse.results.length - 1
                    )
                  ]?.image
                }
                alt="pokemon right"
                width={60}
                height={60}
              />
            )}
            <h3 className={style.pokemon_numbers}>
              There are: {pokemonsResponse.results.length} pokemons found!
            </h3>
          </div>

          <div className={style.grid}>
            {pokemonWithImageAndId.map((pokemon, i) => {
              return (
                <div key={i}>
                  <PokemonCard
                    pokemon={pokemon}
                    lastIndex={pokemonWithImageAndId.length}
                    index={i}
                  />

                  <ListComponentTransparentDown
                    lastIndex={pokemonWithImageAndId.length}
                    nextLink={nextLink}
                  />
                </div>
              );
            })}
          </div>
          {pokemonWithImageAndId.length > 18 && (
            <div style={{ marginTop: '50px', marginBottom: '30px' }}>
              <div className={rootStyles.loader}></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const PokemonsWrapper = async ({
  searchParams: { offset, searchQuery }
}: {
  searchParams: { offset: string; searchQuery: string };
}) => {
  const cookieStore = cookies();

  const sessionId = cookieStore.get('serverSessionId');
  const list = await getPokemons({
    offset
  });

  // get the next link here form the response and pass it down to the client component that fires the next request
  const nextLink = list.next;
  console.log({ offset, nextLink });
  // this is called 2 times simetimes, probably because React 18 strict more
  setPokemons({
    pokemons: list.results,
    sessionId: sessionId?.value
  });

  return (
    <>
      {/* @ts-expect-error Async Server Component */}
      {list && <Pokemons searchQuery={searchQuery} nextLink={nextLink} />}
    </>
  );
};

export default PokemonsWrapper;
