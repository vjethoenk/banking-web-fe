import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
    return (
        <section className="bg-[#f5f7fa]">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-20">

                {/* Content */}
                <div>
                    <div className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-[#155eef]">
                        Ngân hàng số hiện đại
                    </div>

                    <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-[#172b4d] md:text-5xl">
                        Ngân hàng số
                        <br />
                        <span className="text-[#155eef]">
                            thế hệ mới
                        </span>
                    </h1>

                    <p className="mt-5 max-w-lg text-sm leading-6 text-gray-500 md:text-base">
                        Trải nghiệm dịch vụ ngân hàng hiện đại, bảo mật
                        và tiện lợi trên nền tảng số Banking. Mọi giao
                        dịch của bạn đều được thực hiện nhanh chóng,
                        an toàn và dễ dàng.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button
                            className="bg-[#155eef] px-6 shadow-md hover:bg-[#0f4dcc]"
                        >
                            Mở tài khoản ngay
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>

                        <Button
                            variant="outline"
                            className="border-gray-300 bg-white px-6"
                        >
                            Tìm hiểu thêm
                        </Button>
                    </div>
                </div>

                {/* Image */}
                <div className="flex justify-center md:justify-end">
                    <div className="relative w-full max-w-md overflow-hidden rounded-xl bg-white p-4 shadow-lg">
                        <img
                            src="/images/bank-card.png"
                            alt="Banking Card"
                            className="h-auto w-full rounded-lg object-cover"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}