import { useMemo, useState } from "react";
import { Icon, Modal, StatusBadge, fmtDate } from "../ui.jsx";
import { useStore, customersFrom } from "../store.js";
import { PageHeader, Empty, th, td } from "./Shell.jsx";

export default function Customers() {
  const bookings = useStore("bookings");
  const customers = useMemo(() => customersFrom(bookings).sort((a, b) => b.latest.createdAt.localeCompare(a.latest.createdAt)), [bookings]);
  const [q, setQ] = useState("");
  const [view, setView] = useState(null);
  const s = q.trim().toLowerCase();
  const list = customers.filter((c) => !s || c.name.toLowerCase().includes(s) || c.phone.includes(s) || (c.email || "").toLowerCase().includes(s));
  const current = view && customers.find((c) => c.key === view);

  return (
    <>
      <PageHeader title="Customers" text="Built from bookings — repeat bookings from the same mobile number are grouped into one customer." />
      <div className="card mb-4 p-4"><input className="field" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, phone or email" aria-label="Search customers" /></div>
      <div className="card overflow-hidden">
        {list.length === 0 ? <Empty icon="users" title={customers.length ? "No customers match" : "No customers yet"} text="Customers appear here after their first booking." /> : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead className="bg-muted"><tr>{["Customer", "Contact", "Bookings", "Latest service", "Last booked", ""].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-border">
                {list.map((c) => (
                  <tr key={c.key} className="hover:bg-muted/60">
                    <td className={td}><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">{c.name.replace("Sample: ", "").slice(0, 2).toUpperCase()}</span><span className="font-semibold text-navy">{c.name}</span></div></td>
                    <td className={td}><p>{c.phone}</p><p className="text-xs text-muted-foreground">{c.email || "No email"}</p></td>
                    <td className={td}><span className="rounded-full bg-navy px-2.5 py-0.5 text-xs font-bold text-secondary-foreground">{c.bookings.length}</span></td>
                    <td className={td}>{c.latest.service}</td>
                    <td className={`${td} whitespace-nowrap`}>{fmtDate(c.latest.createdAt)}</td>
                    <td className={`${td} text-right`}><button className="btn btn-outline btn-sm" onClick={() => setView(c.key)}><Icon name="eye" className="h-4 w-4" />History</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Modal open={!!current} onClose={() => setView(null)} title={current ? current.name : ""} wide>
        {current && <>
          <p className="text-sm text-muted-foreground">{current.phone}{current.email ? ` · ${current.email}` : ""} · {current.bookings.length} booking{current.bookings.length > 1 ? "s" : ""}</p>
          <ul className="mt-4 divide-y divide-border rounded-md border border-border">
            {[...current.bookings].reverse().map((b) => (
              <li key={b.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm">
                <div><p className="font-semibold text-navy">{b.service}</p><p className="text-xs text-muted-foreground"><span className="font-mono">{b.id}</span> · {b.city} · preferred {fmtDate(b.date)}</p></div>
                <StatusBadge status={b.status} />
              </li>
            ))}
          </ul>
        </>}
      </Modal>
    </>
  );
}
