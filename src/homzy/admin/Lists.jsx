import Collection from "./Collection.jsx";
import { useStore } from "../store.js";

export function IndustriesAdmin() {
  return (
    <Collection storeKey="industries" prefix="ind" noun="industry" title="Industries" text="Cards shown in “Industries We Serve” on the website."
      blank={{ title: "", description: "", image: "", published: true }}
      fields={[{ key: "title", label: "Industry name", required: true }, { key: "description", label: "Short description", type: "textarea", required: true }, { key: "image", label: "Image", type: "image" }]}
      body={(x) => x.description} />
  );
}

export function TestimonialsAdmin() {
  return (
    <Collection storeKey="testimonials" prefix="t" noun="testimonial" hasImage={false} title="Testimonials" text="Demo testimonials — use sample names unless you have real, approved reviews."
      blank={{ name: "", role: "", text: "", published: true }}
      fields={[{ key: "name", label: "Customer name", required: true, placeholder: "e.g. Demo Customer D" }, { key: "role", label: "Role / property", placeholder: "e.g. Facility Manager (sample)" }, { key: "text", label: "Testimonial", type: "textarea", required: true }]}
      subtitle={(x) => x.role} body={(x) => `“${x.text}”`} />
  );
}

export function GalleryAdmin() {
  const gallery = useStore("gallery");
  const cats = [...new Set(["Commercial", "Residential", "Housekeeping", "Maintenance", "Outdoor", ...gallery.map((g) => g.category)])];
  return (
    <Collection storeKey="gallery" prefix="g" noun="project" title="Gallery / Projects" text="Images shown in “Our Work”. Categories become the filter buttons on the website."
      blank={{ title: "", category: "Commercial", image: "", published: true }}
      fields={[{ key: "title", label: "Project title", required: true, placeholder: "e.g. Clinic Deep Clean (Sample)" }, { key: "category", label: "Category", required: true, options: cats }, { key: "image", label: "Image", type: "image" }]}
      subtitle={(x) => x.category} />
  );
}
