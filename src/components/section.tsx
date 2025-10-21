import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  muted?: boolean;
}

export function Section({ children, className, muted = false, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "py-16 lg:py-24",
        muted && "bg-surface-muted",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}