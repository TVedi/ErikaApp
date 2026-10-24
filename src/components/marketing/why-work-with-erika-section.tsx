import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { PremiumSectionDivider } from "@/components/marketing/premium-section-divider";

const reasons = [
  {
    n: "01",
    title: "World-class experience, applied to you",
    body: "20 years of international racing translated into practical decisions about training, technique and race preparation.",
  },
  {
    n: "02",
    title: "Coaching built around you",
    body: "Your goals, training history, current level, available time, strengths and individual needs shape the way we train.",
  },
  {
    n: "03",
    title: "I look at the whole movement",
    body: "Connection through the body, power transfer, timing, rotation, release, boat movement — and what changes as fatigue sets in.",
  },
  {
    n: "04",
    title: "You learn the why, not just the what",
    body: "Understand what you are working on, why it matters, and how to recognize meaningful progress yourself.",
  },
];

export function WhyWorkWithErikaSection() {
  return (
    <section
      className="why-erika-section w-full"
      aria-labelledby="why-erika-heading"
    >
      <div className="why-erika-photo" aria-hidden="true">
        <Image
          src="/DSC09954[1].jpg"
          alt=""
          fill
          sizes="100vw"
          className="why-erika-photo-img"
        />
      </div>

      <div className="why-erika-inner">
        <ScrollReveal>
          <p className="why-erika-eyebrow">Why work with Erika</p>
          <div className="why-erika-rule" aria-hidden="true" />
          <h2 id="why-erika-heading" className="why-erika-heading">
            More than a training plan.
          </h2>
          <p className="why-erika-intro">
            Good coaching starts with understanding the athlete in front of
            you: what they need, what should change next, and what will
            actually move their performance forward.
          </p>
        </ScrollReveal>

        <ul className="why-erika-list">
          {reasons.map((r) => (
            <li key={r.n} className="why-erika-item">
              <span className="why-erika-num" aria-hidden="true">
                {r.n}
              </span>
              <div className="why-erika-copy">
                <h3 className="why-erika-item-title">{r.title}</h3>
                <p className="why-erika-item-body">{r.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <blockquote className="why-erika-quote">
          The goal is not to make you train the way I trained. The goal is to
          help you find what works best for you.
        </blockquote>

        <div className="why-erika-actions">
          <Link href="/apply" className="why-erika-cta">
            Apply for Coaching
          </Link>
        </div>
      </div>

      <PremiumSectionDivider />
    </section>
  );
}
