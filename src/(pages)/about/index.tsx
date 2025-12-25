'use client';

import React from 'react';
import Image from 'next/image';
import aboutBgImg from '@/shared/assets/images/about-bg.png';

const AboutPage = () => {
  return (
    <div className={`py-12 max-[400px]:h-80`}>
      <h1 className="uppercase max-[1400px]:text-xl text-2xl font-medium px-8">О магазине</h1>

      <div className="relative">
        <Image
          src={aboutBgImg.src}
          alt="about-bg-img"
          width={700}
          height={400}
          className="mx-auto"
        />
        <p className="absolute max-[400px]:top-30 max-[1400px]:-translate-y-1/2 top-1/2 text-center max-[600px]:leading-4 max-[768px]:leading-5 max-[768px]:text-sm max-[1400px]:text-xl text-2xl max-[768px]:px-6 px-24">
          Silver Kitchen KG — поставщик профессионального кухонного оборудования для ресторанов,
          кафе, пекарен и предприятий общественного питания в Кыргызстане. Мы предлагаем широкий
          ассортимент техники: плиты, печи, холодильное и тепловое оборудование, вытяжки, мебель из
          нержавеющей стали. Наша команда помогает подобрать оптимальные решения под задачи бизнеса,
          обеспечивает доставку, установку и сервисное обслуживание.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
