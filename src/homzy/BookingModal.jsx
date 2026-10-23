import { useEffect, useState } from "react";
import { Modal, Field, Icon } from "./ui.jsx";
import { useUI, setUI, useStore, addBooking, isValidPhone, CATEGORIES } from "./store.js";

const PROPERTY = ["Residential", "Apartment Society", "Office", "Commercial Building", "Industrial Facility", "Other"];
const SLOTS = ["Morning (8am-12pm)", "Afternoon (12pm-4pm)", "Evening (4pm-8pm)"];
const EMPTY = { name: "", phone: "", email: "", company: "", propertyType: "", category: "", service: "", address: "", city: "", date: "", time: "", frequency: "One-Time", size: "", staff: "", requirements: "", contactMethod: "Phone", consent: false };

export default function BookingModal() {
  const { bookingOpen, preService } = useUI();
  const services = useStore("services").filter((s) => s.published);
  const [f, setF] = useState(EMPTY);
  const [err, setErr] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(null);

  useEffect(() => {
    if (bookingOpen) {
      setDone(null); setErr({});
      const s = preService && services.find((x) => x.title === preService);
      setF({ ...EMPTY, ...(s ? { category: s.category, service: s.title } : {}) });
    }
  }, [bookingOpen, preService]);

  const close = () => setUI({ bookingOpen: false });
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value, ...(k === "category" ? { service: "" } : {}) }));
  const today = new Date().toISOString().slice(0, 10);

  function validate() {
    const e = {};
    if (f.name.trim().length < 2) e.name = "Please enter your full name.";
    if (!isValidPhone(f.phone)) e.phone = "Enter a valid 10-digit mobile number.";
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email address.";
    ["propertyType", "category", "service", "time"].forEach((k) => !f[k] && (e[k] = "Please select an option."));
    if (f.address.trim().length < 5) e.address = "Please enter the property address.";
    if (!f.city.trim()) e.city = "Please enter your city.";
    if (!f.date) e.date = "Choose a preferred date.";
    else if (f.date < today) e.date = "Date cannot be in the past.";
    if (!f.consent) e.consent = "Please confirm to submit this demo booking.";
    return e;
  }

  function submit(ev) {
    ev.preventDefault();
    if (busy) return;
    const e = validate(); setErr(e);
    if (Object.keys(e).length) { document.querySelector(`[name="${Object.keys(e)[0]}"]`)?.focus(); return; }
    setBusy(true);
    setTimeout(() => {
      const { consent, ...data } = f;
      setDone(addBooking(data)); setF(EMPTY); setBusy(false);
    }, 600);
  }

  const opts = services.filter((s) => !f.category || s.category === f.category);
  const cats = CATEGORIES.filter((c) => services.some((s) => s.category === c));

  return (
    <Modal open={bookingOpen} onClose={close} title={done ? "Booking received" : "Book a Service"} wide>
      {done ? (
        <div className="py-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-primary"><Icon name="check" className="h-8 w-8" /></div>
          <p className="mt-5 text-muted-foreground">Thank you, {done.name}. Your demo booking reference is</p>
          <p className="mt-2 text-3xl font-extrabold tracking-wide text-navy">{done.id}</p>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">This is a frontend demo: the booking is saved in this browser and is visible in the Admin Panel. No message has been sent to a real business.</p>
          <div className="mt-6 flex justify-center gap-3">
            <button className="btn btn-outline" onClick={() => setDone(null)}>Book another</button>
            <button className="btn btn-primary" onClick={close}>Done</button>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
          <Field label="Full Name" required error={err.name}><input name="name" className="field" value={f.name} onChange={set("name")} placeholder="e.g. Asha Kulkarni" /></Field>
          <Field label="Mobile Number" required error={err.phone}><input name="phone" className="field" inputMode="tel" value={f.phone} onChange={set("phone")} placeholder="10-digit mobile" /></Field>
          <Field label="Email Address" error={err.email}><input name="email" className="field" type="email" value={f.email} onChange={set("email")} placeholder="you@example.com" /></Field>
          <Field label="Company / Society Name"><input className="field" value={f.company} onChange={set("company")} placeholder="Optional" /></Field>
          <Field label="Property Type" required error={err.propertyType}><select name="propertyType" className="field" value={f.propertyType} onChange={set("propertyType")}><option value="">Select property type</option>{PROPERTY.map((p) => <option key={p}>{p}</option>)}</select></Field>
          <Field label="Service Category" required error={err.category}><select name="category" className="field" value={f.category} onChange={set("category")}><option value="">Select category</option>{cats.map((c) => <option key={c}>{c}</option>)}</select></Field>
          <Field label="Specific Service" required error={err.service} className="sm:col-span-2"><select name="service" className="field" value={f.service} onChange={set("service")}><option value="">Select service</option>{opts.map((s) => <option key={s.id}>{s.title}</option>)}</select></Field>
          <Field label="Property Address" required error={err.address} className="sm:col-span-2"><input name="address" className="field" value={f.address} onChange={set("address")} placeholder="Flat / building, street, area" /></Field>
          <Field label="City" required error={err.city}><input name="city" className="field" value={f.city} onChange={set("city")} placeholder="e.g. Pune" /></Field>
          <Field label="Preferred Date" required error={err.date}><input name="date" className="field" type="date" min={today} value={f.date} onChange={set("date")} /></Field>
          <Field label="Preferred Time Slot" required error={err.time}><select name="time" className="field" value={f.time} onChange={set("time")}><option value="">Select slot</option>{SLOTS.map((s) => <option key={s}>{s}</option>)}</select></Field>
          <Field label="Service Frequency"><select className="field" value={f.frequency} onChange={set("frequency")}>{["One-Time", "Daily", "Weekly", "Monthly"].map((s) => <option key={s}>{s}</option>)}</select></Field>
          <Field label="Approx. Property Size"><input className="field" value={f.size} onChange={set("size")} placeholder="e.g. 1,200 sq ft" /></Field>
          <Field label="Staff Required"><input className="field" type="number" min="0" value={f.staff} onChange={set("staff")} placeholder="Optional" /></Field>
          <Field label="Additional Requirements" className="sm:col-span-2"><textarea className="field" rows={3} value={f.requirements} onChange={set("requirements")} placeholder="Anything we should know?" /></Field>
          <fieldset className="sm:col-span-2">
            <legend className="mb-1 text-sm font-medium text-navy">Preferred Contact Method</legend>
            <div className="flex flex-wrap gap-4 text-sm">{["Phone", "Email", "WhatsApp"].map((m) => (
              <label key={m} className="flex items-center gap-2"><input type="radio" name="contactMethod" value={m} checked={f.contactMethod === m} onChange={set("contactMethod")} className="accent-primary" />{m}</label>
            ))}</div>
          </fieldset>
          <div className="sm:col-span-2">
            <label className="flex items-start gap-2 text-sm text-muted-foreground"><input name="consent" type="checkbox" checked={f.consent} onChange={set("consent")} className="mt-0.5 accent-primary" />I understand this is a demo booking saved only in this browser.</label>
            {err.consent && <span className="mt-1 block text-xs text-destructive">{err.consent}</span>}
          </div>
          <div className="flex justify-end gap-3 sm:col-span-2">
            <button type="button" className="btn btn-outline" onClick={close}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? "Submitting…" : "Submit Booking"}</button>
          </div>
        </form>
      )}
    </Modal>
  );
}
