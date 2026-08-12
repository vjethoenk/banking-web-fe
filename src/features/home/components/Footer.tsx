import {
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#172b4d] text-white">
            <div className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <h2 className="text-xl font-bold text-white">
                            VinaBank
                        </h2>

                        <p className="mt-4 max-w-xs text-sm leading-6 text-slate-300">
                            Ngân hàng số thế hệ mới, mang đến trải nghiệm
                            tài chính hiện đại, an toàn và tiện lợi cho mọi
                            khách hàng.
                        </p>

                        <div className="mt-5 flex gap-3">
                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                            >
                                {/* <Facebook className="h-4 w-4" /> */}
                            </a>

                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                            >
                                {/* <Instagram className="h-4 w-4" /> */}
                            </a>

                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                            >
                                {/* <Linkedin className="h-4 w-4" /> */}
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-semibold">
                            Dịch vụ
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm text-slate-300">
                            <li>
                                <a href="#" className="hover:text-white">
                                    Tài khoản cá nhân
                                </a>
                            </li>

                            <li>
                                <a href="#" className="hover:text-white">
                                    Chuyển tiền
                                </a>
                            </li>

                            <li>
                                <a href="#" className="hover:text-white">
                                    Tiết kiệm
                                </a>
                            </li>

                            <li>
                                <a href="#" className="hover:text-white">
                                    Thẻ ngân hàng
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-semibold">
                            Hỗ trợ
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm text-slate-300">
                            <li>
                                <a href="#" className="hover:text-white">
                                    Trung tâm hỗ trợ
                                </a>
                            </li>

                            <li>
                                <a href="#" className="hover:text-white">
                                    Câu hỏi thường gặp
                                </a>
                            </li>

                            <li>
                                <a href="#" className="hover:text-white">
                                    Điều khoản sử dụng
                                </a>
                            </li>

                            <li>
                                <a href="#" className="hover:text-white">
                                    Chính sách bảo mật
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold">
                            Liên hệ
                        </h3>

                        <div className="mt-4 space-y-4 text-sm text-slate-300">
                            <div className="flex items-start gap-3">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                                <span>
                                    123 Nguyễn Huệ, Quận 1,
                                    <br />
                                    TP. Hồ Chí Minh
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4 shrink-0" />
                                <span>1900 6868</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 shrink-0" />
                                <span>support@vinabank.vn</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-10 border-t border-white/10 pt-6">
                    <div className="flex flex-col gap-3 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
                        <p>
                            © 2026 VinaBank. All rights reserved.
                        </p>

                        <p>
                            Ngân hàng số an toàn - hiện đại - tiện lợi
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}