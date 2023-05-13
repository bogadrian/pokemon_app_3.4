'use client';

import { useRouter } from 'next/navigation';
import styles from './search-pokemon.module.css';
import { useDebounce } from './useDebounce';
import { useState, useEffect, useRef, ChangeEvent, useTransition } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export const SearchPokemon = () => {
  const { push } = useRouter();
  const [value, setValue] = useState('');
  const [currentOffset, setCurrentOffset] = useState('');
  const [, startTransition] = useTransition();
  const pathname = usePathname();
  const searchQuery = useDebounce(value, 400);
  const query = useSearchParams();
  const offset = query.get('offset');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setCurrentOffset(offset || '0');
    if (!!searchQuery) {
      push(`/dashboard/pokemons?searchQuery=${searchQuery}`);
      // no need for startTransition here because the UI on client is not upadintg syncronosuly. only on the server!
      startTransition(() => {});
    }

    if (!searchQuery && pathname === '/dashboard/pokemons') {
      push(`/dashboard/pokemons?offset=${currentOffset}&searchQuery=`);
    }
  }, [searchQuery, pathname]);

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        placeholder="search pokemon ..."
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};
