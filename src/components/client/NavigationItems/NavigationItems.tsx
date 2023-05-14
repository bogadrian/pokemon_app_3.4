'use client';

export const dynamic = 'force-dynamic';

import styles from './navigation-items.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routes = [
  { name: 'Home', path: '/' },
  { name: 'Pokemons', path: '/dashboard/pokemons' }
];

export const NavigationItems = () => {
  const pathname = usePathname();

  return (
    <ul className={styles.items}>
      {routes.map(route => {
        return (
          <li
            key={route.path}
            className={styles.item}
            style={{
              textDecoration: route.path === pathname ? 'underline' : ''
            }}
          >
            <Link href={route.path}>{route.name}</Link>
          </li>
        );
      })}
    </ul>
  );
};
