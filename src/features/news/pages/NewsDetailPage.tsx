import { Card } from '@/components/ui/card';
import { useParams } from 'react-router-dom';
import { NewsDetail } from '../components/NewsDetail';
import { useNewsDetail } from '../hook/useNewsDetail';

export const NewsDetailPage = () => {
  const { id } = useParams();
  const { data: news, isPending, isError, error } = useNewsDetail(id);

  if (isPending) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-32 rounded bg-slate-200" />
          <div className="h-12 w-3/4 rounded bg-slate-200" />
          <div className="h-[280px] w-full rounded-2xl bg-slate-200" />
          <div className="h-4 w-full rounded bg-slate-200" />
          <div className="h-4 w-full rounded bg-slate-200" />
          <div className="h-4 w-5/6 rounded bg-slate-200" />
        </div>
      </div>
    );
  }

  if (isError || !news) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Card className="border border-red-200 bg-red-50 p-6 text-red-700">
          <p className="font-medium">Không tìm thấy bài viết.</p>
          <p className="mt-1 text-sm">{error instanceof Error ? error.message : 'Bài viết bạn yêu cầu không tồn tại.'}</p>
        </Card>
      </div>
    );
  }

  return <NewsDetail news={news} />;
};
