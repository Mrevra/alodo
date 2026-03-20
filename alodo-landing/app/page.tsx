import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  ArrowRight, 
  Smartphone, 
  Calculator, 
  Target, 
  UserCheck, 
  Mail, 
  MapPin, 
  Phone 
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans bg-white">
      {/* Hero Section */}
      <section className="py-24 bg-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="bg-amber-500 text-white mb-4 px-4 py-1 text-sm font-semibold border-none">Innovation Hackathon 2026</Badge>
            <h1 className="text-5xl md:text-7xl font-serif font-black text-gray-900 mb-6 leading-tight">
              Alɔdó : Propulser les <span className="text-cyan-600">MPME au Bénin</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto font-sans leading-relaxed">
              Transformer chaque activité économique informelle en opportunité de croissance et d'accès au financement grâce à une technologie accessible et humaine.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 h-12 rounded-lg">
                Découvrir nos solutions
              </Button>
              <Button variant="outline" size="lg" className="border-cyan-600 text-cyan-600 hover:bg-cyan-50 px-8 h-12 rounded-lg">
                Notre Vision
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Context & Problem Section */}
      <section id="context" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif font-black text-gray-900 mb-6">Le défi des MPME béninoises</h2>
              <div className="space-y-6 text-lg text-gray-600 font-sans">
                <p>
                  Au Bénin, les Micro, Petites et Moyennes Entreprises (MPME) constituent le cœur de notre économie, mais font face à des barrières structurelles majeures :
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-3 items-start">
                    <span className="text-amber-500 font-bold mt-1">✓</span>
                    <span>Manque d'informations fiables sur les marchés locaux.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-amber-500 font-bold mt-1">✓</span>
                    <span>Absence de comptabilité formelle et de preuves de viabilité.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-amber-500 font-bold mt-1">✓</span>
                    <span>Accès limité aux outils de financement adaptés.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-amber-500 font-bold mt-1">✓</span>
                    <span>Faible niveau de formalisation administrative.</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-cyan-900 rounded-3xl p-10 text-white shadow-xl">
              <h3 className="text-3xl font-serif font-black mb-6">Notre Mission</h3>
              <p className="text-xl text-cyan-50 font-sans leading-relaxed">
                "Réduire les barrières entre l'économie informelle et le système financier formel en combinant technologie accessible et action de proximité."
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-1 bg-amber-500 rounded-full"></div>
                <span className="text-amber-500 font-bold tracking-widest uppercase text-sm">Approche Hybride</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-black text-gray-900 leading-tight">Nos Solutions Hybrides</h2>
            <p className="text-xl text-gray-600 mt-4">Un écosystème complet pour l'inclusion financière.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* P1: Information Sectorielle */}
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 mx-auto mb-4">
                  <Smartphone className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900">Information Sectorielle</h3>
                <p className="text-gray-600 font-sans text-sm leading-relaxed">
                  Alertes personnalisées et recommandations concrètes via SMS & WhatsApp, langues locales.
                </p>
              </CardContent>
            </Card>

            {/* P2: Gestion Comptable */}
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-amber-50">
              <CardContent className="pt-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 mx-auto mb-4">
                  <Calculator className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900">Gestion Comptable</h3>
                <p className="text-gray-600 font-sans text-sm leading-relaxed">
                  Un boîtier physique ultra-simple pour enregistrer achats/ventes sans smartphone.
                </p>
              </CardContent>
            </Card>

            {/* P3: Matching Financement */}
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 mx-auto mb-4">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900">Matching Financement</h3>
                <p className="text-gray-600 font-sans text-sm leading-relaxed">
                  Centralisation intelligente des offres de banques et IMF adaptées à votre profil.
                </p>
              </CardContent>
            </Card>

            {/* P4: Aide à la Formalisation */}
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 mx-auto mb-4">
                  <UserCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900">Aide à la Formalisation</h3>
                <p className="text-gray-600 font-sans text-sm leading-relaxed">
                  Assistant digital et humain pour accompagner vos démarches administratives.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-black text-gray-900">Le Cycle Héroïque Alɔdó</h2>
            <p className="text-xl text-gray-600 mt-4 font-sans">Comment nous transformons l'économie informelle.</p>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-cyan-100 z-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
              {[
                { nr: "1", title: "Collecte Terrain", desc: "Via nos boîtiers physiques ou WhatsApp, sans besoin de smartphone." },
                { nr: "2", title: "Analyse Data", desc: "Traitement intelligent des flux pour générer une comptabilité formelle." },
                { nr: "3", title: "Profil Scoring", desc: "Création d'un score de crédit fiable basé sur l'activité réelle." },
                { nr: "4", title: "Accès Capital", desc: "Mise en relation avec les institutions financières pour le déploiement." }
              ].map((step, i) => (
                <div key={i} className="space-y-6 relative z-10">
                  <div className="w-20 h-20 rounded-full bg-cyan-600 text-white flex items-center justify-center mx-auto text-2xl font-black shadow-lg">
                    {step.nr}
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-gray-900">{step.title}</h4>
                  <p className="text-gray-600 font-sans">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-24 bg-cyan-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-serif font-black">Impact attendu & Faisabilité</h2>
              <p className="text-xl text-cyan-50 font-sans leading-relaxed">
                Notre solution n'est pas qu'un outil numérique. C'est un changement de paradigme pour l'inclusion financière rurale et urbaine au Bénin.
              </p>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-amber-500 font-bold">✓</span>
                  <span>Réduction massive de l'informalité bancaire.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-500 font-bold">✓</span>
                  <span>Augmentation du taux d'acceptation des crédits MPME.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-500 font-bold">✓</span>
                  <span>Prise de décision basée sur des données réelles.</span>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 p-8 rounded-2xl text-center">
                <div className="text-4xl font-black text-amber-500 mb-2">90%</div>
                <div className="text-sm uppercase tracking-widest text-cyan-300">Accessibilité (SMS/USSD)</div>
              </div>
              <div className="bg-white/10 p-8 rounded-2xl text-center">
                <div className="text-4xl font-black text-white mb-2">100%</div>
                <div className="text-sm uppercase tracking-widest text-cyan-300">Offline Capability</div>
              </div>
              <div className="bg-white/10 p-8 rounded-2xl text-center">
                <div className="text-4xl font-black text-amber-500 mb-2">Low</div>
                <div className="text-sm uppercase tracking-widest text-cyan-300">Hardware Cost</div>
              </div>
              <div className="bg-white/10 p-8 rounded-2xl text-center">
                <div className="text-4xl font-black text-white mb-2">Fast</div>
                <div className="text-sm uppercase tracking-widest text-cyan-300">Implementation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-3xl font-serif font-black text-cyan-400 mb-6">Alɔdó</h3>
              <p className="text-gray-400 font-sans text-lg max-w-md leading-relaxed">
                Innovation hybride pour booster les MPME béninoises. Un pont entre tradition informelle et modernité financière.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-serif font-bold mb-6">Navigation</h4>
              <nav className="flex flex-col space-y-4 text-gray-400 font-sans">
                <Link href="#context" className="hover:text-cyan-400 transition-colors">Contexte</Link>
                <Link href="#solutions" className="hover:text-cyan-400 transition-colors">Solutions</Link>
                <Link href="#how-it-works" className="hover:text-cyan-400 transition-colors">Fonctionnement</Link>
              </nav>
            </div>
            <div>
              <h4 className="text-xl font-serif font-bold mb-6">Contact</h4>
              <div className="space-y-4 text-gray-400 font-sans text-lg">
                <p>📍 Cotonou, Bénin</p>
                <p>📧 contact@alɔdó.bj</p>
                <p>📞 +229 01 00 00 00</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-16 pt-8 text-center">
            <p className="text-gray-500 font-sans">
              © 2026 Alɔdó Project. Hackaton Bénin - Produits Financiers Innovants.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
