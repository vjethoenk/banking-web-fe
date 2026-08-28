import type { LucideIcon } from "lucide-react";

interface ServiceCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    gradient: string;
    iconBg: string;
}

export default function ServiceCard({
    icon: Icon,
    title,
    description,
    gradient,
    iconBg,
}: ServiceCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-100">
            {/* Hover gradient overlay (subtle) */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br ${gradient}`} />

            {/* Icon */}
            <div className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg} shadow-md transition-transform duration-300 group-hover:scale-110`}>
                <Icon className="h-7 w-7 text-white" />
            </div>

            {/* Text */}
            <h3 className="relative z-10 mt-6 text-base font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-200">
                {title}
            </h3>

            <p className="relative z-10 mt-3 text-sm leading-relaxed text-slate-500">
                {description}
            </p>

            {/* Bottom accent line on hover */}
            <div className={`absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r ${gradient} transition-all duration-300 group-hover:w-full`} />
        </div>
    );
}