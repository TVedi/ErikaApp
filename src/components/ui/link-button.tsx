import Link from "next/link";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LinkButtonProps = VariantProps<typeof buttonVariants> & {
  href: string;
  className?: string;
  children: React.ReactNode;
  gradient?: boolean;
};

export function LinkButton({
  href,
  className,
  variant,
  size,
  children,
  gradient,
}: LinkButtonProps) {
  if (gradient) {
    return (
      <Link
        href={href}
        className={cn(
          size === "lg" ? "btn-gradient-lg" : "btn-gradient-sm",
          className
        )}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {children}
    </Link>
  );
}
