import 'server-only';

import { cache } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import rootStyles from '../../../page.module.css';

// generate metadata for Pokemon details page

// get pokemon details by pokemon id  - this only returns the Abilities
const getPokemonDetails = async ({
  id
}: {
  id: string;
}): Promise<{
  id: string;
  name: string;
  abilities: { ability: { name: string } }[];
}> => {
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (!pokemon.ok) {
    throw new Error('Failed to fetch data');
  }

  return pokemon.json();
};

// use cache to cache this function
const getPokemonImage = cache(async ({ id }: { id: string }) => {
  return new Promise(resolve => {
    resolve(
      `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`
    );
  });
});

// get the Pokemon description - no need to usecache, fetch is cached already
const getPokemonDescription = async ({ id }: { id: string }) => {
  const description = await fetch(
    `https://pokeapi.co/api/v2/ability/${id}?language=en`
  );

  if (!description.ok) {
    throw new Error('Failed to fetch data');
  }

  return description.json();
};

/// genarate Metadata for each pokemon details

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id;

  // get pokemon
  const pokemonData = getPokemonDetails({ id });
  const descriptionData = getPokemonDescription({ id });

  // parallel data fetching
  const [pokemon, description] = await Promise.all([
    pokemonData,
    descriptionData
  ]);

  return {
    title: pokemon.name,
    openGraph: {
      description: description?.effect_entries[1]?.effect
    }
  };
}

/////

const PokemonDetails = async ({
  params: { id },
  searchParams: { backTo }
}: {
  params: { id: string };
  // navigate back to the path in searchParams
  searchParams: { backTo: '/dashboard/pokemons' | '/' };
}) => {
  console.log({ id, backTo });
  const pokemonData = getPokemonDetails({ id });
  const descriptionData = getPokemonDescription({ id });
  const imageData: string | unknown = getPokemonImage({ id });

  // parallel data fetching
  const [pokemon, description, image] = await Promise.all([
    pokemonData,
    descriptionData,
    imageData
  ]);

  return (
    <main className={rootStyles.main}>
      <div className={rootStyles.card}>
        <h1
          style={{
            marginBottom: '30px',
            fontSize: '50px',
            marginTop: '100px'
          }}
        >
          Your Pokemon is:
          <span style={{ color: 'red', marginLeft: '10px' }}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </span>
        </h1>
        <Image
          src={image as string}
          alt="Pokemon Image"
          width={400}
          height={400}
        />
        {pokemon.abilities.map(pokemon => {
          return (
            <ol
              key={pokemon.ability.name}
              style={{
                width: '100%',
                textAlign: 'left',
                marginLeft: '10px',
                marginBottom: '20px',
                marginTop: '-30px'
              }}
            >
              <h1>
                Ability:
                <span style={{ color: 'red', padding: '10px' }}>
                  {pokemon.ability.name}
                </span>
              </h1>
            </ol>
          );
        })}
        {description.effect_entries[1] && (
          <h2 style={{ margin: '0 20px 0 10px' }}>
            {description.effect_entries[1].effect}
          </h2>
        )}
        <div className={rootStyles.links}>
          <Link href={backTo}>Go back</Link>
        </div>
      </div>
    </main>
  );
};

export default PokemonDetails;
