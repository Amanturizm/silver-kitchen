import { AppLayout } from '@/widgets/layout';
import AboutPage from '@/(pages)/about';
import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://silver.kg';

export const metadata: Metadata = {
  title: 'О компании | Silver Kitchen KG',
  description:
    'Silver Kitchen KG — надежный поставщик профессионального кухонного оборудования для ресторанов, кафе, пекарен и предприятий общественного питания в Кыргызстане. Наша команда профессионалов помогает бизнесу подобрать оптимальные решения, обеспечивает доставку, установку и сервисное обслуживание.',
  openGraph: {
    title: 'О компании | Silver Kitchen KG',
    description:
      'Надежный поставщик профессионального кухонного оборудования в Кыргызстане',
    type: 'website',
    url: `${BASE_URL}/about`,
    siteName: 'Silver Kitchen KG',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary',
    title: 'О компании | Silver Kitchen KG',
    description:
      'Надежный поставщик профессионального кухонного оборудования в Кыргызстане',
  },
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
};

const Page = () => {
  return (
    <AppLayout>
      <AboutPage />
    </AppLayout>
  );
};

export default Page;
