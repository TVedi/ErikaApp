"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { PremiumSectionDivider } from "@/components/marketing/premium-section-divider";

/*
 * A client component because next/dynamic with ssr: false is not allowed in a
 * Server Component. The 3D bundle loads only once the section is near the
 * viewport, so the rest of the page never waits for it.
 */
const PaddleScene = dynamic(() => import("@/components/3d/paddle-scene"), {
  ssr: false,
});

export function PaddleShowcaseSection() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      data-home-section="stories"
      className="section-emerald-surface section-screen section-screen-center section-pad relative w-full"
    >
      <div className="section-screen-inner mx-auto flex max-w-6xl flex-col items-center justify-center px-4 sm:px-6">
        <div ref={stageRef} className="paddle-stage" aria-hidden="true">
          {nearViewport && <PaddleScene />}
        </div>
      </div>
      <PremiumSectionDivider />
    </section>
  );
}
