import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Work } from "@/homzy/Site.jsx";
import { pageHead } from "@/homzy/pageHead";

export const Route = createFileRoute("/work")({
  head: () =>
    pageHead(
      "Our Work",
      "A gallery of illustrative facility-management projects: commercial interiors, residential upkeep, housekeeping and landscaped outdoor spaces.",
    ),
  component: WorkPage,
});

function WorkPage() {
  return (
    <PageShell>
      <Work />
    </PageShell>
  );
}
