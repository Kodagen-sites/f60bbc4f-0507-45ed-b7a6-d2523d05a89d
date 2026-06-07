"use server";

import { redirect } from "next/navigation";
import { isValidLogin, setSession, clearSession } from "@/lib/admin-auth";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!isValidLogin(email, password)) {
    const dest = `/admin/login?error=1&next=${encodeURIComponent(next)}`;
    redirect(dest);
  }

  await setSession();
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logoutAction() {
  await clearSession();
  redirect("/admin/login");
}
