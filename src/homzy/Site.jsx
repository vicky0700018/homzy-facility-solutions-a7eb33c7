import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Icon, Img, Modal, Field, Logo } from "./ui.jsx";
import BookingModal from "./BookingModal.jsx";
import { useStore, openBooking, addEnquiry, isValidPhone } from "./store.js";
import hero from "@/assets/hero.jpg";
import about from "@/assets/about.jpg";

const NAV = [["Home", "home"], ["About Us", "about"], ["Services", "services"], ["Industries We Serve", "industries"], ["Our Work", "work"], ["Contact", "contact"]];

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#home" aria-label="HOMZY home"><Logo /></a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {NAV.map(([l, id]) => <a key={id} href={`#${id}`} className="text-sm font-medium text-foreground transition hover:text-primary">{l}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => openBooking()} className="btn btn-primary hidden sm:inline-flex"><Icon name="phone" className="h-4 w-4" />Book a Service</button>
          <button className="rounded p-2 text-navy lg:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}><Icon name={open ? "x" : "menu"} /></button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-4 pb-4 lg:hidden" aria-label="Mobile">
          {NAV.map(([l, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="block border-b border-border py-3 font-medium text-navy">{l}</a>)}
          <button onClick={() => { setOpen(false); openBooking(); }} className="btn btn-primary mt-4 w-full"><Icon name="phone" className="h-4 w-4" />Book a Service</button>
        </nav>
      )}
    </header>
  );
}

