import styles from './navbar.module.css';
import Image from 'next/image';
import { NavigationItems } from '../NavigationItems';
import { SearchPokemon } from '@/components/SearchPokemon';
import { User } from '../user';

export const NavigationBar = () => {
  return (
    <nav className={styles.nav}>
      <div>
        <Image
          src="/assets/logo.png"
          alt="logo"
          width={40}
          height={40}
          style={{ borderRadius: '50%' }}
        />
      </div>
      <div style={{ width: '30%', marginLeft: '20px' }}>
        <NavigationItems />
      </div>
      <div style={{ width: '60%', marginLeft: '200px' }}>
        <SearchPokemon />
      </div>
      <div
        style={{
          width: '20%',
          display: 'flex',

          justifyContent: 'flex-end',
          marginTop: '30px'
        }}
      >
        <User />
      </div>
    </nav>
  );
};
