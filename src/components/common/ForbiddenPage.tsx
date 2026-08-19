import { ROUTES } from "@/constants/routes";
import { useNavigate } from "react-router-dom";

 export const ForbiddenPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[500px] w-full flex items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-450 animate-bounce">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight">403 Forbidden</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Bạn không có quyền truy cập vào tài nguyên này. Vui lòng kiểm tra lại quyền hạn hoặc đăng nhập bằng tài khoản Admin.
        </p>
        <button
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className="py-2.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition-colors"
        >
          Quay lại Bảng điều khiển
        </button>
      </div>
    </div>
  );
};