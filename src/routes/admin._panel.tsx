import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AdminShell } from "@/homzy/admin/Shell.jsx";

// Pathless layout: sidebar + demo-login guard for every /admin/* page except /admin/login.
export const Route = createFileRoute("/admin/_panel")({
  component: PanelLayout,
});

function PanelLayout() {
  return (
    <AdminShell>
      <Outlet />
    </AdminShell>
  );
}
