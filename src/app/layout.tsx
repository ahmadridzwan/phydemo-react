'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import { AuthProvider } from '../contexts/AuthContext';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { RouteGuard } from '@/components/RouteGuard';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <RouteGuard>{children}</RouteGuard>
        </AuthProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
