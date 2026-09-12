import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PulseIQ Operations",
    short_name: "PulseIQ",
    description: "Operational profit intelligence for growing service businesses.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4efe7",
    theme_color: "#101010",
    icons: [{ src: "/pulseiq-solutions-icon.png", sizes: "512x512", type: "image/png", purpose: "any" }],
    categories: ["business", "productivity", "finance"],
  };
}
