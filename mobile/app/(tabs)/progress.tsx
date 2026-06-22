import { ComingSoonTab } from "../../components/coming-soon-tab";

export default function ProgressTab() {
  return (
    <ComingSoonTab
      title="Progress tracking"
      description="Log sessions, track distance, stroke rate, and RPE over time."
      details={[
        "Session logging",
        "Performance metrics",
        "Coach progress reviews",
      ]}
    />
  );
}
