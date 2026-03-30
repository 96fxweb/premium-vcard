import { Montserrat, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-cormorant' });

export const metadata = {
  title: 'The Painted Porch | Luxury Event Space',
  description: 'Premium event venue located in Covington, Georgia.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased bg-[#050505]">{children}</body>
    </html>
  );
}