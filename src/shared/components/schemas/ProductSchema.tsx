interface Product {
  id: number | null;
  name: string | null;
  price: number | null;
  short_desc?: string | null;
  desc?: string | null;
  category_name: string | null;
  brand_name: string | null;
  images: Array<{ id: number | null; path: string | null }>;
}

interface ProductSchemaProps {
  product: Product;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://10.111.70.155:8800';
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://silver.kg';

export function ProductSchema({ product }: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description:
      product.short_desc ||
      product.desc?.replace(/<[^>]*>/g, '').substring(0, 200) ||
      product.name,
    brand: product.brand_name
      ? {
          '@type': 'Brand',
          name: product.brand_name,
        }
      : undefined,
    category: product.category_name,
    image: product.images?.map((img) => (img.path ? `${API_URL}${img.path}` : '')).filter(Boolean),
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/products/${product.id}`,
      priceCurrency: 'KGS',
      price: product.price || undefined,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Silver Kitchen KG',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
