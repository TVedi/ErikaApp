import { ComingSoonTab } from "../../components/coming-soon-tab";
import { videoAnalysis } from "../../content/copy";

export default function VideosTab() {
  return (
    <ComingSoonTab
      title="Video review"
      description={videoAnalysis.body}
      details={[
        "Upload paddling footage",
        "Coach-written feedback",
        "Timecoded comments",
      ]}
    />
  );
}
