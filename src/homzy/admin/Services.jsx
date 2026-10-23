import { useState } from "react";
import { Icon, Img, Modal, Confirm, Field, ImageField, Toggle } from "../ui.jsx";
import { useStore, CATEGORIES, patchItem, removeItem, saveItem } from "../store.js";
import { PageHeader, Empty, useFlash, th, td } from "./Shell.jsx";

const BLANK = { title: "", category: CATEGORIES[0], description: "", benefits: [], price: "Request a Quote", image: "", published: true };

function ServiceForm({ initial, onDone }) {
  const [f, setF] = useState({ ...initial, benefitsText: (initial.benefits || []).join("\n") });
  const [err, setErr] = useState({});
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  function submit(e) {
    e.preventDefault();
    const er = {};
    if (f.title.trim().length < 3) er.title = "Enter a service title.";
    if (f.description.trim().length < 10) er.description = "Write at least 10 characters.";
    setErr(er);
    if (Object.keys(er).length) return;
    const { benefitsText, ...rest } = f;
    saveItem("services", { ...rest, title: f.title.trim(), description: f.description.trim(), price: f.price.trim() || "Request a Quote", benefits: benefitsText.split("\n").map((s) => s.trim()).filter(Boolean) }, "svc");
    onDone(initial.id ? "Service updated" : "Service added");
  }
  return (
    <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
      <Field label="Service title" required error={err.title} className="sm:col-span-2"><input className="field" value={f.title} onChange={set("title")} placeholder="e.g. Façade Cleaning" /></Field>
      <Field label="Category"><select className="field" value={f.category} onChange={set("category")}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></Field>
      <Field label="Display price text"><input className="field" value={f.price} onChange={set("price")} placeholder="Request a Quote" /></Field>
      <Field label="Description" required error={err.description} className="sm:col-span-2"><textarea className="field" rows={3} value={f.description} onChange={set("description")} /></Field>
      <Field label="Key benefits (one per line)" className="sm:col-span-2"><textarea className="field" rows={3} value={f.benefitsText} onChange={set("benefitsText")} placeholder={"Trained staff\nScheduled visits"} /></Field>
      <div className="sm:col-span-2"><span className="mb-1 block text-sm font-medium text-navy">Image</span><ImageField value={f.image} onChange={(image) => setF({ ...f, image })} /></div>
      <label className="flex items-center gap-3 text-sm sm:col-span-2"><Toggle checked={f.published} onChange={(published) => setF({ ...f, published })} label="Published" />Show on public website</label>
      <div className="flex justify-end gap-2 sm:col-span-2">
        <button type="button" className="btn btn-outline" onClick={() => onDone()}>Cancel</button>
        <button className="btn btn-primary">{initial.id ? "Save changes" : "Add service"}</button>
      </div>
    </form>
  );
}

export default function Services() {
  const services = useStore("services");
  const [edit, setEdit] = useState(null);
  const [del, setDel] = useState(null);
  const [flashNode, flash] = useFlash();
  const done = (msg) => { setEdit(null); if (msg) flash(msg); };

  return (
    <>
      <PageHeader title="Services" text={`${services.filter((s) => s.published).length} published of ${services.length}. Changes show on the website straight away.`}>
        <button className="btn btn-primary btn-sm" onClick={() => setEdit(BLANK)}><Icon name="plus" className="h-4 w-4" />Add service</button>
      </PageHeader>
      <div className="card overflow-hidden">
        {services.length === 0 ? <Empty icon="layers" title="No services" text="Add your first service to show it on the website."><button className="btn btn-primary btn-sm" onClick={() => setEdit(BLANK)}>Add service</button></Empty> : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead className="bg-muted"><tr>{["Service", "Category", "Price text", "Published", ""].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-border">
                {services.map((s) => (
                  <tr key={s.id} className="hover:bg-muted/60">
                    <td className={td}>
                      <div className="flex items-center gap-3">
                        <Img src={s.image} alt={s.title} className="h-12 w-16 shrink-0 rounded" />
                        <div className="min-w-0"><p className="font-semibold text-navy">{s.title}</p><p className="max-w-sm truncate text-xs text-muted-foreground">{s.description}</p></div>
                      </div>
                    </td>
                    <td className={td}>{s.category}</td>
                    <td className={td}>{s.price}</td>
                    <td className={td}><Toggle checked={s.published} label={`Publish ${s.title}`} onChange={(v) => { patchItem("services", s.id, { published: v }); flash(v ? "Service published" : "Service hidden"); }} /></td>
                    <td className={`${td} whitespace-nowrap text-right`}>
                      <button className="btn btn-outline btn-sm" onClick={() => setEdit(s)}><Icon name="edit" className="h-4 w-4" />Edit</button>
                      <button className="ml-1 rounded p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive" aria-label={`Delete ${s.title}`} onClick={() => setDel(s)}><Icon name="trash" className="h-4 w-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Modal open={!!edit} onClose={() => setEdit(null)} title={edit?.id ? "Edit service" : "Add service"} wide>
        {edit && <ServiceForm key={edit.id || "new"} initial={edit} onDone={done} />}
      </Modal>
      <Confirm open={!!del} onClose={() => setDel(null)} title="Delete service?" text={del ? `“${del.title}” will be removed from the website. Existing bookings are kept.` : ""}
        onConfirm={() => { removeItem("services", del.id); flash("Service deleted"); }} />
      {flashNode}
    </>
  );
}
