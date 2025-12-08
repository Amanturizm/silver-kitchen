'use client';

import Header from '@/widgets/layout/ui/header';
import Footer from '@/widgets/layout/ui/footer';
import Equipments from '@/widgets/layout/ui/equipments';


type Props = {
  children?: React.ReactNode
}

export const AppLayout = ({ children }: Props) => {
  return (
    <div className="container">
      <Header/>
      <Equipments/>
      <main>
        {children}
      </main>
      <Footer/>
    </div>
  );
};
