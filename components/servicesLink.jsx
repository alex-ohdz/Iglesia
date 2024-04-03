// 'use client'
// import { useEffect, useState } from "react";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import Link from "next/link";
// import useActiveSection from "../hooks/useActiveSection";

// const buttonText = [
//   { text: "Bautismos", link: "bautismos" },
//   { text: "Casamientos", link: "casamientos" },
//   { text: "Ejemplo3", link: "ejemplo3" },
//   { text: "Ejemplo4", link: "ejemplo4" },
// ];

// const ServicesLinks = ({ isServiceActiveProp }) => {
//   const [showDropdown, setShowDropdown] = useState(false);
  
//   useEffect(() => {
//     setShowDropdown(isServiceActiveProp); 
//   }, [isServiceActiveProp]);

//   const toggleDropdown = () => setShowDropdown(!showDropdown);

//   const activeSection = useActiveSection(buttonText);
//   const isAnyServiceActive = buttonText.some(item => item.link === activeSection);

//   return (
//     <div className="relative ml-2">
//       <button
//         onClick={toggleDropdown}
//         className={`text-lg font-playfair tracking-wider flex items-center transition-colors duration-300 ${
//           isAnyServiceActive || showDropdown ? "text-yellow-500" : "text-amber-800 hover:text-yellow-500"
//         }`}
//       >
//         Servicios
//         <ArrowDropDownIcon />
//       </button>
//       {showDropdown && (
        
//         <div className="fixed top-14 left-0 w-full shadow-md z-50 bg-white">
//           <hr />
//           <nav className="flex justify-center space-x-4">
//             {buttonText.map((item, index) => (
//               <Link
//                 key={index}
//                 href={`#${item.link}`}
//                 className={`block px-4 py-1 text-md ${
//                   activeSection === item.link ? "text-yellow-500" : "text-amber-800"
//                 } hover:bg-gray-200 font-serif`}
//               >
//                 {item.text}
//               </Link>
//             ))}
//           </nav>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ServicesLinks;