function Heading({ eyebrow, title, text, light }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl ${light ? "text-secondary-foreground" : "text-navy"}`}>{title}</h2>
      {text && <p className={`mt-4 ${light ? "text-secondary-foreground/70" : "text-muted-foreground"}`}>{text}</p>}
    </div>
  );
}

function Hero() {
  const c = useStore("content");
  return (
    <section id="home" className="hero-pattern relative overflow-hidden bg-muted">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="eyebrow flex items-center gap-2"><span className="h-px w-8 bg-gold" />Integrated Facility Management</p>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-6xl">{c.heroTitle}</h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">{c.heroText}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => openBooking()} className="btn btn-primary px-6 py-3.5">Book a Service <Icon name="arrow" className="h-4 w-4" /></button>
            <a href="#services" className="btn btn-outline px-6 py-3.5">Explore Our Services</a>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {[["users", "Professional Service Teams"], ["layers", "Flexible Service Solutions"], ["shield", "Quality-Focused Operations"]].map(([i, t]) => (
              <li key={t} className="flex items-center gap-3 text-sm font-semibold text-navy"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent text-primary"><Icon name={i} className="h-4 w-4" /></span>{t}</li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="absolute -right-4 -top-4 h-32 w-32 rounded-lg border-2 border-gold/60" aria-hidden />
          <Img src={hero} alt="HOMZY housekeeping team cleaning a modern office lobby" eager className="relative aspect-[5/4] rounded-xl shadow-lift" />
          <div className="card absolute -bottom-6 left-6 flex items-center gap-3 px-5 py-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"><Icon name="check" /></span>
            <div><p className="text-sm font-bold text-navy">One partner</p><p className="text-xs text-muted-foreground">12 integrated service lines</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const c = useStore("content");
  const items = [["Our Mission", "Create well-kept spaces that make daily life and work easier."], ["Our Approach", "Integrated planning with one coordinated team per site."], ["Quality and Reliability", "Checklists, supervision and consistent standards."], ["Customer-Centric Service", "Responsive communication and plans shaped around you."]];
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <Img src={about} alt="Facility supervisor briefing housekeeping staff at a residential complex" className="aspect-square rounded-xl shadow-card" />
        <div>
          <p className="eyebrow">About Us</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Well-managed spaces create better experiences</h2>
          <p className="mt-5 text-muted-foreground">{c.about}</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {items.map(([t, d]) => <div key={t} className="border-l-2 border-primary pl-4"><h3 className="font-bold text-navy">{t}</h3><p className="mt-1 text-sm text-muted-foreground">{d}</p></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = useStore("services").filter((s) => s.published);
  const c = useStore("content");
  const [view, setView] = useState(null);
  return (
    <section id="services" className="bg-muted py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Heading eyebrow="Our Services" title={c.servicesHeading} text="Illustrative service offerings — every plan is tailored after a site discussion." />
        {services.length === 0 ? <p className="text-center text-muted-foreground">Services will be listed soon.</p> : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <article key={s.id} className="card group flex flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-lift">
                <div className="relative"><Img src={s.image} alt={s.title} className="aspect-[16/10] transition duration-500 group-hover:scale-[1.03]" />
                  <span className="absolute left-3 top-3 rounded bg-navy px-2 py-1 text-[11px] font-semibold text-secondary-foreground">{s.category}</span></div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold text-navy">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                  <ul className="mt-4 space-y-1.5">{s.benefits.slice(0, 3).map((b) => <li key={b} className="flex items-center gap-2 text-sm"><Icon name="check" className="h-4 w-4 text-primary" />{b}</li>)}</ul>
                  <p className="mt-4 text-sm font-semibold text-gold">{s.price}</p>
                  <div className="mt-auto flex gap-2 pt-5">
                    <button onClick={() => openBooking(s.title)} className="btn btn-primary flex-1">Book This Service</button>
                    <button onClick={() => setView(s)} className="btn btn-outline" aria-label={`View details for ${s.title}`}>Details</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      <Modal open={!!view} onClose={() => setView(null)} title={view?.title || ""}>
        {view && <>
          <Img src={view.image} alt={view.title} className="aspect-video rounded-lg" />
          <p className="mt-4 text-muted-foreground">{view.description}</p>
          <ul className="mt-4 space-y-2">{view.benefits.map((b) => <li key={b} className="flex gap-2 text-sm"><Icon name="check" className="h-4 w-4 text-primary" />{b}</li>)}</ul>
          <button className="btn btn-primary mt-6 w-full" onClick={() => { const t = view.title; setView(null); openBooking(t); }}>Book This Service</button>
        </>}
      </Modal>
    </section>
  );
}

function Industries() {
  const industries = useStore("industries").filter((x) => x.published !== false);
  return (
    <section id="industries" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Heading eyebrow="Industries We Serve" title="Built for every kind of property" />
        {industries.length === 0 && <p className="text-center text-muted-foreground">Industries will be listed soon.</p>}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind, i) => (
            <article key={ind.id} className={`group relative overflow-hidden rounded-lg ${i === 0 ? "sm:col-span-2 lg:row-span-2" : ""}`}>
              <Img src={ind.image} alt={ind.title} className={`${i === 0 ? "aspect-square lg:h-full" : "aspect-[4/3]"} transition duration-500 group-hover:scale-105`} />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-navy-deep/90 via-navy-deep/30 to-transparent p-5">
                <h3 className="text-lg font-bold text-secondary-foreground">{ind.title}</h3>
                <p className="mt-1 text-sm text-secondary-foreground/80">{ind.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Why() {
  const items = [["user", "One Point of Contact", "A dedicated coordinator for every site and request."], ["calendar", "Flexible Service Plans", "One-time, daily, weekly or monthly — scale as you need."], ["layers", "Professional Service Coordination", "Teams, schedules and supplies planned together."], ["shield", "Quality-Focused Processes", "Checklists and supervised visits for consistent results."], ["chat", "Transparent Communication", "Clear updates on schedules, staffing and issues."], ["heart", "Customer-Oriented Support", "Responsive help shaped around your property."]];
  return (
    <section className="bg-navy-deep py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Heading light eyebrow="Why Choose HOMZY" title="A simpler way to run your facility" />
        <div className="grid gap-px overflow-hidden rounded-lg bg-secondary-foreground/10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([i, t, d]) => (
            <div key={t} className="bg-navy-deep p-8 transition hover:bg-navy">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/20 text-primary"><Icon name={i} /></span>
              <h3 className="mt-5 text-lg font-bold text-secondary-foreground">{t}</h3>
              <p className="mt-2 text-sm text-secondary-foreground/65">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  const gallery = useStore("gallery").filter((g) => g.published !== false);
  const [cat, setCat] = useState("All");
  const [preview, setPreview] = useState(null);
  const cats = ["All", ...new Set(gallery.map((g) => g.category))];
  const list = gallery.filter((g) => cat === "All" || g.category === cat);
  return (
    <section id="work" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Heading eyebrow="Our Work" title="Projects & gallery" text="Illustrative portfolio images showing the kind of spaces we care for." />
        <div className="mb-8 flex flex-wrap justify-center gap-2" role="tablist">
          {cats.map((c) => <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${cat === c ? "bg-navy text-secondary-foreground" : "bg-muted text-navy hover:bg-accent"}`}>{c}</button>)}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((g) => (
            <button key={g.id} onClick={() => setPreview(g)} className="group relative overflow-hidden rounded-lg text-left">
              <Img src={g.image} alt={g.title} className="aspect-[4/3] transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/90 to-transparent p-4">
                <p className="text-xs font-semibold text-gold">{g.category}</p>
                <p className="font-bold text-secondary-foreground">{g.title}</p>
              </div>
            </button>
          ))}
        </div>
        {list.length === 0 && <p className="text-center text-muted-foreground">No projects in this category yet.</p>}
      </div>
      <Modal open={!!preview} onClose={() => setPreview(null)} title={preview?.title || ""} wide>
        {preview && <Img src={preview.image} alt={preview.title} className="aspect-video rounded-lg" />}
      </Modal>
    </section>
  );
}

