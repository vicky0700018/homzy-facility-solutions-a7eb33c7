import { Link } from "@tanstack/react-router";
import { Icon, StatusBadge, fmtDate } from "../ui.jsx";
import { useStore, STATUSES, CATEGORIES, toCSV, downloadFile } from "../store.js";
import { PageHeader, Empty, th, td } from "./Shell.jsx";

const STAT_TONE = {
  New: "bg-info/15 text-info", Confirmed: "bg-primary/15 text-primary", "In Progress": "bg-warning/20 text-navy",
  Completed: "bg-success/15 text-success", Cancelled: "bg-destructive/10 text-destructive",
};
const BAR = { New: "bg-info", Confirmed: "bg-primary", "In Progress": "bg-warning", Completed: "bg-success", Cancelled: "bg-destructive" };

function Stat({ label, value, icon, tone }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <span className={`flex h-9 w-9 items-center justify-center rounded-md ${tone}`}><Icon name={icon} className="h-4 w-4" /></span>
      </div>
      <p className="mt-3 text-3xl font-extrabold text-navy">{value}</p>
    </div>
  );
}

export default function Dashboard() {
  const bookings = useStore("bookings");
  const enquiries = useStore("enquiries");
  const count = (s) => bookings.filter((b) => b.status === s).length;
  const recent = [...bookings].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 6);
  const cats = [...new Set([...CATEGORIES, ...bookings.map((b) => b.category)])].map((c) => [c, bookings.filter((b) => b.category === c).length]).filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1]);
  const maxCat = Math.max(1, ...cats.map(([, n]) => n));
  const recentEnq = [...enquiries].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 4);

  return (
    <>
      <PageHeader title="Dashboard" text="Live overview of bookings and enquiries saved in this browser.">
        <button className="btn btn-outline btn-sm" onClick={() => downloadFile(toCSV(bookings), "homzy-bookings.csv")}><Icon name="download" className="h-4 w-4" />Export CSV</button>
        <Link to="/admin/bookings" className="btn btn-primary btn-sm">Manage bookings</Link>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total Bookings" value={bookings.length} icon="calendar" tone="bg-navy text-secondary-foreground" />
        {STATUSES.map((s) => <Stat key={s} label={s === "New" ? "New Bookings" : s} value={count(s)} icon={s === "Cancelled" ? "x" : s === "Completed" ? "check" : s === "In Progress" ? "cog" : "sparkle"} tone={STAT_TONE[s]} />)}
        <Stat label="Total Enquiries" value={enquiries.length} icon="inbox" tone="bg-gold/20 text-navy" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="card overflow-hidden lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="font-bold text-navy">Recent bookings</h2>
            <Link to="/admin/bookings" className="text-sm font-semibold text-primary hover:underline">View all</Link>
          </div>
          {recent.length === 0 ? <Empty icon="calendar" title="No bookings yet" text="Bookings submitted on the website will appear here." /> : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted"><tr><th className={th}>Booking</th><th className={th}>Customer</th><th className={th}>Service</th><th className={th}>Preferred</th><th className={th}>Status</th></tr></thead>
                <tbody className="divide-y divide-border">
                  {recent.map((b) => (
                    <tr key={b.id} className="hover:bg-muted/60">
                      <td className={`${td} font-mono text-xs font-semibold text-navy`}>{b.id}</td>
                      <td className={td}><p className="font-medium">{b.name}</p><p className="text-xs text-muted-foreground">{b.phone}</p></td>
                      <td className={td}>{b.service}</td>
                      <td className={`${td} whitespace-nowrap`}>{fmtDate(b.date)}</td>
                      <td className={td}><StatusBadge status={b.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="card p-5">
          <h2 className="font-bold text-navy">Booking status</h2>
          <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-muted">
            {STATUSES.map((s) => count(s) > 0 && <div key={s} className={BAR[s]} style={{ width: `${(count(s) / bookings.length) * 100}%` }} title={`${s}: ${count(s)}`} />)}
          </div>
          <ul className="mt-5 space-y-3">
            {STATUSES.map((s) => (
              <li key={s} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2"><span className={`h-2.5 w-2.5 rounded-full ${BAR[s]}`} />{s}</span>
                <span className="font-semibold text-navy">{count(s)} <span className="font-normal text-muted-foreground">({bookings.length ? Math.round((count(s) / bookings.length) * 100) : 0}%)</span></span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-5">
          <h2 className="font-bold text-navy">Service category breakdown</h2>
          {cats.length === 0 ? <p className="mt-4 text-sm text-muted-foreground">No data yet.</p> : (
            <ul className="mt-4 space-y-4">
              {cats.map(([c, n]) => (
                <li key={c}>
                  <div className="flex justify-between text-sm"><span>{c}</span><span className="font-semibold text-navy">{n}</span></div>
                  <div className="mt-1.5 h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: `${(n / maxCat) * 100}%` }} /></div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="font-bold text-navy">Recent enquiries</h2>
            <Link to="/admin/enquiries" className="text-sm font-semibold text-primary hover:underline">View all</Link>
          </div>
          {recentEnq.length === 0 ? <Empty icon="inbox" title="No enquiries yet" /> : (
            <ul className="divide-y divide-border">
              {recentEnq.map((e) => (
                <li key={e.id} className="px-5 py-3">
                  <div className="flex justify-between gap-2"><p className="font-medium text-navy">{e.name}</p><span className="text-xs text-muted-foreground">{fmtDate(e.createdAt)}</span></div>
                  <p className="truncate text-sm text-muted-foreground">{e.subject || e.message}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card p-5">
          <h2 className="font-bold text-navy">Quick actions</h2>
          <div className="mt-4 grid gap-2">
            {[["/admin/bookings", "Review new bookings", "calendar"], ["/admin/services", "Add or edit services", "layers"], ["/admin/content", "Edit website content", "edit"], ["/admin/testimonials", "Manage testimonials", "star"], ["/admin/gallery", "Update gallery", "image"]].map(([to, l, i]) => (
              <Link key={to} to={to} className="flex items-center gap-3 rounded-md border border-border px-3 py-2.5 text-sm font-medium text-navy transition hover:border-primary hover:text-primary">
                <Icon name={i} className="h-4 w-4" />{l}<Icon name="arrow" className="ml-auto h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
