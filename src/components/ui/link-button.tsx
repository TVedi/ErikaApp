import Link from "next/link";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LinkButtonProps = VariantProps<typeof buttonVariants> & {
  href: string;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
};

export function LinkButton({
  href,
  className,
  variant,
  size,
  children,
  external,
}: LinkButtonProps) {
  const isExternal = external ?? href.startsWith("http");
  const classes = cn(buttonVariants({ variant, size }), className);

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
