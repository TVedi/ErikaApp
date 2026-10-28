import { ImageResponse } from "next/og";
import {
  BRAND_CANVAS,
  BRAND_GOLD,
  BRAND_MARK_PATH,
  BRAND_MARK_VIEWBOX,
} from "@/lib/brand/brand-mark-path";

/** Browser-tab icon: the gold FM monogram on the site's dark green. */
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 14,
        }}
      >
        <svg width="52" height="37" viewBox={BRAND_MARK_VIEWBOX}>
          <path fill={BRAND_GOLD} fillRule="evenodd" d={BRAND_MARK_PATH} />
        </svg>
      </div>
    ),
    { ...size }
  );
}
