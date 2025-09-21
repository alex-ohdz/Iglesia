import Link from "next/link";
import PageShell from "@components/pageShell";

export default function SuccessPage() {
  return (
    <PageShell>
      <section className="flex min-h-[60vh] items-center justify-center px-4 py-20">
        <div className="max-w-xl rounded-2xl bg-white p-8 text-center shadow-xl">
          <h1 className="mb-4 text-3xl font-display text-sanctuaryBrick">
            ¡Gracias por tu donación!
          </h1>
          <p className="mb-8 font-body text-sanctuaryDeep">
            Tu donación ha sido procesada exitosamente.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-sanctuaryBrick px-6 py-3 font-display text-sm uppercase tracking-widest text-sanctuaryLinen shadow-md transition hover:bg-sanctuaryTerracotta"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
