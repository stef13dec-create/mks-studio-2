import type {Metadata} from 'next';
import { Inter, Space_Grotesk, Playfair_Display } from 'next/font/google';
import './globals.css'; // Global styles
import { ErrorBoundary } from '@/components/ErrorBoundary';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

import { TransitionProvider } from '@/components/TransitionProvider';

export const metadata: Metadata = {
  title: 'MKS Studio | Commercial Interiors',
  description: 'Ultra-modern, highly visual, high-end minimalist commercial interiors portfolio.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-[#141414] text-[#E4E3E0] cursor-none selection:bg-[#E4E3E0] selection:text-[#141414]" suppressHydrationWarning>
        <ErrorBoundary>
          <TransitionProvider>
            {children}
          </TransitionProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
