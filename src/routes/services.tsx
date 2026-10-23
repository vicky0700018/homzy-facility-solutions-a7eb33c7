import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Services } from "@/homzy/Site.jsx";
import { pageHead } from "@/homzy/pageHead";

export const Route = createFileRoute("/services")({
  head: () =>
    pageHead(
      "Our Services",
      "Housekeeping, deep cleaning, office cleaning, maintenance, facility management and support services for homes, societies and commercial properties.",
    ),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <PageShell>
      <Services />
    </PageShell>
  );
}
