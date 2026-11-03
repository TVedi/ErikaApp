import { getSiteUrl } from "@/lib/seo/site-url";

/**
 * Erika's picture for the signature band at the bottom of the email: the
 * portrait from the share image (the Facebook / Messenger link preview), and
 * the gold EM monogram. The "-v1" in the names lets new pictures be published
 * under new names later, because email apps keep old images cached.
 */
export const EMAIL_PORTRAIT_PATH = "/email/erika-portrait-v1.jpg";
export const EMAIL_MONOGRAM_PATH = "/email/em-monogram-v1.png";

const CANVAS = "#031714";
const GOLD = "#d8b96a";
const CREAM = "#f7f1e6";
const CREAM_MUTED = "#cfc8bb";
const PAGE = "#f3efe7";
const TEXT = "#1f2a27";
const MUTED = "#6b706d";
const SANS = "Arial, Helvetica, sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type ConfirmationHtmlInput = {
  greeting: string;
  paragraphs: readonly string[];
  /** Name in the signature band. */
  signOff: string;
  /** Lines under the name, e.g. "Olympian & 8× World Champion", "Sprint Kayak Coach". */
  titleLines: readonly string[];
  /** Defaults to the live site address. */
  siteUrl?: string;
};

/**
 * The HTML version of a confirmation email: the message first, then a short
 * dark-green signature band with Erika's name and her portrait, as in the
 * share image. The name and titles are real text, so they still show when an
 * email app blocks images; the plain-text version is sent alongside.
 */
export function confirmationHtml({
  greeting,
  paragraphs,
  signOff,
  titleLines,
  siteUrl = getSiteUrl(),
}: ConfirmationHtmlInput): string {
  const portraitUrl = `${siteUrl}${EMAIL_PORTRAIT_PATH}`;
  const monogramUrl = `${siteUrl}${EMAIL_MONOGRAM_PATH}`;
  const siteLabel = new URL(siteUrl).host.replace(/^www\./, "");
  const text = [greeting, ...paragraphs]
    .map(
      (paragraph) =>
        `<p style="margin:0 0 16px;font-family:${SANS};font-size:16px;line-height:1.6;color:${TEXT};">${escapeHtml(paragraph)}</p>`
    )
    .join("\n");
  const titles = titleLines.map(escapeHtml).join("<br>");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${escapeHtml(signOff)}</title>
<style>
@media (max-width: 480px) {
  .em-sig-text { padding: 12px 6px 12px 20px !important; }
  .em-sig-name { font-size: 17px !important; }
  .em-portrait { width: 150px !important; height: 158px !important; }
  .em-portrait-cell { width: 150px !important; }
}
</style>
</head>
<body style="margin:0;padding:0;background:${PAGE};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${PAGE};">
<tr>
<td align="center" style="padding:24px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;">
<tr>
<td style="padding:32px 32px 16px;">
${text}
</td>
</tr>
<tr>
<td style="padding:0;background:${CANVAS};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${CANVAS};">
<tr>
<td class="em-sig-text" valign="middle" style="padding:16px 8px 16px 28px;">
<img src="${monogramUrl}" width="44" height="32" alt="" style="display:block;width:44px;height:32px;border:0;">
<p class="em-sig-name" style="margin:12px 0 0;font-family:${SERIF};font-size:19px;line-height:1.25;color:${CREAM};">${escapeHtml(signOff)}</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;"><tr><td style="width:36px;height:2px;background:${GOLD};font-size:0;line-height:0;">&nbsp;</td></tr></table>
<p style="margin:10px 0 0;font-family:${SANS};font-size:13px;line-height:1.45;color:${CREAM_MUTED};">${titles}</p>
</td>
<td class="em-portrait-cell" width="180" valign="bottom" style="padding:0;width:180px;">
<img class="em-portrait" src="${portraitUrl}" width="180" height="190" alt="${escapeHtml(signOff)}" style="display:block;width:180px;height:190px;border:0;color:${CREAM};font-family:${SANS};font-size:12px;">
</td>
</tr>
</table>
</td>
</tr>
</table>
<p style="margin:16px 0 0;font-family:${SANS};font-size:12px;line-height:1.4;color:${MUTED};"><a href="${siteUrl}" style="color:${MUTED};text-decoration:underline;">${escapeHtml(siteLabel)}</a></p>
</td>
</tr>
</table>
</body>
</html>
`;
}
