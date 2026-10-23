import { useState } from "react";
import { Icon, Img, Modal, Confirm, Field, ImageField, Toggle } from "../ui.jsx";
import { useStore, patchItem, removeItem, saveItem } from "../store.js";
import { PageHeader, Empty, useFlash } from "./Shell.jsx";

/**
 * Generic add / edit / publish / delete manager for simple content lists
 * (industries, testimonials, gallery). `fields` describes the form.
 */
function ItemForm({ fields, initial, onSave, onCancel }) {
  const [f, setF] = useState(initial);
  const [err, setErr] = useState({});
  function submit(e) {
    e.preventDefault();
    const er = {};
    fields.forEach((fd) => { if (fd.required && !String(f[fd.key] || "").trim()) er[fd.key] = `${fd.label} is required.`; });
    setErr(er);
    if (!Object.keys(er).length) onSave(f);
  }
  return (
    <form onSubmit={submit} noValidate className="grid gap-4">
      {fields.map((fd) => (
        fd.type === "image"
          ? <div key={fd.key}><span className="mb-1 block text-sm font-medium text-navy">{fd.label}</span><ImageField value={f[fd.key] || ""} onChange={(v) => setF({ ...f, [fd.key]: v })} /></div>
          : <Field key={fd.key} label={fd.label} required={fd.required} error={err[fd.key]}>
              {fd.type === "textarea"
                ? <textarea className="field" rows={4} value={f[fd.key] || ""} onChange={(e) => setF({ ...f, [fd.key]: e.target.value })} placeholder={fd.placeholder} />
                : <input className="field" list={fd.options ? `${fd.key}-opts` : undefined} value={f[fd.key] || ""} onChange={(e) => setF({ ...f, [fd.key]: e.target.value })} placeholder={fd.placeholder} />}
              {fd.options && <datalist id={`${fd.key}-opts`}>{fd.options.map((o) => <option key={o} value={o} />)}</datalist>}
            </Field>
      ))}
      <label className="flex items-center gap-3 text-sm"><Toggle checked={f.published !== false} onChange={(v) => setF({ ...f, published: v })} label="Published" />Show on public website</label>
      <div className="flex justify-end gap-2">
        <button type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>
        <button className="btn btn-primary">{initial.id ? "Save changes" : "Add"}</button>
      </div>
    </form>
  );
}

export default function Collection({ storeKey, prefix, title, text, noun, fields, blank, subtitle, body, hasImage = true }) {
  const items = useStore(storeKey);
  const [edit, setEdit] = useState(null);
  const [del, setDel] = useState(null);
  const [flashNode, flash] = useFlash();
  const label = (x) => x.title || x.name;

  return (
    <>
      <PageHeader title={title} text={text}>
        <button className="btn btn-primary btn-sm" onClick={() => setEdit(blank)}><Icon name="plus" className="h-4 w-4" />Add {noun}</button>
      </PageHeader>
      {items.length === 0 ? (
        <div className="card"><Empty icon={hasImage ? "image" : "star"} title={`No ${noun}s yet`} text={`Add a ${noun} to show it on the website.`}><button className="btn btn-primary btn-sm" onClick={() => setEdit(blank)}>Add {noun}</button></Empty></div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((x) => {
            const pub = x.published !== false;
            return (
              <article key={x.id} className={`card flex flex-col overflow-hidden ${pub ? "" : "opacity-70"}`}>
                {hasImage && <Img src={x.image} alt={label(x)} className="aspect-[16/10]" />}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0"><h3 className="font-bold text-navy">{label(x)}</h3>{subtitle && <p className="text-xs font-semibold text-primary">{subtitle(x)}</p>}</div>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${pub ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>{pub ? "Published" : "Hidden"}</span>
                  </div>
                  {body && <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{body(x)}</p>}
                  <div className="mt-auto flex items-center gap-2 pt-4">
                    <Toggle checked={pub} label={`Publish ${label(x)}`} onChange={(v) => { patchItem(storeKey, x.id, { published: v }); flash(v ? "Published" : "Hidden from website"); }} />
                    <button className="btn btn-outline btn-sm ml-auto" onClick={() => setEdit(x)}><Icon name="edit" className="h-4 w-4" />Edit</button>
                    <button className="rounded p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive" aria-label={`Delete ${label(x)}`} onClick={() => setDel(x)}><Icon name="trash" className="h-4 w-4" /></button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
      <Modal open={!!edit} onClose={() => setEdit(null)} title={edit?.id ? `Edit ${noun}` : `Add ${noun}`} wide>
        {edit && <ItemForm key={edit.id || "new"} fields={fields} initial={edit} onCancel={() => setEdit(null)}
          onSave={(item) => { saveItem(storeKey, item, prefix); setEdit(null); flash(item.id ? "Changes saved" : `${noun[0].toUpperCase()}${noun.slice(1)} added`); }} />}
      </Modal>
      <Confirm open={!!del} onClose={() => setDel(null)} title={`Delete ${noun}?`} text={del ? `“${label(del)}” will be permanently removed.` : ""}
        onConfirm={() => { removeItem(storeKey, del.id); flash("Deleted"); }} />
      {flashNode}
    </>
  );
}
