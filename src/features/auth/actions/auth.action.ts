import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export const getCurrentUser = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
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
