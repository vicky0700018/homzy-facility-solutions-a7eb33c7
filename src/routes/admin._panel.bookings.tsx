import { createFileRoute } from "@tanstack/react-router";
import Bookings from "@/homzy/admin/Bookings.jsx";
import { adminHead } from "@/homzy/admin/head";

export const Route = createFileRoute("/admin/_panel/bookings")({
  head: () => adminHead("Bookings", "Search, filter, update and export HOMZY demo bookings."),
  component: Bookings,
});
