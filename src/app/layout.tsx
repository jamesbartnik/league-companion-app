import type { Metadata } from 'next';

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
        <main className='mx-auto max-w-6xl p-4'>{children}</main>
      </body>
    </html>
  );
}
