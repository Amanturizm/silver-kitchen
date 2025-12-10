import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import DropdownCategory from '@/widgets/layout/ui/categories/ui/DropdownCategory';
import { useGetCategoriesQuery } from '@/features/categories/categoriesApiSlice';
import bg1 from '@/shared/assets/images/equipment-bg-01.png';
import bg2 from '@/shared/assets/images/equipment-bg-02.png';
import bg3 from '@/shared/assets/images/equipment-bg-03.png';
import bg4 from '@/shared/assets/images/equipment-bg-04.png';

const categoriesMock = [
  {
    id: 1,
    name: 'Тепловое оборудование',
    parent_id: null,
    queue: 0,
    active: 1,
    children: [
      { id: 5, name: 'Пароконвектоматы / конвекционные печи', parent_id: 1, queue: 0, active: 1, children: [] },
      {
        id: 6,
        name: 'Плиты',
        parent_id: 1,
        queue: 1,
        active: 1,
        children: [
          { id: 11, name: 'Газовые плиты', parent_id: 6, queue: 0, active: 1, children: [] },
          { id: 12, name: 'Электрические плиты', parent_id: 6, queue: 1, active: 1, children: [] },
          { id: 13, name: 'Индукционные плиты', parent_id: 6, queue: 2, active: 1, children: [] }
        ]
      },
      { id: 7, name: 'Гриль и жарочные поверхности', parent_id: 1, queue: 2, active: 1, children: [] },
      { id: 8, name: 'Фритюрницы', parent_id: 1, queue: 3, active: 1, children: [] },
      { id: 9, name: 'Пицца-печи', parent_id: 1, queue: 4, active: 1, children: [] },
      { id: 10, name: 'Саламандеры (жарочные аппараты)', parent_id: 1, queue: 5, active: 1, children: [] }
    ]
  },
  {
    id: 2,
    name: 'Охлаждение и хранение',
    parent_id: null,
    queue: 1,
    active: 1,
    children: [
      { id: 14, name: 'Холодильные шкафы', parent_id: 2, queue: 0, active: 1, children: [] },
      { id: 15, name: 'Морозильные шкафы / лари', parent_id: 2, queue: 1, active: 1, children: [] },
      { id: 16, name: 'Холодильные столы (рабочие)', parent_id: 2, queue: 2, active: 1, children: [] },
      { id: 17, name: 'Холодильные витрины', parent_id: 2, queue: 3, active: 1, children: [] },
      { id: 18, name: 'Льдогенераторы', parent_id: 2, queue: 4, active: 1, children: [] }
    ]
  },
  {
    id: 3,
    name: 'Нейтральное и барное оборудование',
    parent_id: null,
    queue: 2,
    active: 1,
    children: [
      {
        id: 22,
        name: 'Барное оборудование (кофемашины, диспенсеры, соковыжималки)',
        parent_id: 3,
        queue: 0,
        active: 1,
        children: []
      },
      { id: 20, name: 'Стеллажи, полки, тележки', parent_id: 3, queue: 1, active: 1, children: [] },
      { id: 19, name: 'Рабочие столы из нержавейки', parent_id: 3, queue: 2, active: 1, children: [] },
      { id: 21, name: 'Мойки / раковины', parent_id: 3, queue: 3, active: 1, children: [] },
      { id: 23, name: 'Гастроёмкости (GN) и аксессуары', parent_id: 3, queue: 5, active: 1, children: [] }
    ]
  },
  {
    id: 4,
    name: 'Подготовка продуктов (Электромеханика / Food Prep)',
    parent_id: null,
    queue: 3,
    active: 1,
    children: [
      { id: 24, name: 'Планетарные миксеры / тестомесы', parent_id: 4, queue: 0, active: 1, children: [] },
      { id: 25, name: 'Мясорубки', parent_id: 4, queue: 1, active: 1, children: [] },
      { id: 26, name: 'Профессиональные блендеры', parent_id: 4, queue: 2, active: 1, children: [] },
      { id: 27, name: 'Овощерезки / слайсеры / чопперы', parent_id: 4, queue: 3, active: 1, children: [] },
      { id: 28, name: 'Кухонные комбайны', parent_id: 4, queue: 4, active: 1, children: [] },
      { id: 29, name: 'Барные миксеры и шейкеры', parent_id: 4, queue: 5, active: 1, children: [] }
    ]
  }
];

const bgs = [bg1, bg2, bg3, bg4];

const Categories = () => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();

  const router = useRouter();
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (category: any) => {
    if (category.children && category.children.length > 0) {
      setOpenCategoryId(openCategoryId === category.id ? null : category.id);
    } else {
      setOpenCategoryId(null);
      router.push(`/products?categoryId=${category.id}`, { scroll: false });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenCategoryId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="container mt-8 flex flex-wrap gap-8">
      {categoriesMock?.map((category, i) => {
        const isOpen = openCategoryId === category.id && category.children?.length > 0;

        return (
          <div
            key={category.id + 'category'}
            style={{ backgroundImage: `url(${bgs[i]?.src})` }}
            className={`relative min-w-[220px] xl:w-[500px] bg-no-repeat bg-cover bg-top-left rounded-[${isOpen ? '0' : '20px'}] h-48 px-6 py-6 pt-8 text-white overflow-${isOpen ? 'visible' : 'hidden'}`}
          >
            <div className={`absolute inset-0 rounded-[${isOpen ? '0' : '20px'}] bg-[#838B99]/85`}/>
            <div className="relative z-10 flex flex-col justify-between h-full">
              <h1 className="text-2xl">{category.name}</h1>

              <button
                onClick={() => handleCategoryClick(category)}
                className="rounded-[12px] w-full border border-white py-1.5 text-md mt-4 cursor-pointer"
              >
                Подробнее
              </button>

              {openCategoryId === category.id && category.children?.length > 0 && (
                <div
                  className="absolute top-full left-0 mt-2 py-4 bg-[#215573] rounded-[12px] shadow-lg z-20 w-full animate-fade-down animate-duration-200"
                  ref={containerRef}
                >
                  {category.children.map((child, index) => (
                    <DropdownCategory
                      key={child.id}
                      category={child}
                      isLastItem={category.children.length - 1 === index}
                      onClickCategory={() => setOpenCategoryId(null)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;