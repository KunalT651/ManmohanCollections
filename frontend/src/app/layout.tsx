import './globals.css';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import Providers from './providers';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const queryClient = new QueryClient();

export const metadata = {
  title: 'Manmohan Collections',
  description: 'Shop Indian art, handicrafts, puja items, silver jewelry, and more. Modern, interactive, and mobile-friendly e-commerce.',
  openGraph: {
    title: 'Manmohan Collections',
    description: 'Shop Indian art, handicrafts, puja items, silver jewelry, and more. Modern, interactive, and mobile-friendly e-commerce.',
    url: 'https://manmohancollections.com',
    siteName: 'Manmohan Collections',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Navbar />
        <Providers>
          {children}
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
