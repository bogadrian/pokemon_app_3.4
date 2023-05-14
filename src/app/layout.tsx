import { Inter } from 'next/font/google';
import './globals.css';

import { SearchPokemon } from '@/components/client/SearchPokemon/SearchPokemon';
import { AuthProvider } from '@/components/client/auth/AuthContext';
import { SetCookie } from '@/components/client/setCookie';
import { NavigationBar } from '../components/server/NavigationBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Pokemon App',
  description: 'A demo app'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div style={{ height: '100vh' }}>
            <div style={{ height: '15vh' }}>
              <NavigationBar>
                <SearchPokemon />
              </NavigationBar>
            </div>
            <div style={{ marginTop: '-100px' }}>{children}</div>
          </div>
        </AuthProvider>
        <SetCookie />
      </body>
    </html>
  );
}
