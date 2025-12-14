export interface Item {
  id: number | null,
  name: string | null,
  price: number | null,
  short_desc?: string | null,
  desc?: string | null,
  category_id: number | null,
  brand_id: number | null,
  created_at?: string | null,
  updated_at?: string | null,
  images: Attachment[]
}

export interface ItemsFilter {
  limit?: number | null;
  page?: number | null;
  categoryId?: number | null;
  brandId?: number | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  sortDirection?: string | null;

  [key: string]: number | string | undefined | null;
}

export interface SearchResponse<T> {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  data: T[];
}

export interface Attachment {
  id: number | null;
  name: string | null;
  path: string | null;
}