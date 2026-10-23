import { useSyncExternalStore } from "react";

const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=70`;

export const CATEGORIES = ["Cleaning", "Maintenance", "Facility Management", "Support Services", "Outdoor"];

const SEED_SERVICES = [
  ["Housekeeping and Cleaning", "Cleaning", "photo-1581578731548-c64695cc6952", "Routine housekeeping by trained teams for homes and workplaces.", ["Trained staff", "Scheduled visits", "Eco-friendly supplies"]],
  ["Deep Cleaning Services", "Cleaning", "photo-1527515637462-cff94eecc1ac", "Intensive top-to-bottom cleaning for move-ins, festivals and resets.", ["Kitchen & bath detailing", "Machine scrubbing", "Sanitisation"]],
  ["Office and Commercial Cleaning", "Cleaning", "photo-1497366216548-37526070297c", "Spotless workstations, washrooms and common areas every day.", ["After-hours option", "Washroom hygiene", "Floor care"]],
  ["Residential Society Maintenance", "Facility Management", "photo-1545324418-cc1a3fa10c00", "Common-area upkeep and coordination for apartment societies.", ["Lobby & stairwell care", "Vendor coordination", "Monthly reports"]],
  ["Integrated Facility Management", "Facility Management", "photo-1486406146926-c627a92ad1ab", "One partner for cleaning, technical, security and support services.", ["Single point of contact", "SLA tracking", "Custom plans"]],
  ["Technical and Electrical Maintenance", "Maintenance", "photo-1621905251189-08b45d6a269e", "Preventive and on-call electrical and technical upkeep.", ["Preventive checks", "Fault response", "Safety focus"]],
  ["Plumbing and General Repairs", "Maintenance", "photo-1585704032915-c3400ca199e7", "Leak fixes, fittings and everyday repair coordination.", ["Quick response", "Quality fittings", "Clean finish"]],
  ["Security Support Services", "Support Services", "photo-1521791055366-0d553872125f", "Front-desk, access and patrol support for your premises.", ["Visitor management", "Shift coverage", "Incident logs"]],
  ["Gardening and Landscaping", "Outdoor", "photo-1558904541-efa843a96f01", "Lawn care, planting and landscape upkeep for green spaces.", ["Seasonal planting", "Lawn trimming", "Irrigation care"]],
  ["Pest Control Coordination", "Support Services", "photo-1563453392212-326f5e854473", "Scheduled pest-control coordination with licensed providers.", ["Routine schedules", "Safe methods", "Follow-up checks"]],
  ["Pantry and Office Support", "Support Services", "photo-1556761175-b413da4baf72", "Pantry staff, tea/coffee service and office assistance.", ["Pantry upkeep", "Meeting support", "Supplies tracking"]],
  ["Staff and Workforce Management", "Facility Management", "photo-1522071820081-009f0129c71c", "Deployment, rostering and supervision of on-site workforce.", ["Rostering", "Attendance tracking", "Supervision"]],
].map(([title, category, img, description, benefits], i) => ({
  id: `svc-${i + 1}`, title, category, image: u(img), description, benefits, price: "Request a Quote", published: true,
}));

const SEED_INDUSTRIES = [
  ["Residential Societies", "photo-1460317442991-0ec209397118", "Common-area care, housekeeping and maintenance for gated communities."],
  ["Corporate Offices", "photo-1497366811353-6870744d04b2", "Clean, well-run workplaces that keep teams productive."],
  ["Retail and Commercial Spaces", "photo-1441986300917-64674bd600d8", "Customer-ready floors, glass and washrooms all day long."],
  ["Educational Institutions", "photo-1541339907198-e08756dedf3f", "Safe, hygienic classrooms, labs and campus grounds."],
  ["Healthcare Facilities", "photo-1519494026892-80bbd2d6fd0d", "Hygiene-focused support for clinics and care centres."],
  ["Industrial Buildings", "photo-1565793298595-6a879b1d9492", "Workforce and upkeep support for plants and warehouses."],
  ["Hospitality Properties", "photo-1566073771259-6a8506099945", "Guest-ready housekeeping for hotels and serviced stays."],
].map(([title, img, description], i) => ({ id: `ind-${i + 1}`, title, image: u(img), description, published: true }));

const SEED_GALLERY = [
  ["Corporate Lobby Refresh (Sample)", "Commercial", "photo-1497366754035-f200968a6e72"],
  ["Tower Block Upkeep (Sample)", "Residential", "photo-1512917774080-9991f1c4c750"],
  ["Suite Housekeeping (Sample)", "Housekeeping", "photo-1584622650111-993a426fbf0a"],
  ["Open-Plan Office Clean (Sample)", "Commercial", "photo-1524758631624-e2822e304c36"],
  ["Maintenance Team Rounds (Sample)", "Maintenance", "photo-1504307651254-35680f356dfd"],
  ["Society Garden Care (Sample)", "Outdoor", "photo-1585320806297-9794b3e4eeae"],
].map(([title, category, img], i) => ({ id: `g-${i + 1}`, title, category, image: u(img) }));

const SEED_TESTIMONIALS = [
  { id: "t-1", name: "Demo Customer A", role: "Society Secretary (sample)", text: "Sample testimonial: the common areas have never looked better and coordination is simple.", published: true },
  { id: "t-2", name: "Demo Customer B", role: "Office Admin (sample)", text: "Sample testimonial: one contact for cleaning and pantry support saves our team hours.", published: true },
  { id: "t-3", name: "Demo Customer C", role: "Homeowner (sample)", text: "Sample testimonial: the deep-clean team was punctual, careful and thorough.", published: true },
];

const SEED_CONTENT = {
  heroTitle: "Complete Facility Solutions. One Trusted Partner.",
  heroText: "HOMZY SERVICES PRIVATE LIMITED delivers reliable, professional facility management solutions designed to keep homes, workplaces, and commercial environments clean, safe, and efficient.",
  about: "At HOMZY SERVICES PRIVATE LIMITED, we believe well-managed spaces create better experiences. Our integrated service approach focuses on cleanliness, operational support, facility upkeep, and dependable customer service for residential and commercial environments.",
  servicesHeading: "Facility services, delivered as one",
  address: "Address to be updated",
  phone: "Phone to be updated",
  email: "Email to be updated",
  footer: "Integrated facility management, housekeeping and maintenance for homes, offices and commercial properties.",
};

const day = (o) => new Date(Date.now() + o * 864e5).toISOString().slice(0, 10);
const SEED_BOOKINGS = [
  ["HOM-2026-1001", "Sample: Rahul Mehta", "9876500001", "Deep Cleaning Services", "Cleaning", "Residential", "Pune", 3, -2, "Confirmed"],
  ["HOM-2026-1002", "Sample: Ananya Rao", "9876500002", "Office and Commercial Cleaning", "Cleaning", "Office", "Bengaluru", 5, -1, "New"],
  ["HOM-2026-1003", "Sample: Green Park Society", "9876500003", "Residential Society Maintenance", "Facility Management", "Apartment Society", "Mumbai", 1, -5, "In Progress"],
  ["HOM-2026-1004", "Sample: Rahul Mehta", "9876500001", "Pest Control Coordination", "Support Services", "Residential", "Pune", -3, -9, "Completed"],
].map(([id, name, phone, service, category, propertyType, city, d, s, status]) => ({
  id, name, phone, email: "", company: "", propertyType, category, service, address: "Sample address", city,
  date: day(d), time: "Morning (8am-12pm)", frequency: "One-Time", size: "", staff: "", requirements: "",
  contactMethod: "Phone", createdAt: new Date(Date.now() + s * 864e5).toISOString(), status, notes: "", sample: true,
}));

const SEED_ENQUIRIES = [
  { id: "ENQ-2026-501", name: "Sample: Priya Shah", email: "priya@example.com", phone: "9876500010", subject: "AMC for office", message: "Sample enquiry about an annual maintenance plan.", createdAt: new Date(Date.now() - 2 * 864e5).toISOString(), sample: true },
];

const KEY = "homzy-demo-v1";
const SEEDS = { services: SEED_SERVICES, bookings: SEED_BOOKINGS, enquiries: SEED_ENQUIRIES, testimonials: SEED_TESTIMONIALS, gallery: SEED_GALLERY, industries: SEED_INDUSTRIES, content: SEED_CONTENT, settings: { notifyEmail: "", bookingPrefix: "HOM" } };

let state = null;
let ui = { bookingOpen: false, preService: null, admin: false };
const listeners = new Set();
const emit = () => listeners.forEach((l) => l());

function load() {
  if (state) return state;
  state = structuredClone(SEEDS);
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) state = { ...state, ...JSON.parse(raw) };
      ui = { ...ui, admin: sessionStorage.getItem("homzy-admin") === "1" };
    } catch {}
  }
  return state;
}
const SERVER = structuredClone(SEEDS);
function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} }

export function update(key, fn) {
  load();
  state = { ...state, [key]: fn(state[key]) };
  save(); emit();
}
const subscribe = (l) => { listeners.add(l); return () => listeners.delete(l); };

export function useStore(key) {
  return useSyncExternalStore(subscribe, () => load()[key], () => SERVER[key]);
}
const UI_SERVER = { bookingOpen: false, preService: null, admin: false };
export function useUI() { return useSyncExternalStore(subscribe, () => (load(), ui), () => UI_SERVER); }
export function setUI(patch) { ui = { ...ui, ...patch }; emit(); }
export const openBooking = (service = null) => setUI({ bookingOpen: true, preService: service });

export const ADMIN = { email: "admin@homzyservices.demo", password: "Homzy@123" };
export function login(email, pw) {
  if (email.trim().toLowerCase() === ADMIN.email && pw === ADMIN.password) {
    sessionStorage.setItem("homzy-admin", "1"); setUI({ admin: true }); return true;
  }
  return false;
}
export function logout() { sessionStorage.removeItem("homzy-admin"); setUI({ admin: false }); }

export function nextId(prefix, list) {
  const year = new Date().getFullYear();
  const nums = list.map((x) => parseInt(String(x.id).split("-").pop(), 10)).filter((n) => !isNaN(n));
  const base = prefix === "ENQ" ? 500 : 1000;
  return `${prefix}-${year}-${Math.max(base, ...nums) + 1}`;
}

export function addBooking(data) {
  load();
  const b = { ...data, id: nextId("HOM", state.bookings), createdAt: new Date().toISOString(), status: "New", notes: "" };
  update("bookings", (l) => [b, ...l]);
  return b;
}
export function addEnquiry(data) {
  load();
  const e = { ...data, id: nextId("ENQ", state.enquiries), createdAt: new Date().toISOString() };
  update("enquiries", (l) => [e, ...l]);
  return e;
}
export const uid = () => Math.random().toString(36).slice(2, 9);

export function customersFrom(bookings) {
  const map = new Map();
  [...bookings].sort((a, b) => a.createdAt.localeCompare(b.createdAt)).forEach((b) => {
    const k = b.phone.replace(/\D/g, "").slice(-10);
    const c = map.get(k) || { key: k, name: b.name, phone: b.phone, email: b.email, bookings: [] };
    c.name = b.name; if (b.email) c.email = b.email;
    c.bookings.push(b); map.set(k, c);
  });
  return [...map.values()].map((c) => ({ ...c, latest: c.bookings[c.bookings.length - 1] }));
}

export const STATUSES = ["New", "Confirmed", "In Progress", "Completed", "Cancelled"];
export const isValidPhone = (p) => /^(\+?91[\s-]?)?[6-9]\d{9}$/.test(p.replace(/[\s-]/g, ""));

export const BOOKING_COLS = ["id", "name", "phone", "email", "company", "propertyType", "category", "service", "address", "city", "date", "time", "frequency", "size", "staff", "requirements", "contactMethod", "status", "notes", "createdAt"];
export function toCSV(rows, cols = BOOKING_COLS) {
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [cols.join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
}
export function downloadFile(text, name, type = "text/csv;charset=utf-8") {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Generic list helpers used by the admin panel.
export const patchItem = (key, id, patch) => update(key, (l) => l.map((x) => (x.id === id ? { ...x, ...patch } : x)));
export const removeItem = (key, id) => update(key, (l) => l.filter((x) => x.id !== id));
export function saveItem(key, item, prefix) {
  if (item.id) return patchItem(key, item.id, item);
  update(key, (l) => [{ ...item, id: `${prefix}-${uid()}` }, ...l]);
}
export const setContent = (patch) => update("content", (c) => ({ ...c, ...patch }));
export const removeSamples = () => { update("bookings", (l) => l.filter((x) => !x.sample)); update("enquiries", (l) => l.filter((x) => !x.sample)); };
export const getAll = () => load();
export function resetAll() { state = structuredClone(SEEDS); save(); emit(); }
export const DEFAULT_CONTENT = SEED_CONTENT;
