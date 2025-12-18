import React from 'react';
import { AppLayoutAdmin } from '@/widgets/layout-admin';
import Brands from '@/(pages)/admin/brands';

const Page = () => {
  return (
    <AppLayoutAdmin>
      <Brands/>
    </AppLayoutAdmin>
  );
};

export default Page;