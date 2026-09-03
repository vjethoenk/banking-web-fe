import { Button } from '@/components/ui/button';

interface NewsPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const NewsPagination = ({ page, totalPages, onPageChange }: NewsPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Trước
      </Button>

      <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700">
        Trang {page} / {totalPages}
      </div>

      <Button
        variant="outline"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Sau
      </Button>
    </div>
  );
};
