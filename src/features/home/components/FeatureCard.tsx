import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description?: string;
}

export default function FeatureCard({
    icon: Icon,
    title,
    description,
}: FeatureCardProps) {
    return (
        <div className="flex min-h-[150px] flex-col items-center justify-center rounded-lg border bg-white p-5 text-center shadow-sm transition hover:shadow-md">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-[#155eef]">
                <Icon className="h-5 w-5" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-[#172b4d]">
                {title}
            </h3>

            {description && (
                <p className="mt-2 text-xs text-gray-500">
                    {description}
                </p>
            )}
        </div>
    );
}
