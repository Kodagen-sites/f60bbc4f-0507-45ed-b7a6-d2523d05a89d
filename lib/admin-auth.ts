import { cookies } from "next/headers";

export const ADMIN_COOKIE = "rr_admin_session";

/** Credentials come from env, with dev-safe defaults for local/preview. */
export function adminEmail() {
  return process.env.ADMIN_EMAIL || "owner@therusticroast.ca";
}
export function adminPassword() {
  return process.env.ADMIN_PASSWORD || "rusticroast";
}
function sessionToken() {
  return process.env.ADMIN_SESSION_SECRET || "rr-admin-ok";
}

export function isValidLogin(email: string, password: string) {
  return (
    email.trim().toLowerCase() === adminEmail().toLowerCase() &&
    password === adminPassword()
  );
}

export async function isAuthed() {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === sessionToken();
}

export async function setSession() {
  const store = await cookies();
  store.set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}
