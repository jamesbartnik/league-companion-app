import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import MainLayout from '@/app/_components/main-layout';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'League of Legends Stats App',
  description: 'Stats for League of Legends',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
