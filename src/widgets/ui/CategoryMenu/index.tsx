'use client';

import React, { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import chevronIcon from '@/shared/assets/icons/chevron.svg';
import { CategoriesItem } from '@/features/categories/types';
import ChildMenu from '@/widgets/ui/CategoryMenu/ui/ChildMenu';
import { useGetCategoriesQuery } from '@/features/categories/categoriesApiSlice';
import { containsActive } from '@/widgets/ui/CategoryMenu/constants';

const CategoryMenu = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategoryId = searchParams.get('categoryId')
    ? Number(searchParams.get('categoryId'))
    : null;

  const { data: categories } = useGetCategoriesQuery({ active: '1' });

  const autoOpenCategoryId = useMemo(() => {
    if (!categories || !activeCategoryId) return null;

    const category = categories.find(
      (cat) => cat.children && containsActive(cat, activeCategoryId),
    );

    return category?.id ?? null;
  }, [categories, activeCategoryId]);

  const [openCategoryId, setOpenCategoryId] = useState<number | null>(null);

  const resolvedOpenCategoryId = openCategoryId ?? autoOpenCategoryId;

  const handleClick = (category: CategoriesItem) => {
    const params = new URLSearchParams(window.location.search);

    params.set('categoryId', String(category.id));
    params.delete('page');

    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  const openDropdown = (category: CategoriesItem) => {
    setOpenCategoryId((prev) => (prev === category.id ? null : category.id));
  };

  return (
    <div className="py-5 bg-[#215573] rounded-[12px] shadow-lg text-white">
      {!categories || !categories.length
        ? null
        : categories.map((category) => {
            const isOpen = resolvedOpenCategoryId === category.id;
            const isActive = activeCategoryId === category.id;

            return (
              <div key={category.id}>
                <div
                  onClick={() => handleClick(category)}
                  className={`
                px-4 py-2 cursor-pointer
                flex justify-between items-center rounded-[4px] mb-0.5
                ${isActive ? 'bg-[#347EA8]' : 'bg-[#2e5f7b]'}
                hover:bg-[#347EA8]
              `}
                >
                  <span>{category.name}</span>

                  {category.children?.length > 0 && (
                    <Image
                      src={chevronIcon}
                      alt=""
                      width={20}
                      height={20}
                      className={`
                    transition-transform
                    ${isOpen ? 'rotate-90' : ''}
                  `}
                      onClick={(e) => {
                        e.stopPropagation();
                        openDropdown(category);
                      }}
                    />
                  )}
                </div>

                {isOpen && activeCategoryId && (
                  <div>
                    {category.children.map((child) => (
                      <ChildMenu
                        key={child.id}
                        child={child}
                        activeCategoryId={activeCategoryId}
                        level={2}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
    </div>
  );
};

export default CategoryMenu;
