import React from 'react';
import { AppLayout } from '@/widgets/layout';
import ContactsPage from '@/(pages)/contacts';

const Page = () => {
  return (
    <AppLayout>
      <ContactsPage />
    </AppLayout>
  );
};

export default Page;
