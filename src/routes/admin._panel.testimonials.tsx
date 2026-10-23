import { createFileRoute } from "@tanstack/react-router";
import { TestimonialsAdmin } from "@/homzy/admin/Lists.jsx";
import { adminHead } from "@/homzy/admin/head";

export const Route = createFileRoute("/admin/_panel/testimonials")({
  head: () => adminHead("Testimonials", "Add, edit and publish HOMZY demo testimonials."),
  component: TestimonialsAdmin,
});
