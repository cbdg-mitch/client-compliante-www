import { cn } from "@/lib/utils";

interface ProseProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Prose({ children, className, ...props }: ProseProps) {
  return (
    <div
      className={cn(
        "prose prose-lg max-w-none",
        "prose-headings:font-heading prose-headings:text-primary",
        "prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-6",
        "prose-h2:text-3xl prose-h2:font-semibold prose-h2:mt-12 prose-h2:mb-4",
        "prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3",
        "prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4",
        "prose-a:text-secondary prose-a:no-underline hover:prose-a:underline",
        "prose-strong:text-gray-900 prose-strong:font-semibold",
        "prose-ul:my-6 prose-li:my-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}