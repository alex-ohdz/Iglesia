import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';

export default function BtnHome({ href = "/", text = "INICIO", className = "bg-slate-500", rounded = "rounded-r-md" }) {
  return (
    <Link href={href} passHref>
      <button
        type="button"
        className={`flex text-white items-center shadow-lg p-2 text-sm pr-3 tracking-wider hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 ${rounded} ${className}`}
      >
        <HomeIcon className="mr-2" />
        {text}
      </button>
    </Link>
  );
}
