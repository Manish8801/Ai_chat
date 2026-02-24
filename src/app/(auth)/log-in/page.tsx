import { Metadata } from "next";
import LoginForm from "../../../features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Log In",
};
export default function LogInPage() {
  return <LoginForm />;
}
