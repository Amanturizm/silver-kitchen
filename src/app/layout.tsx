import type { Metadata } from 'next';
import './globals.css';
import StoreProvider from '@/app/StoreProvider';
import { Raleway } from 'next/font/google';
import { OrganizationSchema } from '@/shared/components/schemas/OrganizationSchema';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://silver.kg';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Silver Kitchen KG - Профессиональное кухонное оборудование',
    template: '%s | Silver Kitchen KG',
  },
  description:
    'Silver Kitchen KG — поставщик профессионального кухонного оборудования для ресторанов, кафе, пекарен и предприятий общественного питания в Кыргызстане. Мы предлагаем широкий ассортимент техники: плиты, печи, холодильное и тепловое оборудование, вытяжки, мебель из нержавеющей стали. Наша команда помогает подобрать оптимальные решения под задачи бизнеса, обеспечивает доставку, установку и сервисное обслуживание.',
  keywords: [
    'кухонное оборудование',
    'профессиональное оборудование',
    'оборудование для ресторанов',
    'оборудование для кафе',
    'плиты',
    'печи',
    'холодильное оборудование',
    'тепловое оборудование',
    'вытяжки',
    'мебель из нержавеющей стали',
    'Silver Kitchen',
    'Кыргызстан',
    'Бишкек',
  ],
  authors: [{ name: 'Silver Kitchen KG' }],
  creator: 'Silver Kitchen KG',
  publisher: 'Silver Kitchen KG',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: BASE_URL,
    siteName: 'Silver Kitchen KG',
    title: 'Silver Kitchen KG - Профессиональное кухонное оборудование',
    description:
      'Поставщик профессионального кухонного оборудования для ресторанов, кафе и пекарен в Кыргызстане',
    images: [
      {
        url: `${BASE_URL}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: 'Silver Kitchen KG',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Silver Kitchen KG - Профессиональное кухонное оборудование',
    description:
      'Поставщик профессионального кухонного оборудования для ресторанов, кафе и пекарен в Кыргызстане',
    images: [`${BASE_URL}/og-image.svg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification_token',
    yandex: 'verification_token',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.svg',
  },
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
    <html lang="ru" className={raleway.className}>
      <head>
        <OrganizationSchema />
      </head>
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
