export interface News {
  id: string;
  title: string;
  thumbnail?: string;
  summary?: string;
  content: string;
  category: string;
  published: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateNewsRequest {
  title: string;
  thumbnail?: string;
  summary?: string;
  content: string;
  category: string;
  published: boolean;
}

export interface UpdateNewsRequest extends CreateNewsRequest {}

export interface NewsListResponse {
  data?: News[];
  items?: News[];
  content?: News[];
  totalElements?: number;
  totalPages?: number;
  currentPage?: number;
  pageSize?: number;
  page?: number;
  size?: number;
}

export interface NewsQueryParams {
  search?: string;
  category?: string;
  published?: boolean | null;
  page?: number;
  size?: number;
}

export interface NewsFormValues {
  title: string;
  thumbnail: string;
  summary: string;
  content: string;
  category: string;
  published: boolean;
}
