import { ImageResponse } from "next/og";
import {
  BRAND_CANVAS,
  BRAND_GOLD,
  BRAND_MARK_PATH,
  BRAND_MARK_VIEWBOX,
} from "@/lib/brand/brand-mark-path";

/** Home-screen icon (iPhone / iPad): the gold FM monogram on dark green. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND_CANVAS,
        }}
      >
        <svg width="124" height="89" viewBox={BRAND_MARK_VIEWBOX}>
          <path fill={BRAND_GOLD} fillRule="evenodd" d={BRAND_MARK_PATH} />
        </svg>
      </div>
    ),
    { ...size }
  );
}
