const statistics = [
    {
        value: "5M+",
        label: "Khách hàng",
        desc: "Tin dùng toàn quốc",
        color: "from-blue-500 to-cyan-500",
        glow: "shadow-blue-500/20",
    },
    {
        value: "20+",
        label: "Năm kinh nghiệm",
        desc: "Trong lĩnh vực tài chính",
        color: "from-indigo-500 to-blue-500",
        glow: "shadow-indigo-500/20",
    },
    {
        value: "99.9%",
        label: "Uptime",
        desc: "Hệ thống luôn ổn định",
        color: "from-cyan-500 to-teal-500",
        glow: "shadow-cyan-500/20",
    },
    {
        value: "24/7",
        label: "Hỗ trợ",
        desc: "Sẵn sàng mọi lúc mọi nơi",
        color: "from-blue-600 to-indigo-500",
        glow: "shadow-blue-600/20",
    },
];

export default function StatisticsSection() {
    return (
        <section className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                    {statistics.map((item) => (
                        <div
                            key={item.label}
                            className={`group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-lg ${item.glow} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                        >
                            {/* Gradient top bar */}
                            <div className={`absolute top-0 left-0 h-1 w-full rounded-t-2xl bg-gradient-to-r ${item.color}`} />

                            {/* Value */}
                            <div className={`bg-gradient-to-r ${item.color} bg-clip-text text-3xl font-extrabold text-transparent md:text-4xl`}>
                                {item.value}
                            </div>

                            {/* Label */}
                            <div className="mt-2 text-sm font-semibold text-slate-700">
                                {item.label}
                            </div>

                            {/* Desc */}
                            <div className="mt-1 text-xs text-slate-400 leading-relaxed">
                                {item.desc}
                            </div>

                            {/* Decorative circle */}
                            <div className={`absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r ${item.color} opacity-10 transition-all duration-300 group-hover:scale-150`} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}