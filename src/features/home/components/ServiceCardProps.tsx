import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ServiceCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export default function ServiceCard({
    icon: Icon,
    title,
    description,
}: ServiceCardProps) {
    return (
        <Card className="group border-0 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-[#155eef]">
                <Icon className="h-5 w-5" />
            </div>

            <h3 className="mt-5 font-semibold text-[#172b4d]">
                {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
                {description}
            </p>
        </Card>
    );
}