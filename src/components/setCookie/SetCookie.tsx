'use client';
import { setCookie } from 'cookies-next';
import { v4 } from 'uuid';
import { useContext } from 'react';
import { AuthContext } from '@/components/auth/AuthContext';

export const SetCookie = () => {
  const { user } = useContext(AuthContext);
  const serverSessionId = v4();
  setCookie('serverSessionId', serverSessionId, { maxAge: 60 * 60 });

  if (!user.name) {
    setCookie('token', '');
  }

  return null;
};
