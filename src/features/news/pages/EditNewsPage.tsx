import { useNavigate, useParams } from 'react-router-dom';

import { Card } from '@/components/ui/card';
import { useNewsDetail } from '../hook/useNewsDetail';
import { useUpdateNews } from '../hook/useUpdateNews';
import { NewsForm, type NewsFormValues } from '../components/NewsForm';

export const EditNewsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: news, isPending, isError, error } = useNewsDetail(id);
  const { mutate, isPending: isUpdating } = useUpdateNews();

  const handleSubmit = (values: NewsFormValues) => {
    if (!id) return;

    mutate(
      {
        id,
        data: {
          ...values,
          thumbnail: values.thumbnail || undefined,
          summary: values.summary || undefined,
        },
      },
      {
        onSuccess: () => navigate('/news/admin'),
      },
    );
  };

  if (isPending) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <Card className="border border-slate-200 bg-white p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-1/3 rounded bg-slate-200" />
            <div className="h-12 w-full rounded bg-slate-200" />
            <div className="h-12 w-full rounded bg-slate-200" />
            <div className="h-28 w-full rounded bg-slate-200" />
          </div>
        </Card>
      </div>
    );
  }

  if (isError || !news) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Card className="border border-red-200 bg-red-50 p-6 text-red-700">
          <p className="font-medium">Không thể tải tin tức để chỉnh sửa.</p>
          <p className="mt-1 text-sm">{error instanceof Error ? error.message : 'Có lỗi xảy ra.'}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-600">Quản trị</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Chỉnh sửa tin tức</h1>
      </div>

      <Card className="border border-slate-200 bg-white p-6 shadow-sm">
        <NewsForm
          defaultValues={{
            title: news.title,
            thumbnail: news.thumbnail ?? '',
            summary: news.summary ?? '',
            content: news.content,
            category: news.category,
            published: news.published,
          }}
          isSubmitting={isUpdating}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/news/admin')}
          submitLabel="Cập nhật"
        />
      </Card>
    </div>
  );
};
