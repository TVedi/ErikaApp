import { cn } from "@/lib/utils";

/**
 * Italic Fraunces accent inside display headlines (e.g. hero title).
 */
export function DisplayAccent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("font-display italic font-medium text-accent-coral", className)}>
      {children}
    </span>
  );
}
