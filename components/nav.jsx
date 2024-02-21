import Link from "next/link";

const NavText = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          className="text-black hover:text-stone-300 mr-4 transition-colors duration-300 text-base font-playfair tracking-wider"
        >
          {item.text}
        </Link>
      ))}
    </div>
  );
};
export default NavText;
