"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const COOKIE_NAME = "dash_auth";

export async function loginDashboard(formData: FormData) {
  const password = String(formData.get("password") || "");
  const expected = process.env.DASHBOARD_PASSWORD || "";
  if (!expected) {
    return { ok: false, error: "Dashboard password not set" } as const;
  }
  if (password !== expected) {
    return { ok: false, error: "Invalid password" } as const;
  }
  const jar = cookies();
  jar.set(COOKIE_NAME, "1", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 6 });
  revalidatePath("/dashboard");
  return { ok: true } as const;
}

export async function logoutDashboard() {
  const jar = cookies();
  jar.delete(COOKIE_NAME);
  revalidatePath("/dashboard");
  return { ok: true } as const;
}

export async function isDashboardAuthed() {
  const jar = cookies();
  return jar.get(COOKIE_NAME)?.value === "1";
}


