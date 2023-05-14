'use client';

import styles from './list-transparent.module.css';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export const ListComponentTransparentDown = ({
  lastIndex,
  nextLink
}: {
  lastIndex: number;
  nextLink: string;
}) => {
  const { replace, refresh } = useRouter();
  const searchParams = useSearchParams();
  const { ref, inView } = useInView({ threshold: 1 });
  const pathname = usePathname();
  const search = searchParams.get('searchQuery');

  useEffect(() => {
    const params = nextLink.split('?')[1].split('&')[0];

    const offset = nextLink.split('?')[1].split('&')[0].split('=')[1];

    if (inView && !search && pathname === '/dashboard/pokemons') {
      replace(`/dashboard/pokemons?${params}`);
    }

    const card = document.getElementById(`card-${lastIndex - 15}`);

    !search && offset && Number(offset) > 17 && card?.scrollIntoView(false);
  }, [inView, pathname, lastIndex, nextLink]);

  return (
    <>
      <div className={styles.cardDown} ref={ref} />
    </>
  );
};
