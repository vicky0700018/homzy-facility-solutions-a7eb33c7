import { createFileRoute } from "@tanstack/react-router";
import Site from "@/homzy/Site.jsx";

const TITLE = "HOMZY Services — Facility Management, Housekeeping & Maintenance";
const DESC =
  "HOMZY SERVICES PRIVATE LIMITED offers integrated facility management, housekeeping, deep cleaning and maintenance for homes, societies and offices. Book a service online.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Site,
});
