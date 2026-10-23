import { describe, expect, it } from "vitest";
import { nextId, customersFrom, isValidPhone } from "@/homzy/store.js";

describe("HOMZY demo rules", () => {
  it("booking references follow HOM-<year>-<next number> starting after 1000", () => {
    const year = new Date().getFullYear();
    expect(nextId("HOM", [])).toBe(`HOM-${year}-1001`);
    expect(nextId("HOM", [{ id: "HOM-2026-1004" }, { id: "HOM-2026-1002" }])).toBe(`HOM-${year}-1005`);
  });

  it("enquiry references start after 500", () => {
    expect(nextId("ENQ", [])).toBe(`ENQ-${new Date().getFullYear()}-501`);
  });

  it("repeat bookings from the same mobile number become one customer", () => {
    const b = (id: string, phone: string, service: string, createdAt: string) => ({ id, name: "Asha", phone, email: "", service, createdAt });
    const list = customersFrom([
      b("HOM-1", "98765 00001", "Deep Cleaning", "2026-01-01T00:00:00Z"),
      b("HOM-2", "+91 9876500001", "Pest Control", "2026-02-01T00:00:00Z"),
      b("HOM-3", "9876500002", "Gardening", "2026-01-15T00:00:00Z"),
    ]);
    expect(list).toHaveLength(2);
    const asha = list.find((c) => c.bookings.length === 2);
    expect(asha?.latest.service).toBe("Pest Control");
  });

  it("accepts 10-digit Indian mobiles and rejects others", () => {
    expect(isValidPhone("9812345678")).toBe(true);
    expect(isValidPhone("+91 98123 45678")).toBe(true);
    expect(isValidPhone("1234567890")).toBe(false);
    expect(isValidPhone("98123")).toBe(false);
  });
});
