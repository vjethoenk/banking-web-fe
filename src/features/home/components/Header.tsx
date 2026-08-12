import { Button } from "@/components/ui/button";

export default function Header() {
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
                <Button
                    size="sm"
                    className="bg-[#155eef] px-5 hover:bg-[#0f4dcc]"
                >
                    Đăng nhập
                </Button>
            </div>
        </header>
    );
}