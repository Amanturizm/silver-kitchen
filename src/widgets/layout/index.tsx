'use client';

import Header from '@/widgets/layout/ui/header';
import Footer from '@/widgets/layout/ui/footer';


type Props = {
  children?: React.ReactNode
}

export const AppLayout = ({ children }: Props) => {
  return (
    <div className="container">
      <Header/>
      <main>
        {children}
      </main>
      <Footer/>
    </div>
  );
};
