import { createFileRoute } from "@tanstack/react-router";
import AdminLogin from "@/homzy/admin/Login.jsx";
import { adminHead } from "@/homzy/admin/head";

export const Route = createFileRoute("/admin/login")({
  head: () => adminHead("Admin Login", "Sign in to the HOMZY demo admin panel."),
  component: AdminLogin,
});
