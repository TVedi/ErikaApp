import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import {
  BRAND_CANVAS,
  BRAND_GOLD,
  BRAND_MARK_PATH,
  BRAND_MARK_VIEWBOX,
} from "@/lib/brand/brand-mark-path";

/**
 * Share image (Facebook, WhatsApp, Messenger, LinkedIn, X): Erika's portrait on
 * the right, the gold monogram and her name on the dark green at the left.
 * Generated once at build time from public/egyeni.jpg.
 */
export const alt = "Erika Medveczky OLY - Olympian & 8× World Champion, Sprint Kayak Coach";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "public/egyeni.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: BRAND_CANVAS,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          alt=""
          width={945}
          height={630}
          style={{ position: "absolute", top: 0, right: -120, width: 945, height: 630 }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            background:
              "linear-gradient(90deg, #031714 0%, #031714 34%, rgba(3,23,20,0.82) 46%, rgba(3,23,20,0.25) 62%, rgba(3,23,20,0) 74%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            paddingLeft: 72,
            width: 680,
          }}
        >
          <svg width="96" height="69" viewBox={BRAND_MARK_VIEWBOX}>
            <path fill={BRAND_GOLD} fillRule="evenodd" d={BRAND_MARK_PATH} />
          </svg>
          <div
            style={{
              display: "flex",
              marginTop: 36,
              fontSize: 54,
              lineHeight: 1.1,
              color: "#f7f1e6",
            }}
          >
            Erika Medveczky OLY
          </div>
          <div
            style={{
              display: "flex",
              width: 64,
              height: 3,
              marginTop: 26,
              background: BRAND_GOLD,
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 28,
              lineHeight: 1.35,
              color: "rgba(247,241,230,0.82)",
            }}
          >
            Olympian & 8× World Champion
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              lineHeight: 1.35,
              color: "rgba(247,241,230,0.82)",
            }}
          >
            Sprint Kayak Coach
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
