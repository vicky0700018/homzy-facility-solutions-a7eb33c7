import { useState } from "react";
import { Icon, Modal, Confirm, fmtDate, fmtDateTime } from "../ui.jsx";
import { useStore, removeItem, toCSV, downloadFile } from "../store.js";
import { PageHeader, Empty, useFlash, th, td } from "./Shell.jsx";

export default function Enquiries() {
  const enquiries = useStore("enquiries");
  const [q, setQ] = useState("");
  const [view, setView] = useState(null);
  const [del, setDel] = useState(null);
  const [flashNode, flash] = useFlash();
  const s = q.trim().toLowerCase();
  const list = [...enquiries]
    .filter((e) => !s || [e.id, e.name, e.email, e.phone, e.subject].some((v) => String(v || "").toLowerCase().includes(s)))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <>
      <PageHeader title="Contact Enquiries" text={`${enquiries.length} enquiries from the website contact form.`}>
        <button className="btn btn-primary btn-sm" disabled={!list.length} onClick={() => downloadFile(toCSV(list, ["id", "name", "email", "phone", "subject", "message", "createdAt"]), "homzy-enquiries.csv")}><Icon name="download" className="h-4 w-4" />Export CSV</button>
      </PageHeader>
      <div className="card mb-4 p-4"><input className="field" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search ID, name, email, phone or subject" aria-label="Search enquiries" /></div>
      <div className="card overflow-hidden">
        {list.length === 0 ? <Empty icon="inbox" title={enquiries.length ? "No enquiries match" : "No enquiries yet"} text="Messages sent from the Contact section will appear here." /> : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-sm">
              <thead className="bg-muted"><tr>{["Enquiry ID", "Name", "Contact", "Subject", "Received", ""].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-border">
                {list.map((e) => (
                  <tr key={e.id} className="hover:bg-muted/60">
                    <td className={`${td} font-mono text-xs font-semibold text-navy`}>{e.id}</td>
                    <td className={`${td} font-medium`}>{e.name}</td>
                    <td className={td}><p>{e.email}</p><p className="text-xs text-muted-foreground">{e.phone || "—"}</p></td>
                    <td className={td}><p className="max-w-xs truncate">{e.subject || e.message}</p></td>
                    <td className={`${td} whitespace-nowrap`}>{fmtDate(e.createdAt)}</td>
                    <td className={`${td} whitespace-nowrap text-right`}>
                      <button className="btn btn-outline btn-sm" onClick={() => setView(e)}><Icon name="eye" className="h-4 w-4" />View</button>
                      <button className="ml-1 rounded p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive" aria-label={`Delete ${e.id}`} onClick={() => setDel(e)}><Icon name="trash" className="h-4 w-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Modal open={!!view} onClose={() => setView(null)} title={view ? `Enquiry ${view.id}` : ""}>
        {view && <>
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            {[["Name", view.name], ["Email", view.email], ["Phone", view.phone || "—"], ["Received", fmtDateTime(view.createdAt)], ["Subject", view.subject || "—"]].map(([k, v]) => (
              <div key={k}><dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{k}</dt><dd className="mt-0.5">{v}</dd></div>
            ))}
          </dl>
          <div className="mt-4 whitespace-pre-wrap rounded-md bg-muted p-4 text-sm">{view.message}</div>
          <div className="mt-5 flex justify-end"><button className="btn btn-outline" onClick={() => setView(null)}>Close</button></div>
        </>}
      </Modal>
      <Confirm open={!!del} onClose={() => setDel(null)} title="Delete enquiry?" text={del ? `Enquiry ${del.id} from ${del.name} will be removed.` : ""}
        onConfirm={() => { removeItem("enquiries", del.id); flash("Enquiry deleted"); }} />
      {flashNode}
    </>
  );
}
