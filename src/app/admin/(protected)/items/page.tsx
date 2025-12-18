import React from 'react';
import { AppLayoutAdmin } from '@/widgets/layout-admin';
import Items from '@/(pages)/admin/items';

const Page = () => {
  return (
    <AppLayoutAdmin>
      <Items/>
    </AppLayoutAdmin>
  );
};

export default Page;