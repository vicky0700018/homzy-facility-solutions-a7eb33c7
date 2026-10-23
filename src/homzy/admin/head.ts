export function adminHead(title: string, description: string) {
  const full = `${title} — HOMZY Admin`;
  return {
    meta: [
      { title: full },
      { name: "description", content: description },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  };
}
