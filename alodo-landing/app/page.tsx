import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Smartphone, 
  Calculator, 
  Target, 
  UserCheck,
  ChevronRight,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">

      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section className="bg-white pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">

          {/* Brand Title */}
          <div>
            <h1 className="text-5xl md:text-6xl font-serif font-black text-[#1a3c6b] mb-3 tracking-tight">
              Alɔdó
            </h1>
            {/* Bénin Flag Bar */}
            <div className="flex justify-center items-center gap-0 mx-auto w-48 h-2 rounded-full overflow-hidden">
              <div className="flex-1 h-full bg-[#008751]" />
              <div className="flex-1 h-full bg-[#FCD116]" />
              <div className="flex-1 h-full bg-[#E8112D]" />
            </div>
          </div>

          {/* Tagline */}
          <div className="space-y-2">
            <p className="text-2xl md:text-3xl font-serif font-bold text-gray-800">
              Un accès unique, une inclusion financière totale
            </p>
            <p className="text-lg text-gray-500 font-sans max-w-2xl mx-auto">
              Votre portail pour la formalisation et la croissance des MPME au Bénin.
            </p>
          </div>

          {/* CTA Buttons — EducMaster style: full-width dark navy */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto pt-4">
            <Link href="#solutions" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full h-14 px-8 text-base font-bold bg-[#1a3c6b] hover:bg-[#14305a] text-white rounded-md border-none shadow-md flex items-center gap-3"
              >
                <Smartphone className="h-5 w-5" />
                Accéder aux Solutions
              </Button>
            </Link>
            <Link href="#context" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full h-14 px-8 text-base font-bold border-2 border-[#1a3c6b] text-[#1a3c6b] hover:bg-[#1a3c6b]/5 rounded-md shadow-md flex items-center gap-3"
              >
                <ChevronRight className="h-5 w-5" />
                En savoir plus
              </Button>
            </Link>
          </div>
        </div>
      </section>



      {/* =========================================================
          CONTEXTE SECTION
      ========================================================= */}
      <section id="context" className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-[#1a3c6b]">Le défi des MPME béninoises</h2>
            <div className="flex justify-center mt-3 gap-0 w-24 h-1 mx-auto rounded overflow-hidden">
              <div className="flex-1 bg-[#008751]" />
              <div className="flex-1 bg-[#FCD116]" />
              <div className="flex-1 bg-[#E8112D]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-5 text-base text-gray-600 font-sans leading-relaxed">
              <p>
                Au Bénin, les MPME représentent plus de <strong className="text-[#1a3c6b]">80%</strong> du tissu économique, mais restent exclues du système financier formel à cause de barrières structurelles :
              </p>
              <ul className="space-y-3 mt-4">
                {[
                  "Manque d'informations fiables sur les marchés locaux",
                  "Absence de comptabilité formelle et de preuves de viabilité",
                  "Accès limité aux outils de financement adaptés",
                  "Faible niveau de formalisation administrative",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 w-5 h-5 rounded-full bg-[#008751] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#1a3c6b] text-white rounded-xl p-8 shadow-lg space-y-4">
              <h3 className="text-2xl font-serif font-bold">Notre Mission</h3>
              <div className="w-16 h-1 rounded" style={{background: 'linear-gradient(to right, #008751, #FCD116, #E8112D)'}} />
              <p className="text-white/80 leading-relaxed text-base">
                "Réduire les barrières entre l'économie informelle et le système financier formel en combinant technologie accessible et action de proximité."
              </p>
              <div className="pt-4 border-t border-white/20">
                <span className="text-xs font-bold uppercase tracking-widest text-[#FCD116]">Approche Hybride · Bénin</span>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* =========================================================
          SOLUTIONS SECTION
      ========================================================= */}
      <section id="solutions" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-[#1a3c6b]">Nos Solutions</h2>
            <div className="flex justify-center mt-3 gap-0 w-24 h-1 mx-auto rounded overflow-hidden">
              <div className="flex-1 bg-[#008751]" />
              <div className="flex-1 bg-[#FCD116]" />
              <div className="flex-1 bg-[#E8112D]" />
            </div>
            <p className="text-gray-500 mt-4 text-base">Un écosystème complet pour l'inclusion financière.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: Smartphone,
                title: "Information Sectorielle",
                desc: "Alertes personnalisées et recommandations concrètes via SMS & WhatsApp en langues locales.",
                color: "#008751",
              },
              {
                icon: Calculator,
                title: "Gestion Comptable",
                desc: "Un boîtier physique ultra-simple à 4 touches pour enregistrer achats/ventes sans smartphone.",
                color: "#1a3c6b",
              },
              {
                icon: Target,
                title: "Matching Financement",
                desc: "Centralisation intelligente des offres de banques et IMF adaptées à votre profil réel.",
                color: "#E8112D",
              },
              {
                icon: UserCheck,
                title: "Aide à la Formalisation",
                desc: "Assistant digital et humain pour accompagner vos démarches administratives.",
                color: "#FCD116",
              },
            ].map(({ icon: Icon, title, desc, color }, i) => (
              <Card key={i} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: color + '18', color }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-[#1a3c6b]">{title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed pl-16">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>



      {/* =========================================================
          FONCTIONNEMENT SECTION
      ========================================================= */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-[#1a3c6b]">Le Cycle Héroïque Alɔdó</h2>
            <div className="flex justify-center mt-3 gap-0 w-24 h-1 mx-auto rounded overflow-hidden">
              <div className="flex-1 bg-[#008751]" />
              <div className="flex-1 bg-[#FCD116]" />
              <div className="flex-1 bg-[#E8112D]" />
            </div>
            <p className="text-gray-500 mt-4 text-base">Comment nous transformons l'économie informelle.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { nr: "1", title: "Collecte Terrain", desc: "Via nos boîtiers physiques ou WhatsApp, sans smartphone." },
              { nr: "2", title: "Analyse Data", desc: "Traitement des flux pour générer une comptabilité formelle." },
              { nr: "3", title: "Profil Scoring", desc: "Score de crédit fiable basé sur l'activité réelle." },
              { nr: "4", title: "Accès Capital", desc: "Mise en relation avec les institutions financières." },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#1a3c6b] text-white flex items-center justify-center text-2xl font-black shadow-md">
                  {step.nr}
                </div>
                <h4 className="text-base font-serif font-bold text-[#1a3c6b]">{step.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* =========================================================
          IMPACT SECTION
      ========================================================= */}
      <section id="impact" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-[#1a3c6b]">Impact & Faisabilité</h2>
            <div className="flex justify-center mt-3 gap-0 w-24 h-1 mx-auto rounded overflow-hidden">
              <div className="flex-1 bg-[#008751]" />
              <div className="flex-1 bg-[#FCD116]" />
              <div className="flex-1 bg-[#E8112D]" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "90%", label: "Accessible (SMS/USSD)", accent: "#008751" },
              { value: "100%", label: "Offline Capability", accent: "#1a3c6b" },
              { value: "Faible", label: "Coût Hardware", accent: "#E8112D" },
              { value: "Rapide", label: "Déploiement", accent: "#FCD116" },
            ].map(({ value, label, accent }, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-6 text-center shadow-sm">
                <div className="text-3xl font-black mb-2" style={{ color: accent }}>{value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide font-bold">{label}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-8 space-y-4">
            <p className="text-base text-gray-600 leading-relaxed text-center">
              Notre solution n'est pas qu'un outil numérique. C'est un <strong className="text-[#1a3c6b]">changement de paradigme</strong> pour l'inclusion financière rurale et urbaine au Bénin.
            </p>
            <div className="flex justify-center pt-4">
              <Link href="#contact">
                <Button
                  size="lg"
                  className="h-14 px-10 text-base font-bold bg-[#1a3c6b] hover:bg-[#14305a] text-white rounded-md border-none shadow-md"
                >
                  Accompagner l'Innovation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}


      <footer id="contact" className="bg-[#1a3c6b] text-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-black">Alɔdó</h3>
              <div className="flex gap-0 w-20 h-1 rounded overflow-hidden">
                <div className="flex-1 bg-[#008751]" />
                <div className="flex-1 bg-[#FCD116]" />
                <div className="flex-1 bg-[#E8112D]" />
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Innovation hybride pour booster les MPME béninoises.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-serif font-bold uppercase tracking-wider text-sm text-[#FCD116]">Navigation</h4>
              <nav className="flex flex-col space-y-3 text-white/70 text-sm">
                <Link href="#context" className="hover:text-white transition-colors">Contexte</Link>
                <Link href="#solutions" className="hover:text-white transition-colors">Solutions</Link>
                <Link href="#how-it-works" className="hover:text-white transition-colors">Fonctionnement</Link>
                <Link href="#impact" className="hover:text-white transition-colors">Impact</Link>
              </nav>
            </div>

            <div className="space-y-4">
              <h4 className="font-serif font-bold uppercase tracking-wider text-sm text-[#FCD116]">Contact</h4>
              <div className="space-y-3 text-white/70 text-sm">
                <p>📍 Cotonou, Bénin</p>
                <p>📧 contact@alodo.bj</p>
                <p>📞 +229 01 00 00 00</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/40 text-xs">
            © 2026 Alɔdó Project — Hackaton Bénin · Produits Financiers Innovants pour les MPME
          </div>
        </div>
      </footer>
    </div>
  )
}
