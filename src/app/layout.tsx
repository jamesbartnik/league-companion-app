import type { Metadata } from 'next';

import { JotaiProvider } from '@/components/JotaiProvider';
import NavBar from '@/components/NavBar';

import './globals.css';

export const metadata: Metadata = {
  title: 'League of Legends Companion Application',
  description:
    'League of Legends Companion Application - Created by James Bartnik',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-gray-100'>
        <NavBar />
        <JotaiProvider>
          <main className='mx-auto max-w-6xl p-4'>{children}</main>
        </JotaiProvider>
      </body>
    </html>
  );
}
