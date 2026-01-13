import { AppLayout } from '@/widgets/layout';
import ContactsPage from '@/(pages)/contacts';
import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://silver.kg';

export const metadata: Metadata = {
  title: 'Контакты | Silver Kitchen KG',
  description:
    'Свяжитесь с Silver Kitchen KG. Мы поможем подобрать профессиональное кухонное оборудование для вашего бизнеса в Кыргызстане. Консультация, доставка, установка и сервисное обслуживание оборудования для ресторанов, кафе и пекарен.',
  openGraph: {
    title: 'Контакты | Silver Kitchen KG',
    description:
      'Свяжитесь с нами для подбора профессионального кухонного оборудования в Кыргызстане',
    type: 'website',
    url: `${BASE_URL}/contacts`,
    siteName: 'Silver Kitchen KG',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary',
    title: 'Контакты | Silver Kitchen KG',
    description:
      'Свяжитесь с нами для подбора профессионального кухонного оборудования в Кыргызстане',
  },
  alternates: {
    canonical: `${BASE_URL}/contacts`,
  },
};

const Page = () => {
  return (
    <AppLayout>
      <ContactsPage />
    </AppLayout>
  );
};

export default Page;
