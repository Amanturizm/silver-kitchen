import React from 'react';
import { AppLayoutAdmin } from '@/widgets/layout-admin';
import Categories from '@/(pages)/admin/categories';

const Page = () => {
  return (
    <AppLayoutAdmin>
      <Categories/>
    </AppLayoutAdmin>
  );
};

export default Page;