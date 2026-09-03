import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDeleteNews } from '../hook/useDeleteNews';
import { useNews } from '../hook/useNews';
import { useUpdateNews } from '../hook/useUpdateNews';
import { NewsTable } from '../components/NewsTable';
import type { News } from '../types/news.types';

export const NewsAdminPage = () => {
  const navigate = useNavigate();
  const { data, isPending, isError, error } = useNews({ page: 1, size: 50 });
  const { mutate: removeNews, isPending: isDeleting } = useDeleteNews();
  const { mutate: updateNews, isPending: isUpdating } = useUpdateNews();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const items = data?.data ?? [];

  const handleView = (id: string) => navigate(`/news/${id}`);
  const handleEdit = (id: string) => navigate(`/news/admin/edit/${id}`);

  const handleDelete = () => {
    if (!deleteId) return;
    removeNews(deleteId, {
      onSuccess: () => setDeleteId(null),
    });
  };

  const handleTogglePublish = (id: string, published: boolean) => {
    const current = items.find((item: News) => item.id === id);
    if (!current) return;

    const nextPayload = {
      title: current.title,
      thumbnail: current.thumbnail,
      summary: current.summary,
      content: current.content,
      category: current.category,
      published,
    };

    updateNews(
      { id, data: nextPayload },
      {
        onSuccess: () => {
          toast.success(published ? 'Bài viết đã được công khai' : 'Bài viết đã được lưu nháp');
        },
      },
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-600">Admin</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Quản lý tin tức</h1>
        </div>

        <Button onClick={() => navigate('/news/admin/create')} className="gap-2">
          <Plus className="size-4" />
          + Thêm tin tức
        </Button>
      </div>

      {isPending ? (
        <Card className="border border-slate-200 bg-white p-6">
          <div className="animate-pulse space-y-3">
            <div className="h-6 w-40 rounded bg-slate-200" />
            <div className="h-12 w-full rounded bg-slate-200" />
            <div className="h-12 w-full rounded bg-slate-200" />
            <div className="h-12 w-full rounded bg-slate-200" />
          </div>
        </Card>
      ) : isError ? (
        <Card className="border border-red-200 bg-red-50 p-6 text-red-700">
          <p className="font-medium">Không thể tải danh sách tin tức.</p>
          <p className="mt-1 text-sm">{error instanceof Error ? error.message : 'Đã xảy ra lỗi'}</p>
        </Card>
      ) : (
        <NewsTable
          news={items}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={(id) => setDeleteId(id)}
          onTogglePublish={handleTogglePublish}
        />
      )}

      <Dialog open={Boolean(deleteId)} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xóa tin tức?</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa tin tức này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)} disabled={isDeleting}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? 'Đang xóa...' : 'Xóa'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isUpdating && (
        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm text-blue-700">
          <RefreshCcw className="size-3.5 animate-spin" />
          Đang cập nhật...
        </div>
      )}
    </div>
  );
};
