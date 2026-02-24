import { redirectIfAuthenticated } from "@/features/auth/actions/auth.action";
import SignUpForm from "@/features/auth/components/sign-up-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
}
export default async function SignUpPage() {
  await redirectIfAuthenticated();
  return <SignUpForm />;
}
