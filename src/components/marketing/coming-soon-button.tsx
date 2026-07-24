type ComingSoonButtonProps = {
  label: string;
  className?: string;
};

/**
 * Soft gold “coming soon” status chip — shared by /camps, /speaking,
 * Video Course, and the home Camps section. Non-interactive (role=status).
 */
export function ComingSoonButton({ label, className }: ComingSoonButtonProps) {
  const classes = ["coming-soon-cta-soft", className].filter(Boolean).join(" ");
  return (
    <p className={classes} role="status">
      {label}
    </p>
  );
}
