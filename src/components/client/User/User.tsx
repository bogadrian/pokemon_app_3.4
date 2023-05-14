'use client';

import { AuthContext } from '@/components/client/auth/AuthContext';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import styles from './user.module.css';

export const User = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const { push, refresh } = useRouter();

  const serverSessionId = getCookie('serverSessionId');

  const logout = async () => {
    const response = await fetch('/api/logout');
    const res = await response.json();

    if (res.message === 'ok') {
      dispatch({ type: 'LOGOUT' });
      refresh();
      setOpen(false);
      push('/auth');
    }
    if (!!serverSessionId) setCookie('serverSessionId', '');
  };
  return (
    <>
      {user.name ? (
        <div className={styles.log_in} onClick={() => setOpen(!open)}>
          {user.name.split('')[0].toUpperCase()}
        </div>
      ) : (
        <div className={styles.log_out} onClick={() => push('/auth')}>
          Login
        </div>
      )}

      {open && (
        <div className={styles.logout} onClick={logout}>
          Logout
        </div>
      )}
    </>
  );
};
