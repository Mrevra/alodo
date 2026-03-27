import Link from "next/link";

const rows = [
  ["Aujourd'hui", "Vente", "+ 45 000"],
  ["Aujourd'hui", "Paiement", "+ 20 000"],
  ["Hier", "Achat", "- 12 500"],
];

export default function VendeurSimpleHistoriquePage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.25em] text-[#667085]">
          Historique
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-[#101828]">
          Dernieres operations
        </h1>
      </div>

      <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
        <div className="grid grid-cols-3 bg-[#f7fbfc] px-5 py-3 text-sm font-medium text-[#667085]">
          <span>Date</span>
          <span>Type</span>
          <span>Montant</span>
        </div>
        {rows.map(([date, type, amount]) => (
          <div
            key={`${date}-${type}-${amount}`}
            className="grid grid-cols-3 border-t border-black/5 px-5 py-4 text-sm text-[#101828]"
          >
            <span>{date}</span>
            <span>{type}</span>
            <span className="font-medium text-[#114b5f]">{amount}</span>
          </div>
        ))}
      </div>

      <Link href="/vendeur/simple" className="text-sm font-medium text-[#114b5f]">
        Retour au dashboard simple
      </Link>
    </div>
  );
}
