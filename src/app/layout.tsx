import type { Metadata } from 'next';
import clsx from 'clsx';
import './globals.css';
import { neueMontreal } from '@/config/font';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Popcorn Time',
  description:
    "It's popcorn time! Discover movies that are now playing in theaters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(neueMontreal.className, 'antialiased')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
