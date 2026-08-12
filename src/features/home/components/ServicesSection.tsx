import {
    CreditCard,
    PiggyBank,
    Globe2,
} from "lucide-react";
import ServiceCard from "./ServiceCardProps";



const services = [
    {
        icon: CreditCard,
        title: "Tài khoản cá nhân",
        description:
            "Quản lý tài khoản dễ dàng, chuyển tiền nhanh chóng và an toàn ngay trên nền tảng số.",
    },
    {
        icon: PiggyBank,
        title: "Tiết kiệm lãi suất cao",
        description:
            "Các gói tiết kiệm linh hoạt với mức lãi suất hấp dẫn, phù hợp với nhu cầu tài chính.",
    },
    {
        icon: Globe2,
        title: "Chuyển tiền quốc tế",
        description:
            "Chuyển tiền quốc tế nhanh chóng, thuận tiện với hệ thống bảo mật nhiều lớp.",
    },
];

export default function ServicesSection() {
    return (
        <section className="bg-[#f5f7fa] py-16">
            <div className="mx-auto max-w-7xl px-6">

                {/* Heading */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#172b4d] md:text-3xl">
                        Dịch vụ nổi bật
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Giải pháp tài chính toàn diện cho mọi nhu cầu của bạn
                    </p>
                </div>

                {/* Cards */}
                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {services.map((service) => (
                        <ServiceCard
                            key={service.title}
                            icon={service.icon}
                            title={service.title}
                            description={service.description}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}