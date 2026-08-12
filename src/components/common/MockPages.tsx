import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccounts, getTransactions, transferApi } from '../../features/banking/api/banking.api';
import type { Account, Transaction } from '../../features/banking/api/banking.api';
import { useAuthStore } from '../../features/auth/stores/auth.store';
import { ROUTES } from '../../constants/routes';

// ==========================================
// 1. DASHBOARD PAGE
// ==========================================
export const DashboardPage: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAccounts()
      .then(setAccounts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-500/10">
        <h2 className="text-lg font-medium opacity-80">Xin chào, {user?.username}!</h2>
        <p className="text-3xl font-extrabold mt-2 tracking-tight">
          {loading ? '---' : totalBalance.toLocaleString('vi-VN')} VND
        </p>
        <p className="text-xs opacity-70 mt-1">Tổng tài sản hiện tại trong hệ thống</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 dark:text-white mb-4">Hoạt động nhanh</h3>
          <div className="grid grid-cols-2 gap-4">
            <a href={ROUTES.TRANSFER} className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 font-semibold text-center hover:bg-blue-100 dark:hover:bg-blue-950/40 transition-colors">
              Chuyển tiền
            </a>
            <a href={ROUTES.ACCOUNTS} className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 font-semibold text-center hover:bg-indigo-100 dark:hover:bg-indigo-950/40 transition-colors">
              Xem tài khoản
            </a>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center items-center text-center">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Quyền hạn</h3>
          <p className="text-lg font-extrabold text-slate-800 dark:text-white">
            {user?.roles.join(', ')}
          </p>
          <p className="text-xs text-slate-500 mt-1">Vai trò của bạn trong hệ thống phân quyền Frontend</p>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. ACCOUNTS PAGE
// ==========================================
export const AccountsPage: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAccounts()
      .then(setAccounts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Tài khoản thanh toán</h2>
          <p className="text-xs text-slate-500">Danh sách tài khoản ngân hàng hoạt động</p>
        </div>
      </div>

      {loading ? (
        <div className="py-8 text-center text-slate-500">Đang tải...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-400 uppercase">
                <th className="py-3 px-4">Số tài khoản</th>
                <th className="py-3 px-4">Loại tài khoản</th>
                <th className="py-3 px-4 text-right">Số dư khả dụng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {accounts.map((acc) => (
                <tr key={acc.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
                  <td className="py-4 px-4 font-mono font-semibold text-slate-850 dark:text-slate-200">{acc.accountNumber}</td>
                  <td className="py-4 px-4 text-slate-500 dark:text-slate-400">{acc.accountType}</td>
                  <td className="py-4 px-4 text-right font-bold text-slate-800 dark:text-slate-100">
                    {acc.balance.toLocaleString('vi-VN')} {acc.currency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 3. TRANSFER PAGE
// ==========================================
export const TransferPage: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [fromAcc, setFromAcc] = useState('');
  const [toAcc, setToAcc] = useState('');
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    getAccounts()
      .then((data) => {
        setAccounts(data);
        if (data.length > 0) setFromAcc(data[0].accountNumber);
      })
      .catch(console.error);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromAcc || !toAcc || !amount || parseFloat(amount) <= 0) return;
    
    setLoading(true);
    setMessage(null);

    try {
      await transferApi({
        fromAccountNumber: fromAcc,
        toAccountNumber: toAcc,
        amount: parseFloat(amount),
        description: desc
      });
      setMessage({ type: 'success', text: 'Chuyển tiền thành công!' });
      setToAcc('');
      setAmount('');
      setDesc('');
      
      // Refresh accounts list to reflect balance deduction
      const updated = await getAccounts();
      setAccounts(updated);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Chuyển tiền thất bại' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">Chuyển khoản nội bộ</h2>
      <p className="text-xs text-slate-500 mb-6">Chuyển tiền tức thì đến các tài khoản trong ngân hàng</p>

      {message && (
        <div className={`p-4 rounded-xl mb-6 text-sm font-semibold border ${
          message.type === 'success' 
            ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30' 
            : 'bg-rose-50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-400 border-rose-100 dark:border-rose-900/30'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">Tài khoản nguồn</label>
          <select
            value={fromAcc}
            onChange={(e) => setFromAcc(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.accountNumber}>
                {acc.accountNumber} ({acc.balance.toLocaleString('vi-VN')} {acc.currency})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">Tài khoản nhận</label>
          <input
            type="text"
            placeholder="Nhập số tài khoản thụ hưởng..."
            value={toAcc}
            onChange={(e) => setToAcc(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-850 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">Số tiền chuyển (VND)</label>
          <input
            type="number"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-850 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">Lời nhắn</label>
          <textarea
            placeholder="Nhập nội dung chuyển tiền..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-855 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !toAcc || !amount}
          className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
        >
          {loading ? 'Đang thực hiện giao dịch...' : 'Tiến hành chuyển khoản'}
        </button>
      </form>
    </div>
  );
};

// ==========================================
// 4. TRANSACTIONS PAGE
// ==========================================
export const TransactionsPage: React.FC = () => {
  const [txs, setTxs] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTransactions()
      .then(setTxs)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">Lịch sử giao dịch</h2>
      <p className="text-xs text-slate-500 mb-6">Theo dõi các giao dịch chuyển và nhận gần đây</p>

      {loading ? (
        <div className="py-8 text-center text-slate-500">Đang tải...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-400 uppercase">
                <th className="py-3 px-4">Thời gian</th>
                <th className="py-3 px-4">Mô tả</th>
                <th className="py-3 px-4 text-right">Số tiền</th>
                <th className="py-3 px-4 text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {txs.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
                  <td className="py-4 px-4 text-xs text-slate-500 dark:text-slate-400">
                    {new Date(tx.date).toLocaleString('vi-VN')}
                  </td>
                  <td className="py-4 px-4 font-semibold text-slate-800 dark:text-slate-200">{tx.description}</td>
                  <td className={`py-4 px-4 text-right font-bold ${
                    tx.amount > 0 ? 'text-emerald-600 dark:text-emerald-450' : 'text-slate-800 dark:text-slate-150'
                  }`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('vi-VN')} VND
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 5. ADMIN PAGES
// ==========================================
export const AdminUsersPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">Quản lý Người dùng (Admin)</h2>
      <p className="text-xs text-slate-500 mb-6">Xem và quản lý tất cả các tài khoản khách hàng</p>
      
      <div className="p-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400">
        Tính năng này chỉ dành cho người dùng có vai trò <span className="font-bold text-indigo-500">ADMIN</span>.
      </div>
    </div>
  );
};

export const AdminRolesPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">Quản lý Vai trò (Admin)</h2>
      <p className="text-xs text-slate-500 mb-6">Phân phối vai trò hệ thống</p>
      
      <div className="p-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400">
        Bảng cấu hình Roles bảo mật &bull; Chỉ xem được với quyền <span className="font-bold text-indigo-500">ADMIN</span>.
      </div>
    </div>
  );
};

export const AdminPermissionsPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">Quản lý Quyền hạn (Admin)</h2>
      <p className="text-xs text-slate-500 mb-6">Cấu hình chi tiết quyền hạn API</p>
      
      <div className="p-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400">
        Bảng ánh xạ Quyền hạn (Permissions) &bull; Chỉ có quyền <span className="font-bold text-indigo-500">ADMIN</span> mới truy cập được.
      </div>
    </div>
  );
};

// ==========================================
// 6. GENERAL INFO / OTHER PAGES
// ==========================================
export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-md p-8 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl text-center space-y-6">
      <h2 className="text-2xl font-bold text-white">Đăng ký tài khoản mới</h2>
      <p className="text-sm text-slate-400">Hệ thống Banking đang bảo trì cổng đăng ký trực tuyến.</p>
      <button onClick={() => navigate(ROUTES.LOGIN)} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
        Quay lại Đăng nhập
      </button>
    </div>
  );
};

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-md p-8 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl text-center space-y-6">
      <h2 className="text-2xl font-bold text-white">Khôi phục mật khẩu</h2>
      <p className="text-sm text-slate-400">Vui lòng liên hệ với quầy giao dịch gần nhất để lấy lại mật khẩu của bạn.</p>
      <button onClick={() => navigate(ROUTES.LOGIN)} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
        Quay lại Đăng nhập
      </button>
    </div>
  );
};

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
