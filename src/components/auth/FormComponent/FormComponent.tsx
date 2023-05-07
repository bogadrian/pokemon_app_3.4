'use client';

import styles from './form-component.module.css';
import { FormEvent, useRef, useContext } from 'react';
import { AuthContext } from '@/components/auth/AuthContext';
import { useRouter } from 'next/navigation';

export const FormComponent = ({ children }: { children: React.ReactNode }) => {
  const refNameOrEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const { refresh, replace } = useRouter();

  const { dispatch } = useContext(AuthContext);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nameOrEmail: refNameOrEmail.current?.value,
        password: refPassword.current?.value
      })
    });

    const user = await response.json();

    if (user.message === 'ok') {
      dispatch({ type: 'LOGIN', payload: user.user });
      replace('/');
    }

    if (user.message === 'ko') {
      dispatch({ type: 'LOGIN_ERROR' });
    }
    refresh();
  };
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <input
        className={styles.input}
        placeholder="name or email"
        ref={refNameOrEmail}
      />
      {children}
      <input
        className={styles.input}
        placeholder="password"
        ref={refPassword}
      />
      <div className={styles.button_container}>
        <button type="submit" className={styles.button}>
          Login
        </button>
      </div>
    </form>
  );
};
