import { useEffect, useState } from "react";
import { Link, useNavigate, useHydrated } from "@tanstack/react-router";
import { Icon, Logo } from "../ui.jsx";
import { useUI, useStore, logout } from "../store.js";

const NAV = [
  ["/admin/dashboard", "Dashboard", "grid"],
  ["/admin/bookings", "Bookings", "calendar"],
  ["/admin/services", "Services", "layers"],
  ["/admin/customers", "Customers", "users"],
  ["/admin/industries", "Industries", "building"],
  ["/admin/testimonials", "Testimonials", "star"],
  ["/admin/gallery", "Gallery / Projects", "image"],
  ["/admin/content", "Website Content", "edit"],
  ["/admin/enquiries", "Contact Enquiries", "inbox"],
  ["/admin/settings", "Settings", "cog"],
];

const linkCls = "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[status=active]:bg-sidebar-primary data-[status=active]:text-sidebar-primary-foreground";

export function AdminShell({ children }) {
  const { admin } = useUI();
  const hydrated = useHydrated();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const newCount = useStore("bookings").filter((b) => b.status === "New").length;
  const newEnq = useStore("enquiries").length;

  useEffect(() => { if (hydrated && !admin) navigate({ to: "/admin/login", replace: true }); }, [hydrated, admin]);

  if (!hydrated || !admin) {
    return <div className="flex min-h-screen items-center justify-center bg-muted text-sm text-muted-foreground">Checking admin access…</div>;
  }

  const doLogout = () => { logout(); navigate({ to: "/admin/login" }); };
  const nav = (
    <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Admin">
      {NAV.map(([to, label, icon]) => (
        <Link key={to} to={to} onClick={() => setOpen(false)} className={linkCls}>
          <Icon name={icon} className="h-4 w-4" />{label}
          {to === "/admin/bookings" && newCount > 0 && <span className="ml-auto rounded-full bg-gold px-2 text-xs font-bold text-navy-deep">{newCount}</span>}
          {to === "/admin/enquiries" && newEnq > 0 && <span className="ml-auto rounded-full bg-sidebar-accent px-2 text-xs font-bold text-sidebar-accent-foreground">{newEnq}</span>}
        </Link>
      ))}
      <button onClick={doLogout} className={`${linkCls} mt-4 border-t border-sidebar-border pt-4`}><Icon name="logout" className="h-4 w-4" />Logout</button>
    </nav>
  );

  return (
    <div className="min-h-screen bg-muted lg:flex">
      <aside className="hidden w-64 shrink-0 flex-col bg-sidebar lg:sticky lg:top-0 lg:flex lg:h-screen lg:overflow-y-auto">
        <div className="border-b border-sidebar-border px-5 py-5"><Logo light /></div>
        {nav}
      </aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-navy-deep/60" onClick={() => setOpen(false)} />
          <aside className="relative flex h-full w-72 max-w-[85%] flex-col overflow-y-auto bg-sidebar">
            <div className="flex items-center justify-between border-b border-sidebar-border px-5 py-5">
              <Logo light />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="rounded p-1 text-sidebar-foreground"><Icon name="x" /></button>
            </div>
            {nav}
          </aside>
        </div>
      )}
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-background px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button className="rounded p-2 text-navy lg:hidden" aria-label="Open menu" onClick={() => setOpen(true)}><Icon name="menu" /></button>
            <span className="hidden text-sm text-muted-foreground sm:inline">Demo Admin Panel · data is saved in this browser only</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="btn btn-outline btn-sm"><Icon name="eye" className="h-4 w-4" />View website</Link>
            <span className="hidden h-9 w-9 items-center justify-center rounded-full bg-navy text-xs font-bold text-secondary-foreground sm:flex" title="Demo admin">AD</span>
          </div>
        </header>
        <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({ title, text, children }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-navy">{title}</h1>
        {text && <p className="mt-1 text-sm text-muted-foreground">{text}</p>}
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}

export function Empty({ icon = "inbox", title, text, children }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary"><Icon name={icon} className="h-6 w-6" /></span>
      <p className="mt-4 font-bold text-navy">{title}</p>
      {text && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{text}</p>}
      {children && <div className="mt-5">{children}</div>}
    </div>
  );
}

export function useFlash() {
  const [msg, setMsg] = useState("");
  useEffect(() => { if (!msg) return; const t = setTimeout(() => setMsg(""), 2500); return () => clearTimeout(t); }, [msg]);
  const node = msg ? (
    <div role="status" className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 rounded-md bg-navy px-4 py-3 text-sm font-semibold text-secondary-foreground shadow-lift animate-in fade-in slide-in-from-bottom-2">
      <Icon name="check" className="h-4 w-4 text-primary" />{msg}
    </div>
  ) : null;
  return [node, setMsg];
}

export const th = "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground";
export const td = "px-4 py-3 align-middle";
