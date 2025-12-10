export interface CategoriesItem {
  id: number;
  name: string;
  parent_id: number | null;
  queue: number | null;
  active: number;
  children: CategoriesItem[];
}