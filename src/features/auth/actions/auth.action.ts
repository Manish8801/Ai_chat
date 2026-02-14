import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export const getCurrentUser = async () => {
  try {
    const session = await getSession();
    const sessionUserId = session?.user?.id;

    if (!sessionUserId) {
      return null;
    }

    return await prisma.user.findUnique({
      where: { id: sessionUserId },
    });
  } catch (error: unknown) {
    console.log("Error fetching user:", error);
  }
};
export const requireCurrentUser = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");
  return user;
};
export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}
export async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/sign-up");
  return session;
}
export async function redirectIfAuthenticated() {
  const session = await getSession();
  if (session) redirect("/", RedirectType.replace);
}
