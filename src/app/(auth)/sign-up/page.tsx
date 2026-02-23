import { redirectIfAuthenticated } from "@/features/auth/actions/auth.action";
import SignUpForm from "@/features/auth/components/sign-up-form";

export default async function SignUpPage() {
  await redirectIfAuthenticated();
  return (
    <section className="flex flex-col items-center gap-4 justify-center min-h-screen overflow-hidden bg-background px-4 py-:16 md:py-32">
      <div className="flex flex-row justify-center items-center">
        <h1 className="text-foreground">
          Welcome to{" "}
          <span className="font-extrabold mx-auto">
            <i>Ai_Chat</i>
          </span>
        </h1>
      </div>
      <SignUpForm />
    </section>
  );
}
