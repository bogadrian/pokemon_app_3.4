import 'server-only';

import Image from 'next/image';
import { NavigationItems } from '../../client/NavigationItems';
import { User } from '../../client/User';
import styles from './navbar.module.css';

export const NavigationBar = ({ children }: { children: React.ReactNode }) => {
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
      <div style={{ width: '60%', marginLeft: '200px' }}>{children}</div>
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
