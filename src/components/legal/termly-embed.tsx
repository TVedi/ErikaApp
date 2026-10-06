"use client";

import { useEffect } from "react";

const TERMLY_EMBED_SCRIPT_SRC = "https://app.termly.io/embed-policy.min.js";

const termlyContainerProps = { name: "termly-embed" } as Record<string, string>;

export function TermlyEmbed({ policyId }: { policyId: string }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = TERMLY_EMBED_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, [policyId]);

  return <div {...termlyContainerProps} data-id={policyId} />;
}
