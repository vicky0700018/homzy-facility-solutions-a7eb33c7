import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "@/homzy/admin/Dashboard.jsx";
import { adminHead } from "@/homzy/admin/head";

export const Route = createFileRoute("/admin/_panel/dashboard")({
  head: () => adminHead("Dashboard", "Live overview of HOMZY demo bookings and enquiries."),
  component: Dashboard,
});
