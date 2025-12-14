export interface GlobalSearchResponse {
  itemsCount: number;
  categoriesCount: number;
  brandsCount: number;
  items: Item[];
  categories: Category[];
  brands: Brand[];
}

interface Item {
  id: number;
  name: string;
  price: number;
  category_id: number;
  brand_id: number | null;
}

interface Category {
  id: number;
  name?: string;
  parent_id: number | null;
}

interface Brand {
  id: number;
  name: string;
}