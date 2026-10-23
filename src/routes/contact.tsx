import { createFileRoute } from "@tanstack/react-router";
import { Contact, PageShell } from "@/homzy/Site.jsx";
import { pageHead } from "@/homzy/pageHead";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead(
      "Contact Us",
      "Send a business enquiry to HOMZY SERVICES PRIVATE LIMITED or book a facility service for your home, society or workplace.",
    ),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell>
      <Contact />
    </PageShell>
  );
}
