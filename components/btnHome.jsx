import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";

export default function BtnHome({ isCentered }) {
  return (
    <div
      className={`${isCentered ? "flex justify-center" : "absolute left-0"}`}
    >
      <Link href="/" passHref>
        <button
          type="button"
          className={`flex items-center gap-3 text-white shadow-lg p-2 bg-gray-500 rounded-r-md text-sm pr-3 tracking-wider ${isCentered ? 'rounded-md' : 'rounded-r-md'}`}
        >
          <HomeIcon /> INICIO
        </button>
      </Link>
    </div>
  );
}
