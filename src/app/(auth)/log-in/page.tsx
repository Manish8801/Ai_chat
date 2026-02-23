import LoginForm from "../../../features/auth/components/login-form";

export default function LogInPage() {
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
      <LoginForm />
    </section>
  );
}
