import { createFileRoute } from "@tanstack/react-router";
import Content from "@/homzy/admin/Content.jsx";
import { adminHead } from "@/homzy/admin/head";

export const Route = createFileRoute("/admin/_panel/content")({
  head: () => adminHead("Website Content", "Edit HOMZY website text and contact details."),
  component: Content,
});
