import type { ReactNode } from "react";
import { DisplayAccent } from "@/components/marketing/display-accent";

/** Wraps a phrase within text in the gold light-sweep treatment (see .text-gold-sweep). */
function withSweepPhrase(text: string, sweepPhrase?: string): ReactNode {
  if (!sweepPhrase || !text.includes(sweepPhrase)) {
    return text;
  }
  const [before, after] = text.split(sweepPhrase);
  return (
    <>
      {before}
      <span className="text-gold-sweep">{sweepPhrase}</span>
      {after}
    </>
  );
}

/**
 * Renders a hero headline with an optional italic Fraunces accent word
 * and an optional gold light-sweep phrase.
 */
export function HeroHeadline({
  title,
  accentWord,
  sweepPhrase,
  className,
}: {
  title: string;
  accentWord?: string;
  sweepPhrase?: string;
  className?: string;
}) {
  if (!accentWord || !title.includes(accentWord)) {
    return <span className={className}>{withSweepPhrase(title, sweepPhrase)}</span>;
  }

  const [before, after] = title.split(accentWord);

  return (
    <span className={className}>
      {withSweepPhrase(before, sweepPhrase)}
      <DisplayAccent>{accentWord}</DisplayAccent>
      {withSweepPhrase(after, sweepPhrase)}
    </span>
  );
}
