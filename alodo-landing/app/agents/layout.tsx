export default function AgentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className="mx-auto max-w-6xl px-6 py-10">{children}</section>;
}
