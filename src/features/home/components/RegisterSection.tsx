import {
    ArrowRight,
    CheckCircle2,
    Headphones,
    Lock,
    ShieldCheck,
    WalletCards,
    Fingerprint,
    Layers,
} from "lucide-react";


import FeatureCard from "./FeatureCard";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

const features = [
    {
        icon: ShieldCheck,
        title: "Bảo mật tuyệt đối",
        gradient: "from-blue-600 to-indigo-600",
    },
    {
        icon: Headphones,
        title: "Giao dịch 24/7",
        gradient: "from-cyan-500 to-blue-600",
    },
    {
        icon: WalletCards,
        title: "Phí 0đ",
        gradient: "from-indigo-600 to-purple-600",
    },
    {
        icon: Lock,
        title: "Hỗ trợ tận tâm",
        gradient: "from-sky-500 to-cyan-500",
    },
];

const reasons = [
    "Bảo mật nhiều lớp với công nghệ mã hoá chuẩn ngân hàng quốc tế",
    "Mọi giao dịch đều được kiểm soát và ghi nhận minh bạch",
    "Ứng dụng dễ sử dụng, tương thích mọi thiết bị",
    "Đội ngũ hỗ trợ khách hàng chuyên nghiệp 24/7",
];

const securityBadges = [
    { icon: Fingerprint, label: "Xác thực sinh trắc học" },
    { icon: Layers, label: "Mã hoá AES-256" },
    { icon: ShieldCheck, label: "Bảo hiểm tiền gửi" },
];

export default function RegisterSection() {
    return (
        <>
            {/* Security / Why VinaBank Section */}
            <section className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid items-center gap-14 lg:grid-cols-2">
                        {/* Feature cards grid */}
                        <div>
                            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-xs font-semibold text-blue-600">
                                Tại sao chọn chúng tôi
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {features.map((feature) => (
                                    <FeatureCard
                                        key={feature.title}
                                        icon={feature.icon}
                                        title={feature.title}
                                        gradient={feature.gradient}
                                    />
                                ))}
                            </div>

                            {/* Security Badges */}
                            <div className="mt-6 flex flex-wrap gap-3">
                                {securityBadges.map((badge) => (
                                    <div
                                        key={badge.label}
                                        className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5 text-xs font-medium text-slate-600"
                                    >
                                        <badge.icon className="h-4 w-4 text-blue-600" />
                                        {badge.label}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div>
                            <h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl leading-tight">
                                An toàn & tin cậy là{" "}
                                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                    ưu tiên hàng đầu
                                </span>
                            </h2>

                            <p className="mt-5 text-base leading-relaxed text-slate-500">
                                Chúng tôi không ngừng đổi mới để mang đến những trải nghiệm ngân
                                hàng số hiện đại, an toàn và thuận tiện nhất — bảo vệ tài sản và
                                thông tin của bạn ở tiêu chuẩn cao nhất.
                            </p>

                            <div className="mt-8 space-y-4">
                                {reasons.map((reason) => (
                                    <div
                                        key={reason}
                                        className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4"
                                    >
                                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500">
                                            <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                                        </div>
                                        <span className="text-sm text-slate-600 leading-relaxed">
                                            {reason}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                to={ROUTES.ACCOUNT}
                                className="group mt-10 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-7 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/20 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
                            >
                                Khám phá ngay
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section
                className="relative overflow-hidden py-20"
                style={{
                    background: "linear-gradient(135deg, #060d1f 0%, #0a1628 60%, #091c36 100%)",
                }}
            >
                {/* Background blobs */}
                <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-blue-700/20 blur-[80px]" />
                <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-cyan-500/15 blur-[80px]" />

                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                        backgroundSize: "50px 50px",
                    }}
                />

                <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold text-cyan-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        Đăng ký hoàn toàn miễn phí
                    </div>

                    <h2 className="text-3xl font-extrabold text-white md:text-4xl lg:text-5xl leading-tight">
                        Sẵn sàng trải nghiệm{" "}
                        <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                            ngân hàng số?
                        </span>
                    </h2>

                    <p className="mt-5 text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
                        Mở tài khoản trong 3 phút — không cần đến chi nhánh, không phí duy trì,
                        bảo mật chuẩn ngân hàng quốc tế.
                    </p>

                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <Link
                            to={ROUTES.ACCOUNT}
                            className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-3 text-base font-semibold text-white shadow-xl shadow-blue-500/30 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300"
                        >
                            Mở tài khoản ngay
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>

                        <Link
                            to={ROUTES.LOGIN}
                            className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-8 py-3 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                        >
                            Đăng nhập ngay
                        </Link>
                    </div>

                    {/* Trust indicators */}
                    <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs text-slate-500">
                        {[
                            "Miễn phí mở tài khoản",
                            "Phí chuyển tiền 0đ",
                            "Bảo mật chuẩn quốc tế",
                            "Hỗ trợ 24/7",
                        ].map((text) => (
                            <div key={text} className="flex items-center gap-1.5">
                                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-500" />
                                {text}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}