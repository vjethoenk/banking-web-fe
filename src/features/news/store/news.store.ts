import { create } from 'zustand';

interface NewsState {
  search: string;
  category: string;
  published: boolean | null;
  page: number;
  setSearch: (search: string) => void;
  setCategory: (category: string) => void;
  setPublished: (published: boolean | null) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

const initialState = {
  search: '',
  category: '',
  published: null,
  page: 1,
};

export const useNewsStore = create<NewsState>((set) => ({
  ...initialState,
  setSearch: (search) => set({ search, page: 1 }),
  setCategory: (category) => set({ category, page: 1 }),
  setPublished: (published) => set({ published, page: 1 }),
  setPage: (page) => set({ page }),
  resetFilters: () => set({ ...initialState }),
}));
