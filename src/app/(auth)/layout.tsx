export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center select-none">
      <h1>
        Welcome to <i> Ai_Chat</i> app
      </h1>
      <div className="max-w-sm w-full mx auto">{children}</div>
    </main>
  );
}
