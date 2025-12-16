import { CategoriesItem } from '@/features/categories/types';

export const containsActive = (item: CategoriesItem, activeId: number): boolean => {
  if (!item.children) return false;
  return item.children.some(child =>
    child.id === activeId || containsActive(child, activeId)
  );
};