function Testimonials() {
  const list = useStore("testimonials").filter((t) => t.published);
  if (!list.length) return null;
  return (
    <section className="bg-accent py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Heading eyebrow="Testimonials" title="What clients could say" text="Demo testimonials with sample names — not verified reviews." />
        <div className="grid gap-6 md:grid-cols-3">
          {list.map((t) => (
            <figure key={t.id} className="card p-7">
              <div className="flex gap-0.5 text-gold">{[1, 2, 3, 4, 5].map((n) => <Icon key={n} name="star" className="h-4 w-4" />)}</div>
              <blockquote className="mt-4 text-foreground">“{t.text}”</blockquote>
              <figcaption className="mt-5 border-t border-border pt-4"><p className="font-bold text-navy">{t.name}</p><p className="text-xs text-muted-foreground">{t.role}</p></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const c = useStore("content");
  const EMPTY = { name: "", email: "", phone: "", subject: "", message: "" };
  const [f, setF] = useState(EMPTY);
  const [err, setErr] = useState({});
  const [done, setDone] = useState(null);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  function submit(ev) {
    ev.preventDefault();
    const e = {};
    if (f.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email.";
    if (f.phone && !isValidPhone(f.phone)) e.phone = "Enter a valid 10-digit mobile.";
    if (f.message.trim().length < 10) e.message = "Please write at least 10 characters.";
    setErr(e);
    if (Object.keys(e).length) return;
    setDone(addEnquiry(f)); setF(EMPTY);
  }
  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="eyebrow">Contact</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy">Let's talk about your facility</h2>
          <p className="mt-4 text-muted-foreground">HOMZY SERVICES PRIVATE LIMITED</p>
          <ul className="mt-6 space-y-4">
            {[["pin", c.address], ["phone", c.phone], ["mail", c.email]].map(([i, t]) => <li key={i} className="flex items-center gap-3 text-sm"><span className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-primary"><Icon name={i} /></span>{t}</li>)}
          </ul>
          <div className="hero-pattern mt-8 flex aspect-video items-center justify-center rounded-lg border border-dashed border-border bg-muted text-sm text-muted-foreground"><Icon name="pin" className="mr-2 h-4 w-4" />Map location to be updated</div>
        </div>
        <div className="card p-6 sm:p-8 lg:col-span-3">
          {done ? (
            <div className="py-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary"><Icon name="check" className="h-7 w-7" /></div>
              <p className="mt-4 font-bold text-navy">Enquiry {done.id} received</p>
              <p className="mt-2 text-sm text-muted-foreground">Saved in this browser for the demo Admin Panel.</p>
              <button className="btn btn-outline mt-6" onClick={() => setDone(null)}>Send another</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" required error={err.name}><input className="field" value={f.name} onChange={set("name")} placeholder="Your name" /></Field>
              <Field label="Email" required error={err.email}><input className="field" type="email" value={f.email} onChange={set("email")} placeholder="you@company.com" /></Field>
              <Field label="Phone" error={err.phone}><input className="field" value={f.phone} onChange={set("phone")} placeholder="Optional" /></Field>
              <Field label="Subject"><input className="field" value={f.subject} onChange={set("subject")} placeholder="e.g. Office cleaning quote" /></Field>
              <Field label="Message" required error={err.message} className="sm:col-span-2"><textarea className="field" rows={5} value={f.message} onChange={set("message")} placeholder="Tell us about your property and needs" /></Field>
              <div className="sm:col-span-2"><button className="btn btn-navy w-full sm:w-auto">Send Enquiry</button></div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const c = useStore("content");
  const services = useStore("services").filter((s) => s.published).slice(0, 6);
  return (
    <footer className="bg-navy-deep text-secondary-foreground/75">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div><Logo light /><p className="mt-4 text-sm">{c.footer}</p>
          <button onClick={() => openBooking()} className="btn btn-gold mt-6">Book a Service</button></div>
        <div><h3 className="font-bold text-secondary-foreground">Quick Links</h3><ul className="mt-4 space-y-2 text-sm">{NAV.map(([l, id]) => <li key={id}><a href={`#${id}`} className="hover:text-primary">{l}</a></li>)}</ul></div>
        <div><h3 className="font-bold text-secondary-foreground">Services</h3><ul className="mt-4 space-y-2 text-sm">{services.map((s) => <li key={s.id}><button onClick={() => openBooking(s.title)} className="text-left hover:text-primary">{s.title}</button></li>)}</ul></div>
        <div><h3 className="font-bold text-secondary-foreground">Contact</h3><ul className="mt-4 space-y-2 text-sm"><li>{c.address}</li><li>{c.phone}</li><li>{c.email}</li></ul>
          <Link to="/admin/login" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline"><Icon name="shield" className="h-4 w-4" />Admin Login</Link></div>
      </div>
      <div className="border-t border-secondary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs sm:flex-row sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} HOMZY SERVICES PRIVATE LIMITED. Demo website.</p>
          <p>Designed and development by SOSynch Ai Tech</p>
        </div>
      </div>
    </footer>
  );
}

export default function Site() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main><Hero /><About /><Services /><Industries /><Why /><Work /><Testimonials /><Contact /></main>
      <Footer />
      <BookingModal />
    </div>
  );
}
