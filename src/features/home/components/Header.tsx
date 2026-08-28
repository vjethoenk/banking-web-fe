import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Link } from "react-router-dom";
import { Menu, X, Shield, ChevronDown, LogOut, User } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthStore, useLogout } from "@/features/auth";

export default function Header() {
    const user = useAuthStore((state) => state.user);
    const { handleLogout } = useLogout();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/85 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20">
                        <Shield className="h-5 w-5" />
                    </div>
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Vina</span>
                    <span className="text-slate-800">Bank</span>
                </Link>

                {/* Navigation (Desktop) */}
                <nav className="hidden items-center gap-8 text-sm md:flex">
                    <a href="#" className="font-medium text-slate-600 transition duration-200 hover:text-blue-600">Dịch vụ</a>
                    <a href="#" className="font-medium text-slate-600 transition duration-200 hover:text-blue-600">Bảo mật</a>
                    <a href="#" className="font-medium text-slate-600 transition duration-200 hover:text-blue-600">Tin tức</a>
                    <a href="#" className="font-medium text-slate-600 transition duration-200 hover:text-blue-600">Hỗ trợ</a>
                </nav>

                {/* Actions (Desktop) */}
                <div className="hidden items-center gap-4 md:flex">
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                render={
                                    <Button variant="outline" className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50 gap-2 cursor-pointer">
                                        <User className="h-4 w-4 text-blue-600" />
                                        Xin chào {user?.username}
                                        <ChevronDown className="h-3 w-3 opacity-50" />
                                    </Button>
                                }
                            />
                            <DropdownMenuContent className="w-48 bg-white border border-slate-100 shadow-xl rounded-xl p-1 z-50">
                                <DropdownMenuGroup>
                                    {user.citizenId ? (
                                        <DropdownMenuItem className="focus:bg-slate-50 rounded-md cursor-pointer">
                                            <Link to={ROUTES.DASHBOARD} className="w-full flex items-center gap-2 py-1 px-1 text-slate-700">
                                                <User className="h-4 w-4 text-blue-600" />
                                                Tài khoản
                                            </Link>
                                        </DropdownMenuItem>
                                    ) : null}
                                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 focus:bg-red-50 rounded-md cursor-pointer flex items-center gap-2 py-2 px-2">
                                        <LogOut className="h-4 w-4" />
                                        Đăng xuất
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link
                            to={ROUTES.LOGIN}
                            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/20 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
                        >
                            Đăng nhập
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 md:hidden transition cursor-pointer"
                >
                    {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="border-t border-slate-100 bg-white px-6 py-4 shadow-inner md:hidden flex flex-col gap-4">
                    <nav className="flex flex-col gap-3">
                        <a href="#" className="font-medium text-slate-600 py-1 transition hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Dịch vụ</a>
                        <a href="#" className="font-medium text-slate-600 py-1 transition hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Bảo mật</a>
                        <a href="#" className="font-medium text-slate-600 py-1 transition hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Tin tức</a>
                        <a href="#" className="font-medium text-slate-600 py-1 transition hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Hỗ trợ</a>
                    </nav>
                    <div className="border-t border-slate-100 pt-3">
                        {user ? (
                            <div className="flex flex-col gap-2">
                                <div className="text-sm font-semibold text-slate-700 px-1 py-1">Xin chào, {user?.username}</div>
                                {user.citizenId && (
                                    <Link
                                        to={ROUTES.DASHBOARD}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                                    >
                                        <User className="h-4 w-4 text-blue-600" />
                                        Vào trang quản lý
                                    </Link>
                                )}
                                <Button onClick={handleLogout} variant="ghost" className="justify-start w-full text-red-600 hover:text-red-700 hover:bg-red-50 gap-2">
                                    <LogOut className="h-4 w-4" />
                                    Đăng xuất
                                </Button>
                            </div>
                        ) : (
                            <Link
                                to={ROUTES.LOGIN}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:from-blue-700 hover:to-cyan-700"
                            >
                                Đăng nhập
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}