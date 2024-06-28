import Link from "next/link";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
export default function BtnHome() {
  return (
    <Link href="/" className="absolute left-0" passHref>
      <button
        type="button"
        className="text-white shadow-lg p-2 bg-gray-500 rounded-r-md text-sm pr-3 tracking-wider"
      >
        <KeyboardReturnIcon /> INICIO
      </button>
    </Link>
  );
}
