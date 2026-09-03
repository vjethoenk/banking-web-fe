import { ArrowRight, TrendingUp, CheckCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/features/auth";
import { ROUTES } from "@/constants/routes";

// Glassmorphic Bank Card Component
function BankCardVisual() {
    return (
        <div className="relative w-full max-w-md mx-auto">
            {/* Floating glow blobs */}
            <div className="absolute -top-8 -right-8 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-blue-600/20 blur-3xl" />

            {/* Main Card */}
            <div
                className="relative z-10 w-full max-w-[340px] mx-auto rounded-3xl p-6 shadow-2xl shadow-blue-900/40"
                style={{
                    background: "linear-gradient(135deg, rgba(30,58,138,0.9) 0%, rgba(14,165,233,0.7) 100%)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                }}
            >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <div className="text-xs text-white/60 font-medium uppercase tracking-widest mb-1">Digital Banking</div>
                        <div className="text-white font-bold text-lg tracking-wide">VinaBanking</div>
                    </div>
                    <div className="flex items-center gap-0">
                        <div className="h-8 w-8 rounded-full bg-yellow-400/80" />
                        <div className="h-8 w-8 rounded-full bg-orange-400/60 -ml-3" />
                    </div>
                </div>

                {/* Chip */}
                <div className="mb-6">
                    <div className="h-9 w-12 rounded-md bg-gradient-to-br from-yellow-300/90 to-yellow-500/70 border border-yellow-200/30" />
                </div>

                {/* Card Number */}
                <div className="mb-6">
                    <div className="flex gap-3 text-white font-mono text-sm tracking-widest">
                        <span>****</span>
                        <span>****</span>
                        <span>****</span>
                        <span className="text-cyan-300">4291</span>
                    </div>
                </div>

                {/* Card Footer */}
                <div className="flex justify-between items-end">
                    <div>
                        <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Card Holder</div>
                        <div className="text-white font-medium text-sm">NGUYEN VAN A</div>
                    </div>
                    <div>
                        <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Expires</div>
                        <div className="text-white font-medium text-sm">12/29</div>
                    </div>
                    <div className="text-white/70 text-xl font-bold italic">VISA</div>
                </div>
            </div>

            {/* Floating Transaction Widget */}
            <div
                className="absolute -bottom-6 -right-4 z-20 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl"
                style={{
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.8)",
                    animation: "float 4s ease-in-out infinite",
                }}
            >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div>
                    <div className="text-xs text-slate-500">Thu nhập tháng này</div>
                    <div className="font-bold text-slate-800 text-sm">+12,540,000 ₫</div>
                </div>
            </div>

            {/* Floating Success Badge */}
            <div
                className="absolute -top-4 -left-4 z-20 flex items-center gap-2 rounded-2xl px-3 py-2 shadow-xl"
                style={{
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.8)",
                    animation: "float2 3.5s ease-in-out infinite",
                }}
            >
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-xs font-semibold text-slate-700">Giao dịch thành công</span>
            </div>

            {/* Floating Rating */}
            <div
                className="absolute top-1/2 -right-12 z-20 flex flex-col items-center gap-1 rounded-2xl px-3 py-3 shadow-xl"
                style={{
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.8)",
                    animation: "float3 5s ease-in-out infinite",
                    transform: "translateY(-50%)",
                }}
            >
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-400" />
                <div className="text-xs font-bold text-slate-700">4.9</div>
                <div className="text-[10px] text-slate-400">Rating</div>
            </div>
        </div>
    );
}

export default function HeroSection() {
    const isUser = useAuthStore((state) => state.user);

    return (
        <section
            className="relative overflow-hidden"
            style={{
                background: "linear-gradient(135deg, #060d1f 0%, #0a1628 40%, #091530 100%)",
                minHeight: "calc(100vh - 64px)",
            }}
        >
            {/* Background decorative blobs */}
            <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-700/10 blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
            <div className="absolute top-1/4 right-0 h-64 w-64 rounded-full bg-indigo-600/10 blur-[80px]" />

            {/* Grid overlay pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Floating animation styles */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes float2 {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                }
                @keyframes float3 {
                    0%, 100% { transform: translateY(-50%) translateX(0px); }
                    50% { transform: translateY(-50%) translateX(-6px); }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up { animation: fadeInUp 0.8s ease forwards; }
                .animate-fade-in-up-delay { animation: fadeInUp 0.8s ease 0.2s forwards; opacity: 0; }
                .animate-fade-in-up-delay2 { animation: fadeInUp 0.8s ease 0.4s forwards; opacity: 0; }
                .animate-fade-in-up-delay3 { animation: fadeInUp 0.8s ease 0.6s forwards; opacity: 0; }
            `}</style>

            <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 md:grid-cols-2 md:py-28">
                {/* Content */}
                <div>
                    {/* Trust badge */}
                    <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-400 backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        Nền tảng ngân hàng số tin cậy hàng đầu Việt Nam
                    </div>

                    {/* Headline */}
                    <h1 className="animate-fade-in-up-delay max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                        Quản lý tài chính{" "}
                        <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                            thông minh & an toàn
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="animate-fade-in-up-delay2 mt-6 max-w-lg text-base leading-relaxed text-slate-400 md:text-lg">
                        Trải nghiệm ngân hàng số hiện đại — chuyển tiền tức thời, bảo mật nhiều lớp,
                        và kiểm soát mọi giao dịch chỉ trong một nền tảng.
                    </p>

                    {/* CTA Buttons */}
                    <div className="animate-fade-in-up-delay3 mt-10 flex flex-wrap gap-4">
                        <Link
                            to={isUser?.citizenId ? ROUTES.DASHBOARD : ROUTES.ACCOUNT}
                            className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3 text-base font-semibold text-white shadow-xl shadow-blue-500/30 hover:from-blue-700 hover:to-cyan-600 hover:shadow-blue-500/40 transition-all duration-300"
                        >
                            Mở tài khoản ngay
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>

                        <button
                            className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-7 py-3 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                        >
                            Khám phá tính năng
                        </button>
                    </div>

                    {/* Social proof */}
                    <div className="animate-fade-in-up-delay3 mt-10 flex items-center gap-6 border-t border-white/10 pt-8">
                        <div>
                            <div className="text-2xl font-bold text-white">5M+</div>
                            <div className="text-xs text-slate-400 mt-0.5">Khách hàng tin dùng</div>
                        </div>
                        <div className="h-10 w-px bg-white/10" />
                        <div>
                            <div className="text-2xl font-bold text-white">99.9%</div>
                            <div className="text-xs text-slate-400 mt-0.5">Uptime đảm bảo</div>
                        </div>
                        <div className="h-10 w-px bg-white/10" />
                        <div>
                            <div className="text-2xl font-bold text-white">24/7</div>
                            <div className="text-xs text-slate-400 mt-0.5">Hỗ trợ không ngừng</div>
                        </div>
                    </div>
                </div>

                {/* Visual */}
                <div className="flex justify-center md:justify-end">
                    <BankCardVisual />
                </div>
            </div>
        </section>
    );
}