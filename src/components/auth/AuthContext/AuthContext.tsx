'use client';

import { createContext, useReducer, Dispatch } from 'react';

interface User {
  name: string | null;
  email: string | null;
  token: string | null;
}
const initialState = {
  name: '',
  email: '',
  token: ''
};

type Actions =
  | {
      type: 'LOGIN';
      payload: User;
    }
  | { type: 'LOGOUT' }
  | { type: 'LOGIN_ERROR' };

export const AuthContext = createContext<{
  user: User;
  dispatch: Dispatch<Actions>;
}>({
  dispatch: () => null,
  user: initialState
});

const reducer = (state: User = initialState, action: Actions) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        ...action.payload
      };
    case 'LOGOUT':
      return {
        name: null,
        email: null,
        token: null
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        name: null,
        email: null,
        token: null
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, dispatch] = useReducer(reducer, initialState);

  console.log({ user });
  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
