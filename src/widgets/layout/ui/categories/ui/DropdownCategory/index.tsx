import { CategoriesItem } from '@/features/categories/types';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import chevronIcon from '@/shared/assets/icons/chevron.svg';
import { scrollToMain } from '@/shared/constants';

interface DropdownCategoryProps {
  category: CategoriesItem;
  onClickCategory?: () => void;
  isLastItem?: boolean;
}

const DropdownCategory: React.FC<DropdownCategoryProps> = ({
  category,
  onClickCategory,
  isLastItem,
}) => {
  const router = useRouter();
  const [openCategoryId, setOpenCategoryId] = useState<number | null>(null);

  const handleCategoryClick = (cat: CategoriesItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onClickCategory?.();
    setOpenCategoryId(null);
    router.push(`/products?categoryId=${cat.id}`, { scroll: false });
    scrollToMain();
  };

  const isOpenChildren =
    openCategoryId === category.id && category.children && category.children.length > 0;

  return (
    <div
      className="relative"
      onClick={(e) => e.stopPropagation()}
      onMouseOver={() => category.children?.length && setOpenCategoryId(category.id)}
      onMouseLeave={() => category.children?.length && setOpenCategoryId(null)}
    >
      <div
        onClick={(e) => handleCategoryClick(category, e)}
        className={`
        hover:bg-[#347EA8]
        px-4 py-2 cursor-pointer rounded-[4px]
        ${isLastItem ? 'mb-0' : 'mb-0.5'}
        ${isOpenChildren ? 'bg-[#347EA8]' : 'bg-[#2e5f7b]'}
        flex justify-between items-center
        `}
      >
        {category.name}

        {category.children && category.children.length > 0 && (
          <Image
            src={chevronIcon}
            alt="chevron-icon"
            width={24}
            height={24}
            className={`
            transition-transform duration-100 ease-in-out
            ${isOpenChildren ? 'rotate-90' : 'rotate-0'}
             pointer-events-none
            `}
          />
        )}
      </div>

      {isOpenChildren && (
        <div className="absolute top-0 left-full mt-0 pl-2 w-full">
          <div className="bg-[#215573] rounded-[12px] shadow-lg z-20 animate-fade-down animate-duration-200">
            {category.children.map((child, i) => (
              <DropdownCategory
                key={child.id}
                category={child}
                isLastItem={category.children.length - 1 === i}
                onClickCategory={onClickCategory}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownCategory;
