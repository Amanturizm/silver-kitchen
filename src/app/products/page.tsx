import React from 'react';
import ProductsPage from '../../(pages)/products';
import { AppLayout } from '../../(pages)/layout';

const Page = () => {
  return (
    <AppLayout>
      <ProductsPage/>
    </AppLayout>
  );
};

export default Page;