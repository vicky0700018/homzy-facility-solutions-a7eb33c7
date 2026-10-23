import { createFileRoute } from "@tanstack/react-router";
import Site, { About, Testimonials, Why } from "@/homzy/Site.jsx";

export const Route = createFileRoute("/about")({
  head: () =>
    // eslint-disable-next-line prettier/prettier
    ({ meta: pageHeadMeta("About Us", "HOMZY SERVICES PRIVATE LIMITED keeps homes, workplaces and commercial spaces clean, safe and efficient with integrated facility management.") }),
  component: AboutPage,
});

import { pageHeadMeta } from "@/homzy/pageHead";

function AboutPage() {
  return (
    <Site.PageShell>
      <About />
      <Why />
      <Testimonials />
    </Site.PageShell>
  );
}
