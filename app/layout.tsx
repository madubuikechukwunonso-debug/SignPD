import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { PDFProvider } from './context/PDFContext';  // Adjust path if needed

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sign PD',
  description: 'In-browser PDF editor',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PDFProvider>
          {children}
        </PDFProvider>
      </body>
    </html>
  );
}
