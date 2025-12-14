import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import DropdownCategory from '@/widgets/layout/ui/categories/ui/DropdownCategory';
import { useGetCategoriesQuery } from '@/features/categories/categoriesApiSlice';
import { BASE_URL } from '@/shared/constants';
import { categoriesMock } from '@/widgets/layout/ui/categories/constants';

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
      {(categories ?? categoriesMock)?.map((category, i) => {
        const isOpen = openCategoryId === category.id && category.children?.length > 0;

        return (
          <div
            key={category.id + 'category'}
            style={{ backgroundImage: categories?.length ? `url(${BASE_URL}/uploads/${category.image})` : `url(${category.image})` }}
            className={`relative min-w-[220px] xl:w-[500px] bg-no-repeat bg-cover bg-top-left rounded-[${isOpen ? '0' : '20px'}] h-48 px-6 py-6 pt-8 text-white overflow-${isOpen ? 'visible' : 'hidden'} cursor-pointer`}
            onClick={() => router.push(`/products?categoryId=${category.id}`, { scroll: false })}
          >
            <div className={`absolute inset-0 rounded-[${isOpen ? '0' : '20px'}] bg-[#838B99]/85`}/>
            <div className="relative flex flex-col justify-between h-full">
              <h1 className="text-2xl">{category.name}</h1>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCategoryClick(category);
                }}
                className="rounded-[12px] w-full border border-white py-1.5 text-md mt-4 cursor-pointer"
              >
                Подробнее
              </button>

              {openCategoryId === category.id && category.children?.length > 0 && (
                <div
                  className="absolute top-full left-0 mt-2 py-4 bg-[#215573] rounded-[12px] shadow-lg z-50 w-full animate-fade-down animate-duration-200"
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