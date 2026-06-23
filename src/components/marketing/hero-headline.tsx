import { DisplayAccent } from "@/components/marketing/display-accent";

/**
 * Renders a hero headline with an optional italic Fraunces accent word.
 */
export function HeroHeadline({
  title,
  accentWord,
  className,
}: {
  title: string;
  accentWord?: string;
  className?: string;
}) {
  if (!accentWord || !title.includes(accentWord)) {
    return <span className={className}>{title}</span>;
  }

  const [before, after] = title.split(accentWord);

  return (
    <span className={className}>
      {before}
      <DisplayAccent>{accentWord}</DisplayAccent>
      {after}
    </span>
  );
}
