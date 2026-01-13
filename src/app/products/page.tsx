import { Suspense } from 'react';
import { AppLayout } from '@/widgets/layout';
import ProductsPage from '@/(pages)/products';
import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://silver.kg';

export const metadata: Metadata = {
  title: 'Каталог оборудования | Silver Kitchen KG',
  description:
    'Широкий ассортимент профессионального кухонного оборудования для ресторанов, кафе и пекарен в Кыргызстане. Плиты, печи, холодильное и тепловое оборудование, вытяжки, мебель из нержавеющей стали от ведущих производителей.',
  openGraph: {
    title: 'Каталог оборудования | Silver Kitchen KG',
    description:
      'Профессиональное кухонное оборудование для ресторанов, кафе и пекарен в Кыргызстане',
    type: 'website',
    url: `${BASE_URL}/products`,
    siteName: 'Silver Kitchen KG',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Каталог оборудования | Silver Kitchen KG',
    description:
      'Профессиональное кухонное оборудование для ресторанов, кафе и пекарен в Кыргызстане',
  },
  alternates: {
    canonical: `${BASE_URL}/products`,
  },
};

const Page = () => {
  return (
    <AppLayout>
      <Suspense>
        <ProductsPage />
      </Suspense>
    </AppLayout>
  );
};

export default Page;
