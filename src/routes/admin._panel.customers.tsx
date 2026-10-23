import { createFileRoute } from "@tanstack/react-router";
import Customers from "@/homzy/admin/Customers.jsx";
import { adminHead } from "@/homzy/admin/head";

export const Route = createFileRoute("/admin/_panel/customers")({
  head: () => adminHead("Customers", "HOMZY customers and their booking history."),
  component: Customers,
});
