import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description?: string;
    gradient?: string;
}

export default function FeatureCard({
    icon: Icon,
    title,
    description,
    gradient = "from-blue-600 to-cyan-500",
}: FeatureCardProps) {
    return (
        <div className="group flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue-100 min-h-[160px]">
            {/* Icon circle */}
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-md shadow-blue-500/20 transition-transform duration-300 group-hover:scale-110`}>
                <Icon className="h-7 w-7 text-white" />
            </div>

            <h3 className="mt-4 text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-200">
                {title}
            </h3>

            {description && (
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    {description}
                </p>
            )}
        </div>
    );
}
