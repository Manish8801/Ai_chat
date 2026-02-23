import z from "zod";
import { logInFormSchema, signUpFormSchema } from "./validator";

export enum PROVIDERS {
  GOOGLE = "google",
  GITHUB = "githun",
}

export type SignUpFormInput = z.infer<typeof signUpFormSchema>;
export type LogInFormInput = z.infer<typeof logInFormSchema>;

export type SignUpActionState =
  | { success: true }
  | { success: false; message: string; error?: unknown };

export type LogInActionState = SignUpActionState;
