import { createFileRoute } from "@tanstack/react-router";
import { IndustriesAdmin } from "@/homzy/admin/Lists.jsx";
import { adminHead } from "@/homzy/admin/head";

export const Route = createFileRoute("/admin/_panel/industries")({
  head: () => adminHead("Industries", "Manage the industries shown on the HOMZY website."),
  component: IndustriesAdmin,
});
