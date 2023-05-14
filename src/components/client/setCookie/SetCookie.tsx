'use client';

import { setCookie } from 'cookies-next';
import { v4 } from 'uuid';

export const SetCookie = () => {
  const serverSessionId = v4();

  setCookie('serverSessionId', serverSessionId, { maxAge: 60 * 10 });

  return null;
};
