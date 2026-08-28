import {
    Mail,
    MapPin,
    Phone,
    Shield,
    ArrowRight,
} from "lucide-react";

const footerLinks = {
    services: [
        "Tài khoản cá nhân",
        "Chuyển tiền",
        "Tiết kiệm",
        "Thẻ ngân hàng",
        "Thanh toán hóa đơn",
    ],
    support: [
        "Trung tâm hỗ trợ",
        "Câu hỏi thường gặp",
        "Điều khoản sử dụng",
        "Chính sách bảo mật",
        "Liên hệ chúng tôi",
    ],
};

// SVG Social Icons (Lucide doesn't include Facebook/Instagram/LinkedIn)
function FacebookIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    );
}

function InstagramIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
    );
}

function LinkedInIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    );
}

const socialLinks = [
    {
        label: "Facebook",
        Icon: FacebookIcon,
        hoverBg: "rgba(59,130,246,0.3)",
        hoverBorder: "rgba(59,130,246,0.5)",
    },
    {
        label: "Instagram",
        Icon: InstagramIcon,
        hoverBg: "rgba(236,72,153,0.3)",
        hoverBorder: "rgba(236,72,153,0.5)",
    },
    {
        label: "LinkedIn",
        Icon: LinkedInIcon,
        hoverBg: "rgba(14,165,233,0.3)",
        hoverBorder: "rgba(14,165,233,0.5)",
    },
];

export default function Footer() {
    return (
        <footer style={{ background: "#060d1f" }} className="text-white">
            {/* Newsletter bar */}
            <div
                className="border-b"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
                <div className="mx-auto max-w-7xl px-6 py-10">
                    <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                        <div>
                            <h3 className="text-lg font-bold text-white">
                                Nhận tin tức & ưu đãi mới nhất
                            </h3>
                            <p className="mt-1 text-sm text-slate-400">
                                Đăng ký nhận bản tin để không bỏ lỡ các chương trình hấp dẫn.
                            </p>
                        </div>
                        <div className="flex w-full max-w-sm gap-2">
                            <input
                                type="email"
                                placeholder="Nhập email của bạn..."
                                className="flex-1 rounded-xl border px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-500/50 transition"
                                style={{
                                    background: "rgba(255,255,255,0.06)",
                                    borderColor: "rgba(255,255,255,0.12)",
                                }}
                            />
                            <button
                                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2.5 text-sm font-semibold text-white hover:from-blue-700 hover:to-cyan-700 transition-all duration-200"
                            >
                                Đăng ký
                                <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main footer content */}
            <div className="mx-auto max-w-7xl px-6 py-14">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div>
                        {/* Logo */}
                        <div className="flex items-center gap-2 text-xl font-extrabold tracking-tight mb-5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 shadow-md shadow-blue-500/20">
                                <Shield className="h-5 w-5 text-white" />
                            </div>
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                Vina
                            </span>
                            <span className="text-white">Bank</span>
                        </div>

                        <p className="max-w-xs text-sm leading-relaxed text-slate-400">
                            Ngân hàng số thế hệ mới — mang đến trải nghiệm tài chính hiện đại,
                            an toàn và tiện lợi cho mọi khách hàng Việt Nam.
                        </p>

                        {/* Social Icons */}
                        <div className="mt-6 flex gap-3">
                            {socialLinks.map(({ label, Icon, hoverBg, hoverBorder }) => (
                                <a
                                    key={label}
                                    href="#"
                                    aria-label={label}
                                    className="flex h-9 w-9 items-center justify-center rounded-full text-slate-300 transition-all duration-200 hover:scale-110"
                                    style={{
                                        background: "rgba(255,255,255,0.08)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.background = hoverBg;
                                        (e.currentTarget as HTMLElement).style.borderColor = hoverBorder;
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                                    }}
                                >
                                    <Icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-bold text-white mb-5">Dịch vụ</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            {footerLinks.services.map((link) => (
                                <li key={link}>
                                    <a href="#" className="hover:text-cyan-400 transition-colors duration-150">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-bold text-white mb-5">Hỗ trợ</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            {footerLinks.support.map((link) => (
                                <li key={link}>
                                    <a href="#" className="hover:text-cyan-400 transition-colors duration-150">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-white mb-5">Liên hệ</h3>
                        <div className="space-y-4 text-sm text-slate-400">
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/15">
                                    <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                                </div>
                                <span className="leading-relaxed">
                                    123 Nguyễn Huệ, Quận 1,
                                    <br />
                                    TP. Hồ Chí Minh
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/15">
                                    <Phone className="h-3.5 w-3.5 text-cyan-400" />
                                </div>
                                <span>1900 6868</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/15">
                                    <Mail className="h-3.5 w-3.5 text-cyan-400" />
                                </div>
                                <span>support@vinabank.vn</span>
                            </div>
                        </div>

                        {/* Security certification */}
                        <div
                            className="mt-6 rounded-xl p-4 text-xs text-slate-400"
                            style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Shield className="h-3.5 w-3.5 text-cyan-400" />
                                <span className="font-semibold text-slate-300">Chứng nhận bảo mật</span>
                            </div>
                            <p className="leading-relaxed">
                                Tuân thủ PCI DSS, ISO 27001 và tiêu chuẩn bảo mật của Ngân hàng
                                Nhà nước Việt Nam.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div
                    className="mt-12 border-t pt-7"
                    style={{ borderColor: "rgba(255,255,255,0.07)" }}
                >
                    <div className="flex flex-col gap-4 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
                        <p>
                            © 2026 VinaBank. All rights reserved. Ngân hàng số an toàn — hiện đại — tiện lợi.
                        </p>
                        <div className="flex gap-5">
                            <a href="#" className="hover:text-slate-300 transition-colors">Điều khoản dịch vụ</a>
                            <a href="#" className="hover:text-slate-300 transition-colors">Chính sách bảo mật</a>
                            <a href="#" className="hover:text-slate-300 transition-colors">Cookie</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}