import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/site-url";

const PUBLIC_PATHS = [
  "/",
  "/about",
  "/apply",
  "/pricing",
  "/camps",
  "/speaking",
  "/video-course",
  "/privacy",
  "/terms",
  "/refund-policy",
  "/medical-disclaimer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  return PUBLIC_PATHS.map((path) => ({
    url: path === "/" ? siteUrl : `${siteUrl}${path}`,
  }));
}
