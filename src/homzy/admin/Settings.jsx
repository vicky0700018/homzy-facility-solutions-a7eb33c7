import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Icon, Confirm } from "../ui.jsx";
import { useStore, ADMIN, removeSamples, resetAll, getAll, downloadFile, logout } from "../store.js";
import { PageHeader, useFlash } from "./Shell.jsx";

export default function Settings() {
  const bookings = useStore("bookings");
  const enquiries = useStore("enquiries");
  const services = useStore("services");
  const [confirm, setConfirm] = useState(null);
  const [flashNode, flash] = useFlash();
  const navigate = useNavigate();
  const samples = bookings.filter((b) => b.sample).length + enquiries.filter((e) => e.sample).length;

  return (
    <>
      <PageHeader title="Settings" text="Demo account details and data tools." />
      <div className="grid gap-5 lg:grid-cols-2">
        <section className="card p-5">
          <h2 className="font-bold text-navy">Demo admin account</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Email</dt><dd className="font-mono">{ADMIN.email}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Password</dt><dd className="font-mono">{ADMIN.password}</dd></div>
          </dl>
          <p className="mt-4 rounded-md bg-gold/10 p-3 text-xs text-muted-foreground">This is a frontend-only demo login. It is not secure and should not be used to protect real customer data.</p>
          <button className="btn btn-outline btn-sm mt-4" onClick={() => { logout(); navigate({ to: "/admin/login" }); }}><Icon name="logout" className="h-4 w-4" />Log out</button>
        </section>

        <section className="card p-5">
          <h2 className="font-bold text-navy">Stored data</h2>
          <p className="mt-1 text-sm text-muted-foreground">Everything is saved in this browser on this device only.</p>
          <ul className="mt-4 grid grid-cols-3 gap-3 text-center">
            {[["Bookings", bookings.length], ["Enquiries", enquiries.length], ["Services", services.length]].map(([l, n]) => (
              <li key={l} className="rounded-md bg-muted p-3"><p className="text-2xl font-extrabold text-navy">{n}</p><p className="text-xs text-muted-foreground">{l}</p></li>
            ))}
          </ul>
          <button className="btn btn-outline btn-sm mt-4" onClick={() => { downloadFile(JSON.stringify(getAll(), null, 2), "homzy-demo-backup.json", "application/json"); flash("Backup downloaded"); }}>
            <Icon name="download" className="h-4 w-4" />Download full backup (JSON)
          </button>
        </section>

        <section className="card p-5 lg:col-span-2">
          <h2 className="font-bold text-navy">Data tools</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-md border border-border p-4">
              <p className="font-semibold text-navy">Remove sample records</p>
              <p className="mt-1 text-sm text-muted-foreground">Deletes the {samples} pre-filled sample bookings and enquiries, keeping everything submitted on the website.</p>
              <button className="btn btn-outline btn-sm mt-3" disabled={!samples} onClick={() => setConfirm("samples")}>Remove samples</button>
            </div>
            <div className="rounded-md border border-destructive/30 p-4">
              <p className="font-semibold text-destructive">Reset all demo data</p>
              <p className="mt-1 text-sm text-muted-foreground">Restores the original services, content and sample data. All submitted bookings and enquiries will be lost.</p>
              <button className="btn btn-danger btn-sm mt-3" onClick={() => setConfirm("reset")}>Reset everything</button>
            </div>
          </div>
        </section>
      </div>
      <Confirm open={confirm === "samples"} onClose={() => setConfirm(null)} title="Remove sample records?" confirmLabel="Remove" text="Sample bookings and enquiries will be deleted. Real submissions stay."
        onConfirm={() => { removeSamples(); flash("Sample records removed"); }} />
      <Confirm open={confirm === "reset"} onClose={() => setConfirm(null)} title="Reset all demo data?" confirmLabel="Reset" text="This cannot be undone. All bookings, enquiries and edits in this browser will be replaced with the original demo data."
        onConfirm={() => { resetAll(); flash("Demo data reset"); }} />
      {flashNode}
    </>
  );
}
