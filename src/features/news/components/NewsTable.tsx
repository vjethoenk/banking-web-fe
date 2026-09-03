import { Eye, FilePenLine, Trash2, CheckCircle2, CircleDashed } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { News } from '../types/news.types';
import { NewsStatusBadge } from './NewsStatusBadge';

interface NewsTableProps {
  news: News[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string, published: boolean) => void;
}

const formatDate = (date: string) => {
  const value = new Date(date);
  if (Number.isNaN(value.getTime())) return '—';

  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(value);
};

export const NewsTable = ({ news, onView, onEdit, onDelete, onTogglePublish }: NewsTableProps) => {
  return (
    <Card className="overflow-hidden border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Thumbnail</th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Created At</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {news.map((item) => (
              <tr key={item.id} className="border-t border-slate-200 align-middle text-sm text-slate-700">
                <td className="px-4 py-3">
                  {item.thumbnail ? (
                    <img src={item.thumbnail} alt={item.title} className="h-12 w-20 rounded-lg object-cover" />
                  ) : (
                    <div className="flex h-12 w-20 items-center justify-center rounded-lg bg-slate-100 text-[10px] text-slate-500">
                      No image
                    </div>
                  )}
                </td>
                <td className="max-w-[260px] px-4 py-3">
                  <div className="font-medium text-slate-900">{item.title}</div>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-700">
                    {item.category}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <NewsStatusBadge published={item.published} />
                </td>
                <td className="px-4 py-3">{formatDate(item.createdAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-blue-700" onClick={() => onView(item.id)}>
                      <Eye className="mr-1 size-3.5" /> View
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-slate-700" onClick={() => onEdit(item.id)}>
                      <FilePenLine className="mr-1 size-3.5" /> Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-red-600" onClick={() => onDelete(item.id)}>
                      <Trash2 className="mr-1 size-3.5" /> Delete
                    </Button>
                    <Button
                      variant={item.published ? 'secondary' : 'default'}
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => onTogglePublish(item.id, !item.published)}
                    >
                      {item.published ? <CircleDashed className="mr-1 size-3.5" /> : <CheckCircle2 className="mr-1 size-3.5" />}
                      {item.published ? 'Unpublish' : 'Publish'}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
