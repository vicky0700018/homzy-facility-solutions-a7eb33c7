import { createFileRoute } from "@tanstack/react-router";
import Enquiries from "@/homzy/admin/Enquiries.jsx";
import { adminHead } from "@/homzy/admin/head";

export const Route = createFileRoute("/admin/_panel/enquiries")({
  head: () => adminHead("Contact Enquiries", "Enquiries sent from the HOMZY contact form."),
  component: Enquiries,
});
