import Link from "next/link";
import ServicesLinks from "./linksService";


const NavText = ({ items, isMobile }) => {
 

  return (
    <div className={isMobile ? "flex flex-col" : "flex"}>
      <ServicesLinks isMobile={isMobile}/>
      
      {items.map((item, index) => (
        <div key={index} className={`${isMobile ? "mb-4" : "mr-4"}`}>
          <Link
            href={item.link}
            className="text-amber-800 hover:text-yellow-500 transition-colors duration-300 text-lg font-playfair tracking-wider"
          >
            {item.text}
          </Link>
        </div>
      ))}
      
    </div>
  );
};

export default NavText;
