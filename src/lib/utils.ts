import { clsx, type ClassValue } from "clsx";
import { headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { auth } from "./auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

export async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/sign-up");
}

export async function redirectIfAuthenticated() {
  const session = await getSession();
  if (session) redirect("/", RedirectType.replace);
}
