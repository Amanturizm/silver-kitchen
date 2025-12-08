import React from 'react';
import { AppLayout } from '@/widgets/layout';
import ProductsPage from '@/(pages)/products';

const Page = () => {
  return (
    <AppLayout>
      <ProductsPage/>
    </AppLayout>
  );
};

export default Page;