import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconListProps {
  items: string[];
  className?: string;
}

export function IconList({ items, className }: IconListProps) {
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2", className)}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <CheckCircle className="h-6 w-6 flex-shrink-0 text-secondary mt-0.5" />
          <span className="text-gray-700">{item}</span>
        </li>
      ))}
    </ul>
  );
}