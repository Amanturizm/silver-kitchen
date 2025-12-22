export interface CategoriesItem {
  id: number;
  name: string;
  parent_id: number | null;
  queue: number | null;
  active: number;
  image?: string;
  children: CategoriesItem[];
}

export interface CategoryRequest {
  id?: string;
  name: string;
  parentId?: string;
  queue?: string;
  image?: File;
}
