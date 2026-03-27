import Link from "next/link";

const metrics = [
  { label: "Ventes du jour", value: "12" },
  { label: "Encaissements", value: "8" },
  { label: "Dettes ouvertes", value: "3" },
];

export default function VendeurSimpleResumePage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.25em] text-[#667085]">
          Resume
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-[#101828]">
          Vue rapide
        </h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-black/5 bg-[#f7fbfc] p-5"
          >
            <p className="text-sm text-[#667085]">{metric.label}</p>
            <p className="mt-2 text-3xl font-semibold text-[#114b5f]">
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      <Link href="/vendeur/simple" className="text-sm font-medium text-[#114b5f]">
        Retour au dashboard simple
      </Link>
    </div>
  );
}
