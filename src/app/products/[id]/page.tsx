import React, { Suspense } from 'react';
import { AppLayout } from '@/widgets/layout';
import ProductDetail from '@/(pages)/productDetail';

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
