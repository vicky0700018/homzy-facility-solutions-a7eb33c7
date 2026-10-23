import { createFileRoute } from "@tanstack/react-router";
import { GalleryAdmin } from "@/homzy/admin/Lists.jsx";
import { adminHead } from "@/homzy/admin/head";

export const Route = createFileRoute("/admin/_panel/gallery")({
  head: () => adminHead("Gallery / Projects", "Manage HOMZY gallery and project images."),
  component: GalleryAdmin,
});
