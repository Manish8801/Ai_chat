"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { cache } from "react";
import z from "zod";
import {
  LogInActionState,
  LogInFormInput,
  SignUpActionState,
  SignUpFormInput,
} from "../lib/types";
import { logInFormSchema, signUpFormSchema } from "../lib/validator";

export const getCurrentUser = cache(async () => {
  const session = await getSession();
  const sessionUserId = session?.user?.id;
  if (!sessionUserId) {
    return null;
  }

  return await prisma.user.findUnique({
    where: { id: sessionUserId },
  });
});
export const requireCurrentUser = async () => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");
  return user;
};
export async function getSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session;
}

export async function redirectIfAuthenticated() {
  const session = await getSession();
  if (session) redirect("/", RedirectType.replace);
}

export async function signUpWithEmail(
  body: SignUpFormInput,
): Promise<SignUpActionState> {
  const validatedFields = signUpFormSchema.safeParse(body);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid fields provided",
      error: z.treeifyError(validatedFields.error).properties,
    };
  }

  const { email, name, password, rememberMe = false } = validatedFields.data;
  try {
    await auth.api.signUpEmail({
      body: {
        email,
        name,
        password,
        rememberMe,
      },
    });
  } catch (error: unknown) {
    return {
      success: false,
      message: "Error signing up",
      error,
    };
  }

  redirect("/chats");
}

export async function logInWithEmail(
  body: LogInFormInput,
): Promise<LogInActionState> {
  const validatedFields = logInFormSchema.safeParse(body);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid fields provided",
      error: z.treeifyError(validatedFields.error),
    };
  }

  const { email, password } = validatedFields.data;
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (error: unknown) {
    return {
      success: false,
      message: "Error logging in",
      error,
    };
  }

  redirect("/chats");
}
