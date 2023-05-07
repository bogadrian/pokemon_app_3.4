import './globals.css';
import { Inter } from 'next/font/google';

import { NavigationBar } from '../components/NavigationBar';
import { AuthProvider } from '@/components/auth/AuthContext';
import { cookies } from 'next/headers';

import { clearStore } from '../utils';

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
  const cookieStore = cookies();

  const sessionId = cookieStore.get('serverSessionId');

  if (sessionId) clearStore(sessionId?.value);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div style={{ height: '100vh' }}>
            <div style={{ height: '15vh' }}>
              <NavigationBar />
            </div>
            <div style={{ marginTop: '-100px' }}>{children}</div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
