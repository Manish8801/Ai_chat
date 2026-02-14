import { redirectIfAuthenticated } from "@/features/auth/actions/auth.action";
import SignUpForm from "@/features/auth/components/sign-up-form";

export default async function SignUpPage() {
  await redirectIfAuthenticated();
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-background px-4 py-:16 md:py-32">
      <div className="flex flex-row justify-center items-center gap-x-2">
        <h1 className="text-foreground">
          Welcome to <span>logo</span>
        </h1>
      </div>
      <p className="mt-2 text-lg text-muted-foreground ">
        Sign in below (We&apos;ll increase your messsage limites if you do )
      </p>
      <SignUpForm />
    </section>
  );
}
