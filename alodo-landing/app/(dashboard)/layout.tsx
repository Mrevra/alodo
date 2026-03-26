import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/vendeur", label: "Vendeur" },
  { href: "/artisan", label: "Artisan" },
  { href: "/transformateur", label: "Transformateur" },
  { href: "/prestataire", label: "Prestataire" },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4">
          <Link href="/" className="text-lg font-bold text-[#114b5f]">
            Alodo
          </Link>
          <nav className="flex flex-wrap gap-4 text-sm text-[#667085]">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
    </div>
  );
}
