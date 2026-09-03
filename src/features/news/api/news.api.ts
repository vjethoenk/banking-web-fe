import { apiClient } from '@/services/api/client';
import type { ApiResponse } from '@/services/api/api.types';
import type {
  CreateNewsRequest,
  News,
  NewsListResponse,
  NewsQueryParams,
  UpdateNewsRequest,
} from '../types/news.types';

interface NewsListResult {
  data: News[];
  totalElements: number;
  totalPages: number;
  page: number;
}

const normalizeNewsList = (payload: unknown): News[] => {
  if (Array.isArray(payload)) {
    return payload as News[];
  }

  if (payload && typeof payload === 'object') {
    const maybe = payload as NewsListResponse;

    if (Array.isArray(maybe.data)) return maybe.data;
    if (Array.isArray(maybe.items)) return maybe.items;
    if (Array.isArray(maybe.content)) return maybe.content;
  }

  return [];
};

const normalizePagination = (payload: unknown, fallbackItems: News[]): NewsListResult => {
  if (payload && typeof payload === 'object') {
    const maybe = payload as NewsListResponse;

    const items = normalizeNewsList(payload);
    const totalElements = maybe.totalElements ?? items.length ?? fallbackItems.length ?? 0;
    const pageSize = maybe.pageSize ?? maybe.size ?? 6;
    const totalPages = maybe.totalPages ?? Math.max(1, Math.ceil(totalElements / pageSize));
    const page = maybe.currentPage !== undefined ? maybe.currentPage + 1 : (maybe.page ?? 1);

    return {
      data: items,
      totalElements,
      totalPages,
      page: Math.max(1, Number(page) || 1),
    };
  }

  return {
    data: fallbackItems,
    totalElements: fallbackItems.length,
    totalPages: 1,
    page: 1,
  };
};

export const getNewsApi = async ({
  search,
  category,
  published,
  page = 1,
  size = 6,
}: NewsQueryParams = {}): Promise<NewsListResult> => {
  const response = await apiClient.get<ApiResponse<News[] | NewsListResponse>>('/news', {
    params: {
      search: search || undefined,
      category: category || undefined,
      published: published === null || published === undefined ? undefined : published,
      page: Math.max(0, page - 1),
      size,
    },
  });

  const result = response.data.result ?? [];
  const fallbackItems = normalizeNewsList(result);

  return normalizePagination(result, fallbackItems);
};

export const getNewsByIdApi = async (id: string): Promise<News> => {
  const response = await apiClient.get<ApiResponse<News>>(`/news/${id}`);
  return response.data.result;
};

export const createNewsApi = async (data: CreateNewsRequest): Promise<News> => {
  const response = await apiClient.post<ApiResponse<News>>('/news', data);
  return response.data.result;
};

export const updateNewsApi = async (id: string, data: UpdateNewsRequest): Promise<News> => {
  const response = await apiClient.put<ApiResponse<News>>(`/news/${id}`, data);
  return response.data.result;
};

export const deleteNewsApi = async (id: string): Promise<void> => {
  await apiClient.delete(`/news/${id}`);
};

export const publishNewsApi = async (id: string, published: boolean): Promise<News> => {
  const response = await apiClient.patch<ApiResponse<News>>(`/news/${id}/publish`, { published });
  return response.data.result;
};
