import React, { Suspense } from 'react';
import { AppLayout } from '@/widgets/layout';
import ProductsPage from '@/(pages)/products';

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
