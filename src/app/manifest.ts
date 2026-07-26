import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "PAIO Stats",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#0f0f0f",
    icons: [
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { src: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { src: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { src: "/paio-logo.png", sizes: "612x408", type: "image/png", purpose: "any" },
    ],
  };
}
