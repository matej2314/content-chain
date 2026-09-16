import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import type { PropsWithChildren } from 'react';
import { SessionProvider } from '@/modules/auth/components/session-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Content Chain',
  description: 'Automatyzacja generowania treści na Media Społecznościowe.',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pl" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
