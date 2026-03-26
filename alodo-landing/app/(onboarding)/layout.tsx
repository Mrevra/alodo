export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-16">
      <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
        {children}
      </div>
    </main>
  );
}
