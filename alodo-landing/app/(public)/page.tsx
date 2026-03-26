import Link from "next/link";

export default function PublicHomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20">
      <div className="max-w-3xl space-y-6">
        <span className="inline-flex rounded-full border border-[#d8dee6] bg-white px-4 py-1 text-sm text-[#667085]">
          Alodo Platform
        </span>
        <h1 className="text-5xl font-bold tracking-tight text-[#114b5f]">
          SaaS d&apos;inclusion financiere pour MPME, agents terrain et institutions.
        </h1>
        <p className="text-lg text-[#667085]">
          La structure applicative est prete. Les parcours publics, d&apos;authentification,
          d&apos;onboarding et de dashboard sont maintenant separes.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/login"
            className="rounded-md bg-[#114b5f] px-5 py-3 font-semibold text-white"
          >
            Connexion
          </Link>
          <Link
            href="/register"
            className="rounded-md border border-[#114b5f] px-5 py-3 font-semibold text-[#114b5f]"
          >
            Creer un compte
          </Link>
        </div>
      </div>
    </main>
  );
}
