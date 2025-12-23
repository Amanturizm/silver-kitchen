'use client';

import React, { useMemo, useState } from 'react';
import { CategoriesItem } from '@/features/categories/types';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import chevronIcon from '@/shared/assets/icons/chevron.svg';
import { containsActive } from '@/widgets/ui/CategoryMenu/constants';

interface Props {
  child: CategoriesItem;
  activeCategoryId: number;
  level?: number;
}

const paddingClasses = ['pl-4', 'pl-8', 'pl-12', 'pl-16', 'pl-20', 'pl-24', 'pl-28'];

const ChildMenu: React.FC<Props> = ({ child, activeCategoryId, level = 1 }) => {
  const router = useRouter();

  const [isManuallyOpen, setIsManuallyOpen] = useState<boolean | null>(null);

  const isActive = activeCategoryId === child.id;
  const hasChildren = child.children && child.children.length > 0;

  const autoOpenChild = useMemo(() => {
    if (!activeCategoryId || !hasChildren) return false;
    return containsActive(child, activeCategoryId);
  }, [child, activeCategoryId, hasChildren]);

  const isOpen = isManuallyOpen ?? autoOpenChild;

  const handleClick = () => {
    const params = new URLSearchParams(window.location.search);

    params.set('categoryId', String(child.id));
    params.delete('page');

    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  const openDropdown = () => {
    setIsManuallyOpen((prev) => !prev);
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className={`
          flex justify-between items-center
          ${paddingClasses[level - 1] || 'pl-4'} pr-4 py-2 cursor-pointer
           rounded-[4px] mb-0.5
          ${isActive ? 'bg-[#347EA8]' : 'bg-[#2e5f7b]'}
          hover:bg-[#347EA8]
          ${hasChildren ? 'font-medium' : ''}
        `}
      >
        <span>{child.name}</span>

        {hasChildren && (
          <Image
            src={chevronIcon}
            alt=""
            width={20}
            height={20}
            className={`transition-transform ${isOpen ? 'rotate-90' : ''}`}
            onClick={openDropdown}
          />
        )}
      </div>

      {hasChildren && isOpen && (
        <div>
          {child.children.map((c) => (
            <ChildMenu key={c.id} child={c} activeCategoryId={activeCategoryId} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChildMenu;
