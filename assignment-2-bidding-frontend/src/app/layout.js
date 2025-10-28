'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '../components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
