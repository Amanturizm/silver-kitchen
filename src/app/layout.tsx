import type { Metadata } from 'next';
import './globals.css';
import StoreProvider from '@/app/StoreProvider';
import { BrowserRouter } from 'react-router-dom';
import { Raleway } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Silver Kitchen KG',
  description: 'Silver Kitchen KG — поставщик профессионального кухонного оборудования для ресторанов, кафе, пекарен и предприятий общественного питания в Кыргызстане. Мы предлагаем широкий ассортимент техники: плиты, печи, холодильное и тепловое оборудование, вытяжки, мебель из нержавеющей стали. Наша команда помогает подобрать оптимальные решения под задачи бизнеса, обеспечивает доставку, установку и сервисное обслуживание.',
};

const raleway = Raleway({
  subsets: ['latin', 'cyrillic'],
});

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={raleway.className}>
    <body>
    <BrowserRouter>
      <StoreProvider>
        {children}
      </StoreProvider>
    </BrowserRouter>
    </body>
    </html>
  );
}
