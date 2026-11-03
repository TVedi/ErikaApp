import { describe, expect, it } from "vitest";
import {
  EMAIL_MONOGRAM_PATH,
  EMAIL_PORTRAIT_PATH,
  confirmationHtml,
  escapeHtml,
} from "@/lib/email/confirmation-html";

const base = {
  greeting: "Hi Anna,",
  paragraphs: ["First paragraph.", "Second paragraph."],
  signOff: "Erika Medveczky OLY",
  titleLines: ["Olympian & 8× World Champion", "Sprint Kayak Coach"],
  siteUrl: "https://www.medveczkyperformance.com",
};

describe("confirmation email HTML", () => {
  it("shows Erika's portrait and monogram from the live site", () => {
    const html = confirmationHtml(base);
    expect(html).toContain(
      `src="https://www.medveczkyperformance.com${EMAIL_PORTRAIT_PATH}"`
    );
    expect(html).toContain(
      `src="https://www.medveczkyperformance.com${EMAIL_MONOGRAM_PATH}"`
    );
  });

  it("puts the message before the signature band", () => {
    const html = confirmationHtml(base);
    for (const part of [
      "Hi Anna,",
      "First paragraph.",
      "Second paragraph.",
      "Erika Medveczky OLY",
      "Olympian &amp; 8× World Champion<br>Sprint Kayak Coach",
      "medveczkyperformance.com</a>",
    ]) {
      expect(html).toContain(part);
    }
    expect(html.indexOf("Second paragraph.")).toBeLessThan(html.indexOf(EMAIL_PORTRAIT_PATH));
  });

  it("escapes names typed into the forms", () => {
    const html = confirmationHtml({ ...base, greeting: 'Hi <b>"Tom" & Co</b>,' });
    expect(html).toContain("Hi &lt;b&gt;&quot;Tom&quot; &amp; Co&lt;/b&gt;,");
    expect(html).not.toContain("<b>");
    expect(escapeHtml("O'Neil")).toBe("O&#39;Neil");
  });
});
