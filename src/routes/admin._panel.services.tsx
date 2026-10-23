import { createFileRoute } from "@tanstack/react-router";
import Services from "@/homzy/admin/Services.jsx";
import { adminHead } from "@/homzy/admin/head";

export const Route = createFileRoute("/admin/_panel/services")({
  head: () => adminHead("Services", "Add, edit and publish HOMZY services."),
  component: Services,
});
