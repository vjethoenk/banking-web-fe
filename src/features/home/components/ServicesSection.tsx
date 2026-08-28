import {
    CreditCard,
    PiggyBank,
    Globe2,
    BarChart3,
    Zap,
    Lock,
} from "lucide-react";
import ServiceCard from "./ServiceCardProps";

const services = [
    {
        icon: CreditCard,
        title: "Tài khoản cá nhân",
        description:
            "Quản lý tài khoản dễ dàng, chuyển tiền nhanh chóng và an toàn ngay trên nền tảng số. Mở tài khoản trong vài phút.",
        gradient: "from-blue-600 to-cyan-500",
        iconBg: "bg-gradient-to-br from-blue-600 to-cyan-500",
    },
    {
        icon: PiggyBank,
        title: "Tiết kiệm lãi suất cao",
        description:
            "Các gói tiết kiệm linh hoạt với mức lãi suất hấp dẫn, phù hợp với mọi nhu cầu tài chính của bạn.",
        gradient: "from-indigo-600 to-blue-500",
        iconBg: "bg-gradient-to-br from-indigo-600 to-blue-500",
    },
    {
        icon: Globe2,
        title: "Chuyển tiền quốc tế",
        description:
            "Giao dịch xuyên biên giới nhanh chóng, tỷ giá cạnh tranh với hệ thống bảo mật nhiều lớp tiêu chuẩn quốc tế.",
        gradient: "from-cyan-600 to-teal-500",
        iconBg: "bg-gradient-to-br from-cyan-600 to-teal-500",
    },
    {
        icon: BarChart3,
        title: "Phân tích tài chính",
        description:
            "Báo cáo chi tiêu thông minh, thống kê thu chi trực quan giúp bạn kiểm soát ngân sách hiệu quả.",
        gradient: "from-blue-700 to-indigo-600",
        iconBg: "bg-gradient-to-br from-blue-700 to-indigo-600",
    },
    {
        icon: Zap,
        title: "Thanh toán tức thời",
        description:
            "Thanh toán hóa đơn, điện nước, điện thoại và hơn 200 dịch vụ ngay trong ứng dụng không tốn phí.",
        gradient: "from-sky-500 to-blue-600",
        iconBg: "bg-gradient-to-br from-sky-500 to-blue-600",
    },
    {
        icon: Lock,
        title: "Bảo mật tuyệt đối",
        description:
            "Xác thực đa lớp, mã hóa dữ liệu cấp ngân hàng và giám sát giao dịch 24/7 bảo vệ tài sản của bạn.",
        gradient: "from-indigo-600 to-purple-600",
        iconBg: "bg-gradient-to-br from-indigo-600 to-purple-600",
    },
];

export default function ServicesSection() {
    return (
        <section className="bg-gradient-to-b from-white to-slate-50/80 py-20">
            <div className="mx-auto max-w-7xl px-6">
                {/* Heading */}
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-xs font-semibold text-blue-600">
                        Sản phẩm & Dịch vụ
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl leading-tight">
                        Giải pháp tài chính{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            toàn diện
                        </span>
                    </h2>
                    <p className="mt-4 text-base text-slate-500 leading-relaxed">
                        Từ tài khoản cá nhân đến chuyển tiền quốc tế — mọi nhu cầu tài chính
                        đều được đáp ứng trên một nền tảng duy nhất.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <ServiceCard
                            key={service.title}
                            icon={service.icon}
                            title={service.title}
                            description={service.description}
                            gradient={service.gradient}
                            iconBg={service.iconBg}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}