import { createFileRoute } from "@tanstack/react-router";
import Settings from "@/homzy/admin/Settings.jsx";
import { adminHead } from "@/homzy/admin/head";

export const Route = createFileRoute("/admin/_panel/settings")({
  head: () => adminHead("Settings", "HOMZY demo admin settings and data tools."),
  component: Settings,
});
