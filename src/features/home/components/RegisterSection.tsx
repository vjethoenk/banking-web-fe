import {
    ArrowRight,
    CheckCircle2,
    Headphones,
    Lock,
    ShieldCheck,
    WalletCards,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import FeatureCard from "./FeatureCard";

const features = [
    {
        icon: ShieldCheck,
        title: "Bảo mật tuyệt đối",
    },
    {
        icon: Headphones,
        title: "Giao dịch 24/7",
    },
    {
        icon: WalletCards,
        title: "Phí 0đ",
    },
    {
        icon: Lock,
        title: "Hỗ trợ tận tâm",
    },
];

const reasons = [
    "Bảo mật nhiều lớp với công nghệ hiện đại",
    "Mọi giao dịch đều được kiểm soát và ghi nhận",
    "Ứng dụng dễ sử dụng trên mọi thiết bị",
    "Hỗ trợ khách hàng 24/7",
];

export default function RegisterSection() {
    return (
        <section className="bg-[#f5f7fa] pb-20">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">

                {/* Features */}
                <div className="grid grid-cols-2 gap-5">
                    {features.map((feature) => (
                        <FeatureCard
                            key={feature.title}
                            icon={feature.icon}
                            title={feature.title}
                        />
                    ))}
                </div>

                {/* Content */}
                <div>
                    <h2 className="text-2xl font-bold text-[#172b4d] md:text-3xl">
                        Tại sao chọn VinaBank?
                    </h2>

                    <p className="mt-4 text-sm leading-6 text-gray-500">
                        Chúng tôi không ngừng đổi mới để mang đến những
                        trải nghiệm ngân hàng số hiện đại, an toàn và thuận
                        tiện nhất cho khách hàng.
                    </p>

                    <div className="mt-6 space-y-4">
                        {reasons.map((reason) => (
                            <div
                                key={reason}
                                className="flex items-start gap-3"
                            >
                                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#155eef]" />

                                <span className="text-sm text-gray-600">
                                    {reason}
                                </span>
                            </div>
                        ))}
                    </div>

                    <Button className="mt-8 bg-[#155eef] hover:bg-[#0f4dcc]">
                        Khám phá ngay
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>

            </div>
        </section>
    );
}