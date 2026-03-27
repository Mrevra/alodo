import Link from "next/link";

const actions = [
  { href: "/vendeur/simple/action/vente", label: "Vente" },
  { href: "/vendeur/simple/action/achat", label: "Achat" },
  { href: "/vendeur/simple/action/dette", label: "Dette" },
  { href: "/vendeur/simple/action/paiement", label: "Paiement" },
];

const sections = [
  { href: "/vendeur/simple/resume", label: "Resume" },
  { href: "/vendeur/simple/historique", label: "Historique" },
  { href: "/vendeur/simple/boitier", label: "Boitier" },
];

export default function VendeurSimplePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-[#114b5f] px-6 py-8 text-white shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-white/70">
          Vendeur simple
        </p>
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Dashboard ultra simple</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/75">
              Acces rapide aux actions du quotidien, sans surcharge visuelle.
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

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <p className="text-sm text-[#667085]">Action rapide</p>
            <h2 className="mt-2 text-xl font-semibold text-[#101828]">
              {action.label}
            </h2>
          </Link>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-2xl border border-black/5 bg-[#f7fbfc] p-5 transition hover:border-[#114b5f]/25 hover:bg-white"
          >
            <p className="text-sm text-[#667085]">Section</p>
            <h2 className="mt-2 text-lg font-semibold text-[#114b5f]">
              {section.label}
            </h2>
          </Link>
        ))}
      </section>
    </div>
  );
}
