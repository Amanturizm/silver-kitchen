const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://silver.kg';

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Silver Kitchen KG',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.svg`,
    description:
      'Поставщик профессионального кухонного оборудования для ресторанов, кафе, пекарен и предприятий общественного питания в Кыргызстане',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KG',
      addressLocality: 'Бишкек',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Russian', 'Kyrgyz'],
    },
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
