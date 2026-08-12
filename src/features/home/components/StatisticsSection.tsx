const statistics = [
    {
        value: "5M+",
        label: "Khách hàng",
    },
    {
        value: "20+",
        label: "Năm kinh nghiệm",
    },
    {
        value: "99.9%",
        label: "Uptime",
    },
    {
        value: "24/7",
        label: "Hỗ trợ",
    },
];

export default function StatisticsSection() {
    return (
        <section className="border-y bg-white">
            <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
                {statistics.map((item) => (
                    <div
                        key={item.label}
                        className="flex flex-col items-center justify-center px-4 py-7"
                    >
                        <span className="text-2xl font-bold text-[#155eef]">
                            {item.value}
                        </span>

                        <span className="mt-1 text-xs text-gray-500">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}