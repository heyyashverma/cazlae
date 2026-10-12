import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION } from "./site";

// Icons: the lowercase c from the wordmark master, Ivory on Estate Green.
// Source: Figma "Cazlae — Website", page "Favicon — v1 2026-10-12".
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "cazlae",
    short_name: "cazlae",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "browser",
    background_color: "#F5F0E8",
    theme_color: "#F5F0E8",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
