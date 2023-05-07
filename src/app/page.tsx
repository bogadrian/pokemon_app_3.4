import 'server-only';

import { cache } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { randomIntFromInterval } from '../utils';

const pokemonRandomName = async () => {
  const pokemons = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${
      randomIntFromInterval(1, 19) * 10
    }`
  );

  if (!pokemons.ok) {
    throw new Error('Failed to fetch data');
  }

  const pokemon = await pokemons.json();

  // get the pokemon name form the 20 results in offset (50 to 70 for ex) returned, may be 58 for ex.
  const randomPokemonName = pokemon.results[randomIntFromInterval(1, 18)];

  return randomPokemonName;
};

// get the current pokemn fetched by its name - name determined in "fetchPokemonRandomName"
const getPokemon = async ({
  pokemonName
}: {
  pokemonName: string;
}): Promise<{
  id: string;
  name: string;
}> => {
  // default hard caching is enabled here by deafult. if you go bac - forward the page will be cache
  const pokemon = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );

  if (!pokemon.ok) {
    throw new Error('Failed to fetch pokemon');
  }

  return pokemon.json();
};

// get pokemon image. use cache to cache the function?
// if this was LinkedIn posts I may want to not cache data at all, use fetch('https://...', { cache: 'no-store' });
const getPokemonImage = cache(async () => {
  // sequential requestes
  const pokemonName = await pokemonRandomName();

  const pokemon = await getPokemon({ pokemonName: pokemonName.name });

  const pokemonImage = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg`;

  return { pokemonImage, pokemon };
});

const Home = async () => {
  const { pokemonImage, pokemon } = await getPokemonImage();

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1 style={{ marginBottom: '60px' }}>
          Your Pokemon is:
          <span style={{ color: 'red', marginLeft: '10px' }}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </span>
        </h1>
        <Image
          src={pokemonImage as string}
          alt="Pokemon Image"
          width={400}
          height={400}
        />
        <div className={styles.links}>
          <Link
            href={{
              pathname: `/dashboard/pokemon-details/${pokemon.id}`,
              query: { backTo: '/' }
            }}
          >
            See pokemon's details
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
