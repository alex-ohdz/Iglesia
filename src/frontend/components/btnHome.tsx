import Link from "next/link";
import { ChevronLeftIcon } from "@components/icons";

export default function BtnHome() {
  return (
    <Link href="/" className="absolute left-0">
      <span className="flex items-center gap-2 rounded-r-md bg-sanctuary-terracotta px-3 py-2 text-sm font-display uppercase tracking-[0.18em] text-sanctuary-cream shadow-lg transition hover:bg-sanctuary-shadow">
        <ChevronLeftIcon className="h-4 w-4" />
        Inicio
      </span>
    </Link>
  );
}
