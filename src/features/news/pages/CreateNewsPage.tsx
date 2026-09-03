import { useNavigate } from 'react-router-dom';

import { Card } from '@/components/ui/card';
import { useCreateNews } from '../hook/useCreateNews';
import { NewsForm, type NewsFormValues } from '../components/NewsForm';

export const CreateNewsPage = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateNews();

  const handleSubmit = (values: NewsFormValues) => {
    mutate(
      {
        ...values,
        thumbnail: values.thumbnail || undefined,
        summary: values.summary || undefined,
      },
      {
        onSuccess: () => navigate('/news/admin'),
      },
    );
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-600">Quản trị</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Tạo tin tức mới</h1>
      </div>

      <Card className="border border-slate-200 bg-white p-6 shadow-sm">
        <NewsForm
          isSubmitting={isPending}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/news/admin')}
          submitLabel="Đăng bài"
        />
      </Card>
    </div>
  );
};
