import { useEffect, useState } from "react";
import { Link, useNavigate, useHydrated } from "@tanstack/react-router";
import { Icon, Logo, Field } from "../ui.jsx";
import { useUI, login, ADMIN } from "../store.js";

export default function AdminLogin() {
  const { admin } = useUI();
  const hydrated = useHydrated();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (hydrated && admin) navigate({ to: "/admin/dashboard", replace: true }); }, [hydrated, admin]);

  function submit(e) {
    e.preventDefault();
    if (busy) return;
    if (!email.trim() || !pw) { setErr("Please enter both email and password."); return; }
    setErr(""); setBusy(true);
    setTimeout(() => {
      if (login(email, pw)) navigate({ to: "/admin/dashboard" });
      else { setErr("Incorrect email or password. Use the demo credentials shown below."); setBusy(false); }
    }, 400);
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hero-pattern relative hidden flex-col justify-between bg-navy-deep p-12 lg:flex">
        <Logo light />
        <div>
          <p className="eyebrow">Admin Panel</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-secondary-foreground">Manage bookings, services and your website in one place.</h1>
          <p className="mt-4 max-w-md text-secondary-foreground/70">Every booking made on the public website appears here instantly.</p>
        </div>
        <p className="text-xs text-secondary-foreground/50">Designed and development by SOSynch Ai Tech</p>
      </div>
      <div className="flex items-center justify-center bg-muted px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden"><Logo /></div>
          <div className="card p-8">
            <h2 className="text-2xl font-extrabold text-navy">Admin Login</h2>
            <p className="mt-1 text-sm text-muted-foreground">Sign in to the HOMZY demo admin panel.</p>
            <form onSubmit={submit} noValidate className="mt-6 space-y-4">
              <Field label="Email" required><input className="field" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@homzyservices.demo" /></Field>
              <Field label="Password" required>
                <div className="relative">
                  <input className="field pr-16" type={show ? "text" : "password"} autoComplete="current-password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" />
                  <button type="button" onClick={() => setShow(!show)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-xs font-semibold text-primary">{show ? "Hide" : "Show"}</button>
                </div>
              </Field>
              {err && <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{err}</p>}
              <button className="btn btn-primary w-full py-3" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
            </form>
            <div className="mt-6 rounded-md border border-dashed border-gold/60 bg-gold/10 p-4 text-sm">
              <p className="font-semibold text-navy">Demo credentials</p>
              <p className="mt-1 text-muted-foreground">Email: <span className="font-mono text-foreground">{ADMIN.email}</span></p>
              <p className="text-muted-foreground">Password: <span className="font-mono text-foreground">{ADMIN.password}</span></p>
              <button type="button" className="mt-2 text-xs font-semibold text-primary hover:underline" onClick={() => { setEmail(ADMIN.email); setPw(ADMIN.password); }}>Fill demo credentials</button>
              <p className="mt-2 text-xs text-muted-foreground">Demo only — this browser-based login is not secure for real use.</p>
            </div>
          </div>
          <Link to="/" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-primary"><Icon name="arrow" className="h-4 w-4 rotate-180" />Back to website</Link>
        </div>
      </div>
    </div>
  );
}
