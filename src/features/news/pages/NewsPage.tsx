import { useNewsStore } from '../store/news.store';
import { useNews } from '../hook/useNews';
import { NewsFilter } from '../components/NewsFilter';
import { NewsList } from '../components/NewsList';
import { NewsPagination } from '../components/NewsPagination';
import { Card } from '@/components/ui/card';

const skeletonCards = Array.from({ length: 6 }, (_, index) => index);

export const NewsPage = () => {
  const { search, category, published, page, setSearch, setCategory, setPublished, setPage, resetFilters } = useNewsStore();

  const { data, isPending, isError, error } = useNews({
    search,
    category,
    published,
    page,
    size: 6,
  });
  console.log("Data page news:", data)
  const items = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-6">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-blue-600">VinaBanking</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Tin tức</h1>
      </header>

      <div className="mb-6">
        <NewsFilter
          search={search}
          category={category}
          published={published}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onPublishedChange={setPublished}
          onReset={resetFilters}
        />
      </div>

      {isPending ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skeletonCards.map((item) => (
            <Card key={item} className="overflow-hidden border border-slate-200 bg-white">
              <div className="h-48 animate-pulse bg-slate-200" />
              <div className="space-y-3 p-4">
                <div className="h-5 w-20 animate-pulse rounded bg-slate-200" />
                <div className="h-6 w-4/5 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
              </div>
            </Card>
          ))}
        </div>
      ) : isError ? (
        <Card className="border border-red-200 bg-red-50 p-6 text-red-700">
          <p className="font-medium">Không thể tải danh sách tin tức.</p>
          <p className="mt-1 text-sm">{error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải dữ liệu.'}</p>
        </Card>
      ) : items.length === 0 ? (
        <Card className="border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
          <h3 className="text-lg font-semibold text-slate-900">Chưa có tin tức nào</h3>
          <p className="mt-2 text-sm text-slate-600">Hãy thử thay đổi bộ lọc hoặc quay lại sau.</p>
        </Card>
      ) : (
        <>
          <NewsList news={items} />
          <NewsPagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
};
