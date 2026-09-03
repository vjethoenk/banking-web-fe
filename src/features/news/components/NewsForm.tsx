import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export interface NewsFormValues {
  title: string;
  thumbnail: string;
  summary: string;
  content: string;
  category: string;
  published: boolean;
}

interface NewsFormProps {
  defaultValues?: Partial<NewsFormValues>;
  submitLabel?: string;
  isSubmitting?: boolean;
  onSubmit: (values: NewsFormValues) => void;
  onCancel: () => void;
}

const categoryOptions = [
  'Tin tức',
  'Hướng dẫn',
  'Bảo mật',
  'Tính năng',
  'Tài chính',
  'Thông báo',
  'Kiến thức',
];

const validateField = (name: keyof NewsFormValues, value: string | boolean) => {
  switch (name) {
    case 'title':
      if (!String(value).trim()) return 'Tiêu đề không được để trống';
      if (String(value).trim().length > 255) return 'Tiêu đề tối đa 255 ký tự';
      return '';
    case 'content':
      if (!String(value).trim()) return 'Nội dung không được để trống';
      return '';
    case 'category':
      if (!String(value).trim()) return 'Danh mục không được để trống';
      return '';
    default:
      return '';
  }
};

export const NewsForm = ({
  defaultValues,
  submitLabel = 'Lưu',
  isSubmitting = false,
  onSubmit,
  onCancel,
}: NewsFormProps) => {
  const initialValues: NewsFormValues = {
    title: defaultValues?.title ?? '',
    thumbnail: defaultValues?.thumbnail ?? '',
    summary: defaultValues?.summary ?? '',
    content: defaultValues?.content ?? '',
    category: defaultValues?.category ?? '',
    published: defaultValues?.published ?? false,
  };

  const [values, setValues] = useState<NewsFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof NewsFormValues, string>>>({});

  useEffect(() => {
    setValues(initialValues);
    setErrors({});
  }, [defaultValues]);

  const handleChange = (field: keyof NewsFormValues, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    const nextError = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: nextError || undefined }));
  };

  const submit = (nextValues: NewsFormValues = values) => {
    const nextErrors: Partial<Record<keyof NewsFormValues, string>> = {};

    (Object.keys(nextValues) as Array<keyof NewsFormValues>).forEach((key) => {
      const error = validateField(key, nextValues[key]);
      if (error) nextErrors[key] = error;
    });

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;
    onSubmit(nextValues);
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">Tiêu đề *</label>
          <Input
            value={values.title}
            onChange={(event) => handleChange('title', event.target.value)}
            placeholder="Nhập tiêu đề..."
            aria-invalid={!!errors.title}
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">Thumbnail URL</label>
          <Input
            value={values.thumbnail}
            onChange={(event) => handleChange('thumbnail', event.target.value)}
            placeholder="https://..."
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">Danh mục *</label>
          <Select
            value={values.category || undefined}
            onValueChange={(value) => handleChange('category', value ?? '')}
          >
            <SelectTrigger className="h-11 w-full">
              <SelectValue placeholder="Chọn danh mục" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">Mô tả ngắn</label>
          <Textarea
            value={values.summary}
            onChange={(event) => handleChange('summary', event.target.value)}
            placeholder="Mô tả ngắn về bài viết..."
            rows={3}
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">Nội dung *</label>
          <Textarea
            value={values.content}
            onChange={(event) => handleChange('content', event.target.value)}
            placeholder="Nhập nội dung bài viết..."
            rows={8}
            aria-invalid={!!errors.content}
          />
          {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">Trạng thái</label>
          <Select
            value={values.published ? 'published' : 'draft'}
            onValueChange={(value) => handleChange('published', value === 'published')}
          >
            <SelectTrigger className="h-11 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Hủy
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => submit({ ...values, published: false })}
          disabled={isSubmitting}
        >
          Lưu nháp
        </Button>
        <Button type="button" onClick={() => submit(values)} disabled={isSubmitting}>
          {isSubmitting ? 'Đang lưu...' : submitLabel}
        </Button>
      </div>
    </div>
  );
};
