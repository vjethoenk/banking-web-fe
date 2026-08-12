import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Link } from "react-router-dom";
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
    return (
        <header className="border-b bg-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                {/* Logo */}
                <div className="text-lg font-bold text-[#155eef]">
                    VinaBank
                </div>

                {/* Navigation */}
                <nav className="hidden items-center gap-10 text-sm md:flex">
                    <a
                        href="#"
                        className="font-medium text-gray-600 transition hover:text-[#155eef]"
                    >
                        Hồ trợ
                    </a>

                    <a
                        href="#"
                        className="font-medium text-gray-600 transition hover:text-[#155eef]"
                    >
                        Tin tức
                    </a>
                </nav>

                {/* Login */}
                {user ? <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="outline" className="border-none text-[#155eef]">Xin chào {user?.username}</Button>} />
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <DropdownMenuItem><Link to={ROUTES.DASHBOARD}>Tài khoản</Link></DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout}>Đăng xuất</DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu> :
                    <Button
                        size="sm"
                        className="bg-[#155eef] px-5 hover:bg-[#0f4dcc]"
                    >
                        <Link to={ROUTES.LOGIN}>
                            Đăng nhập
                        </Link>
                    </Button>}
            </div>
        </header>
    );
}