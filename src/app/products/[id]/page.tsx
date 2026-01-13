import { Suspense } from 'react';
import { AppLayout } from '@/widgets/layout';
import ProductDetail from '@/(pages)/productDetail';
import { Metadata } from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://10.111.70.155:8800';
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://silver-kitchen.kg';

interface Item {
  id: number;
  name: string | null;
  price: number | null;
  short_desc?: string | null;
  desc?: string | null;
  category_name: string | null;
  brand_name: string | null;
  images: Array<{ id: number | null; path: string | null }>;
}

async function getProduct(id: string): Promise<Item | null> {
  try {
    const response = await fetch(`${API_URL}/api/items/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = await getProduct(params.id);

  if (!product) {
    return {
      title: 'Товар не найден | Silver Kitchen KG',
      description: 'Запрашиваемый товар не найден в каталоге Silver Kitchen KG',
    };
  }

  const title = `${product.name} ${product.brand_name ? `- ${product.brand_name}` : ''} | Silver Kitchen KG`;
  const description =
    product.short_desc ||
    product.desc?.replace(/<[^>]*>/g, '').substring(0, 160) ||
    `Купить ${product.name} ${product.brand_name ? `от ${product.brand_name}` : ''} в Silver Kitchen KG. Профессиональное кухонное оборудование для ресторанов и кафе в Кыргызстане.`;

  const imageUrl = product.images?.[0]?.path
    ? `${API_URL}${product.images[0].path}`
    : `${BASE_URL}/og-image.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/products/${product.id}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.name || 'Silver Kitchen KG',
        },
      ],
      siteName: 'Silver Kitchen KG',
      locale: 'ru_RU',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${BASE_URL}/products/${product.id}`,
    },
  };
}

const Page = () => {
  return (
    <AppLayout>
      <Suspense>
        <ProductDetail />
      </Suspense>
    </AppLayout>
  );
};

export default Page;
