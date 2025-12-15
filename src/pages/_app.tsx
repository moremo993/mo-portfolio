import type { AppProps } from 'next/app';
import { Space_Grotesk, Inter } from 'next/font/google';
import '../styles/globals.css';

// Display font: Condensed grotesk for headlines and impact
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

// Body font: Editorial companion for readable text
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}