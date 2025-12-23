'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Header from '@/widgets/layout/ui/header';
import Categories from '@/widgets/layout/ui/categories';
import Brands from '@/widgets/layout/ui/brands';
import Advantages from '@/widgets/layout/ui/advantages';
import Footer from '@/widgets/layout/ui/footer';
import { scrollToMain } from '@/shared/constants';

type Props = {
  children?: React.ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  const pathname = usePathname();

  useEffect(() => {
    scrollToMain();
  }, [pathname]);

  return (
    <>
      <Header />
      <Categories />
      <main id="main" className="container pb-10">
        {children}
      </main>
      <Brands />
      <Advantages />
      <Footer />
    </>
  );
};
