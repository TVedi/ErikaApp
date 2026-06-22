import { ComingSoonTab } from "../../components/coming-soon-tab";
import { plansOverview } from "../../content/copy";

export default function PlansTab() {
  return (
    <ComingSoonTab
      title="Training plans"
      description={plansOverview.subtitle}
      details={plansOverview.tiers.map((t) => t.name)}
    />
  );
}
