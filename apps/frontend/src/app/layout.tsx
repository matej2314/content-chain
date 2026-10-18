import type { Metadata } from 'next';
import { Geist_Mono, Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import type { PropsWithChildren } from 'react';
import { SessionProvider } from '@/modules/auth/components/session-provider';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
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
    <html
      lang="pl"
      className={`${spaceGrotesk.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
