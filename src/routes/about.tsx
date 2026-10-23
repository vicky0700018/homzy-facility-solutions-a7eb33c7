import { createFileRoute } from "@tanstack/react-router";
import { About, PageShell, Testimonials, Why } from "@/homzy/Site.jsx";
import { pageHead } from "@/homzy/pageHead";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead(
      "About Us",
      "HOMZY SERVICES PRIVATE LIMITED keeps homes, workplaces and commercial spaces clean, safe and efficient with integrated facility management.",
    ),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <About />
      <Why />
      <Testimonials />
    </PageShell>
  );
}
