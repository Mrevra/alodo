import Link from "next/link";

const sections = [
  { href: "/vendeur/avance/ventes", label: "Ventes" },
  { href: "/vendeur/avance/achats", label: "Achats" },
  { href: "/vendeur/avance/produits", label: "Produits" },
  { href: "/vendeur/avance/stock", label: "Stock" },
  { href: "/vendeur/avance/clients", label: "Clients" },
  { href: "/vendeur/avance/dettes", label: "Dettes" },
  { href: "/vendeur/avance/paiements", label: "Paiements" },
  { href: "/vendeur/avance/rapports", label: "Rapports" },
  { href: "/vendeur/avance/parametres", label: "Parametres" },
];

export default function VendeurAvancePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-[#0f172a] px-6 py-8 text-white shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-white/70">
          Vendeur avance
        </p>
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Dashboard principal</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/75">
              Vue centrale pour suivre les ventes, les achats, les produits et
              les indicateurs du point de vente.
            </p>
          </div>
          <Link
            href="/vendeur"
            className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
          >
            Retour vendeur
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <p className="text-sm text-[#667085]">Section</p>
            <h2 className="mt-2 text-xl font-semibold text-[#101828]">
              {section.label}
            </h2>
          </Link>
        ))}
      </section>
    </div>
  );
}
