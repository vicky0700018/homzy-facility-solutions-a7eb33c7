import { useMemo, useState, useEffect } from "react";
import { Icon, Modal, Confirm, StatusBadge, fmtDate, fmtDateTime } from "../ui.jsx";
import { useStore, STATUSES, CATEGORIES, patchItem, removeItem, toCSV, downloadFile } from "../store.js";
import { PageHeader, Empty, useFlash, th, td } from "./Shell.jsx";

function Detail({ id, onClose, flash }) {
  const b = useStore("bookings").find((x) => x.id === id);
  const [notes, setNotes] = useState("");
  useEffect(() => { setNotes(b?.notes || ""); }, [id]);
  if (!b) return null;
  const rows = [
    ["Customer", b.name], ["Mobile", b.phone], ["Email", b.email || "—"], ["Company / Society", b.company || "—"],
    ["Property type", b.propertyType], ["Category", b.category], ["Service", b.service], ["City", b.city],
    ["Address", b.address], ["Preferred date", fmtDate(b.date)], ["Time slot", b.time], ["Frequency", b.frequency],
    ["Property size", b.size || "—"], ["Staff required", b.staff || "—"], ["Contact via", b.contactMethod], ["Submitted", fmtDateTime(b.createdAt)],
  ];
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-lg font-bold text-navy">{b.id}</p>
        <div className="flex items-center gap-2">{b.sample && <span className="rounded bg-gold/20 px-2 py-0.5 text-xs font-semibold text-navy">Sample</span>}<StatusBadge status={b.status} /></div>
      </div>
      <dl className="mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
        {rows.map(([k, v]) => <div key={k}><dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{k}</dt><dd className="mt-0.5 text-foreground">{v}</dd></div>)}
      </dl>
      {b.requirements && <div className="mt-4 rounded-md bg-muted p-3 text-sm"><p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Additional requirements</p><p className="mt-1">{b.requirements}</p></div>}
      <div className="mt-6 border-t border-border pt-5">
        <p className="text-sm font-semibold text-navy">Update status</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button key={s} onClick={() => { patchItem("bookings", b.id, { status: s }); flash(`Status set to ${s}`); }}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${b.status === s ? "border-navy bg-navy text-secondary-foreground" : "border-border text-navy hover:border-primary"}`}>{s}</button>
          ))}
        </div>
        <label className="mt-5 block">
          <span className="text-sm font-semibold text-navy">Internal admin notes</span>
          <textarea className="field mt-2" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Visible to admins only" />
        </label>
        <div className="mt-3 flex justify-end gap-2">
          <button className="btn btn-outline" onClick={onClose}>Close</button>
          <button className="btn btn-primary" disabled={notes === (b.notes || "")} onClick={() => { patchItem("bookings", b.id, { notes }); flash("Notes saved"); }}>Save notes</button>
        </div>
      </div>
    </>
  );
}

export default function Bookings() {
  const bookings = useStore("bookings");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [cat, setCat] = useState("All");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState(null);
  const [del, setDel] = useState(null);
  const [flashNode, flash] = useFlash();

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    const digits = s.replace(/\D/g, "");
    return bookings
      .filter((b) => !s || b.id.toLowerCase().includes(s) || b.name.toLowerCase().includes(s) || (digits && b.phone.replace(/\D/g, "").includes(digits)))
      .filter((b) => status === "All" || b.status === status)
      .filter((b) => cat === "All" || b.category === cat)
      .filter((b) => (!from || b.date >= from) && (!to || b.date <= to))
      .sort((a, b) => (sort === "newest" ? b.createdAt.localeCompare(a.createdAt) : a.createdAt.localeCompare(b.createdAt)));
  }, [bookings, q, status, cat, from, to, sort]);

  const filtered = q || status !== "All" || cat !== "All" || from || to;
  const clear = () => { setQ(""); setStatus("All"); setCat("All"); setFrom(""); setTo(""); };
  const cats = [...new Set([...CATEGORIES, ...bookings.map((b) => b.category)])];

  return (
    <>
      <PageHeader title="Bookings" text={`${bookings.length} total · ${bookings.filter((b) => b.status === "New").length} new`}>
        <button className="btn btn-primary btn-sm" disabled={!list.length} onClick={() => downloadFile(toCSV(list), `homzy-bookings-${new Date().toISOString().slice(0, 10)}.csv`)}>
          <Icon name="download" className="h-4 w-4" />Export CSV{filtered ? " (filtered)" : ""}
        </button>
      </PageHeader>

      <div className="card mb-4 grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-6">
        <input className="field lg:col-span-2" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search booking ID, name or phone" aria-label="Search bookings" />
        <select className="field" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status"><option value="All">All statuses</option>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
        <select className="field" value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Filter by category"><option value="All">All categories</option>{cats.map((c) => <option key={c}>{c}</option>)}</select>
        <select className="field" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort"><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select>
        <div className="flex items-center gap-2 lg:col-span-1">
          {filtered && <button className="btn btn-outline btn-sm w-full" onClick={clear}>Clear filters</button>}
        </div>
        <label className="flex items-center gap-2 text-sm text-muted-foreground sm:col-span-1 lg:col-span-2">From<input type="date" className="field" value={from} onChange={(e) => setFrom(e.target.value)} aria-label="Preferred date from" /></label>
        <label className="flex items-center gap-2 text-sm text-muted-foreground sm:col-span-1 lg:col-span-2">To<input type="date" className="field" value={to} onChange={(e) => setTo(e.target.value)} aria-label="Preferred date to" /></label>
        <p className="self-center text-sm text-muted-foreground lg:col-span-2 lg:text-right">Showing {list.length} of {bookings.length}</p>
      </div>

      <div className="card overflow-hidden">
        {list.length === 0 ? (
          bookings.length === 0
            ? <Empty icon="calendar" title="No bookings yet" text="When a visitor uses “Book a Service” on the website, the booking appears here instantly." />
            : <Empty icon="list" title="No bookings match your filters" text="Try a different search or clear the filters."><button className="btn btn-outline btn-sm" onClick={clear}>Clear filters</button></Empty>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-sm">
              <thead className="bg-muted"><tr>
                {["Booking ID", "Customer", "Phone", "Service", "Property", "City", "Preferred", "Submitted", "Status", ""].map((h) => <th key={h} className={th}>{h}</th>)}
              </tr></thead>
              <tbody className="divide-y divide-border">
                {list.map((b) => (
                  <tr key={b.id} className="hover:bg-muted/60">
                    <td className={`${td} font-mono text-xs font-semibold text-navy`}>{b.id}{b.sample && <span className="ml-1 rounded bg-gold/20 px-1 text-[10px] font-sans text-navy">sample</span>}</td>
                    <td className={`${td} font-medium`}>{b.name}</td>
                    <td className={`${td} whitespace-nowrap`}>{b.phone}</td>
                    <td className={td}><p>{b.service}</p><p className="text-xs text-muted-foreground">{b.category}</p></td>
                    <td className={td}>{b.propertyType}</td>
                    <td className={td}>{b.city}</td>
                    <td className={`${td} whitespace-nowrap`}>{fmtDate(b.date)}</td>
                    <td className={`${td} whitespace-nowrap text-muted-foreground`}>{fmtDate(b.createdAt)}</td>
                    <td className={td}>
                      <select className="field py-1 text-xs" value={b.status} aria-label={`Status for ${b.id}`} onChange={(e) => { patchItem("bookings", b.id, { status: e.target.value }); flash(`${b.id} → ${e.target.value}`); }}>
                        {STATUSES.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className={`${td} whitespace-nowrap text-right`}>
                      <button className="btn btn-outline btn-sm" onClick={() => setView(b.id)}><Icon name="eye" className="h-4 w-4" />View</button>
                      <button className="ml-1 rounded p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive" aria-label={`Delete ${b.id}`} onClick={() => setDel(b)}><Icon name="trash" className="h-4 w-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={!!view} onClose={() => setView(null)} title="Booking details" wide>
        {view && <Detail id={view} onClose={() => setView(null)} flash={flash} />}
      </Modal>
      <Confirm open={!!del} onClose={() => setDel(null)} title="Delete booking?" text={del ? `Booking ${del.id} for ${del.name} will be permanently removed from this browser.` : ""}
        onConfirm={() => { removeItem("bookings", del.id); flash("Booking deleted"); }} />
      {flashNode}
    </>
  );
}
