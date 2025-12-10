'use client';

import Header from '@/widgets/layout/ui/header';
import Categories from '@/widgets/layout/ui/categories';
import Brands from '@/widgets/layout/ui/brands';
import Advantages from '@/widgets/layout/ui/advantages';
import Footer from '@/widgets/layout/ui/footer';

type Props = {
  children?: React.ReactNode
}

export const AppLayout = ({ children }: Props) => {
  return (
    <>
      <Header/>
      <Categories/>
      <main className="container pb-10">
        {children}
      </main>
      <Brands/>
      <Advantages/>
      <Footer/>
    </>
  );
};
