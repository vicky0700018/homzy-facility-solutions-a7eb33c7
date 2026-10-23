import { createFileRoute } from "@tanstack/react-router";
import { Industries, PageShell } from "@/homzy/Site.jsx";
import { pageHead } from "@/homzy/pageHead";

export const Route = createFileRoute("/industries")({
  head: () =>
    pageHead(
      "Industries We Serve",
      "Facility management support for residential societies, corporate offices, retail, education, healthcare, industrial and hospitality properties.",
    ),
  component: IndustriesPage,
});

function IndustriesPage() {
  return (
    <PageShell>
      <Industries />
    </PageShell>
  );
}
