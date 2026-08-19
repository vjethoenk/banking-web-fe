import { ROUTES } from "@/constants/routes";
import { useNavigate } from "react-router-dom";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[500px] w-full flex items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6">
        <div className="text-6xl font-extrabold text-blue-600">404</div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Không tìm thấy trang</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Đường dẫn bạn truy cập không tồn tại hoặc đã bị di chuyển.
        </p>
        <button
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className="py-2.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition-colors"
        >
          Về Trang chủ
        </button>
      </div>
    </div>
  );
};