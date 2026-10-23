import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Icon, Field } from "../ui.jsx";
import { useStore, setContent, DEFAULT_CONTENT } from "../store.js";
import { PageHeader, useFlash } from "./Shell.jsx";

const GROUPS = [
  ["Top banner", [["heroTitle", "Main heading"], ["heroText", "Supporting text", true]]],
  ["About Us", [["about", "About Us text", true]]],
  ["Services section", [["servicesHeading", "Services heading"]]],
  ["Contact details", [["address", "Address"], ["phone", "Phone"], ["email", "Email"]]],
  ["Footer", [["footer", "Footer introduction", true]]],
];

export default function Content() {
  const content = useStore("content");
  const [f, setF] = useState(content);
  const [flashNode, flash] = useFlash();
  const dirty = JSON.stringify(f) !== JSON.stringify(content);

  function save(e) {
    e.preventDefault();
    if (!f.heroTitle.trim()) { flash("Main heading cannot be empty"); return; }
    setContent(f); flash("Website content saved");
  }

  return (
    <form onSubmit={save}>
      <PageHeader title="Website Content" text="Edit the text shown on the public website. Saved changes appear immediately.">
        <button type="button" className="btn btn-outline btn-sm" onClick={() => setF(DEFAULT_CONTENT)}>Restore defaults</button>
        <button className="btn btn-primary btn-sm" disabled={!dirty}>Save changes</button>
      </PageHeader>
      <div className="grid gap-5 lg:grid-cols-2">
        {GROUPS.map(([g, fields]) => (
          <section key={g} className="card p-5">
            <h2 className="font-bold text-navy">{g}</h2>
            <div className="mt-4 space-y-4">
              {fields.map(([k, label, long]) => (
                <Field key={k} label={label}>
                  {long
                    ? <textarea className="field" rows={4} value={f[k] || ""} onChange={(e) => setF({ ...f, [k]: e.target.value })} />
                    : <input className="field" value={f[k] || ""} onChange={(e) => setF({ ...f, [k]: e.target.value })} />}
                </Field>
              ))}
            </div>
            {g === "Contact details" && <p className="mt-3 text-xs text-muted-foreground">Real contact details have not been provided yet — replace the placeholders when available.</p>}
          </section>
        ))}
        <section className="card p-5">
          <h2 className="font-bold text-navy">Testimonials & gallery</h2>
          <p className="mt-2 text-sm text-muted-foreground">These are managed on their own pages.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link to="/admin/testimonials" className="btn btn-outline btn-sm"><Icon name="star" className="h-4 w-4" />Testimonials</Link>
            <Link to="/admin/gallery" className="btn btn-outline btn-sm"><Icon name="image" className="h-4 w-4" />Gallery</Link>
          </div>
        </section>
      </div>
      {dirty && <div className="sticky bottom-4 mt-6 flex justify-end"><button className="btn btn-primary shadow-lift">Save changes</button></div>}
      {flashNode}
    </form>
  );
}
