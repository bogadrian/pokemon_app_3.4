'use client';

import { useRouter } from 'next/navigation';
import styles from './search-pokemon.module.css';
import { useDebounce } from './useDebounce';
import { useState, useEffect, ChangeEvent, useTransition } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';

export const SearchPokemon = () => {
  const { push, replace } = useRouter();
  const [value, setValue] = useState('');
  const [isPending, startTransition] = useTransition();
  const URLParams = useSearchParams();
  const search = URLParams.get('searchQuery');
  const pathname = usePathname();
  const searchQuery = useDebounce(value, 200);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (!!searchQuery) {
      startTransition(() => {
        push(`/dashboard/pokemons?searchQuery=${searchQuery}`);
      });
    } else {
      push(pathname);
    }
  }, [searchQuery]);

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
