import 'server-only';

import Image from 'next/image';
import Link from 'next/link';

import styles from './pokemon-card.module.css';

import { Pokemon } from '../../types/pokemons';

interface Props {
  pokemon: Omit<Pokemon, 'url'>;
  lastIndex: number;
  index: number;
}

export const PokemonCard = ({ pokemon, lastIndex, index }: Props) => {
  return (
    <Link
      href={{
        pathname: `/dashboard/pokemon-details/${pokemon.id}`,
        query: { backTo: '/dashboard/pokemons' }
      }}
    >
      <div
        className={styles.card}
        id={index === lastIndex - 15 ? `card-${lastIndex - 15}` : ''}
        style={{ backgroundColor: index === lastIndex - 15 ? 'red' : 'blue' }}
      >
        <h1 className={styles.title}>
          <span>Pokemon name</span>
          <span className={styles.span}>{pokemon.name}</span>
        </h1>
        <Image
          src={pokemon.image}
          alt="Pokemon image"
          width={250}
          height={250}
        />
        <h2 className={styles.link}>See pokemon's details</h2>
      </div>
    </Link>
  );
};
