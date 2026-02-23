export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main className="select-none">{children}</main>;
}
