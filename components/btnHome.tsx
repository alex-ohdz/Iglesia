import Link from "next/link";
import { ChevronLeftIcon } from "@components/icons";

export default function BtnHome() {
  return (
    <Link href="/" className="absolute left-0">
      <span className="flex items-center gap-2 rounded-r-md bg-gray-500 px-3 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-gray-600">
        <ChevronLeftIcon className="h-4 w-4" />
        Inicio
      </span>
    </Link>
  );
}
