'use client'
import React, { useState } from 'react';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

// Define flags as an array of objects
const flags = [
  { code: 'en', imgF: '/icons/flags/en.png' },
  { code: 'es', imgF: '/icons/flags/es.png' },
  { code: 'po', imgF: '/icons/flags/po.png' },
];

const LangChanger = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [selectedFlag, setSelectedFlag] = useState(flags[1])

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleSelectFlag = (flag) => {
    setSelectedFlag(flag);
    setIsOpen(false); // Cierra el dropdown tras seleccionar una bandera
  };
  
  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="flex items-center">
      <img src={selectedFlag.imgF} alt={selectedFlag.code + " flag"} className='w-6 h-6'/>
        <KeyboardArrowDownRoundedIcon className="text-amber-900" />
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-amber-50 shadow-lg rounded-lg">
          {flags.filter(flag => flag.code !== selectedFlag.code).map((flag, index) => (
            <img key={index} src={flag.imgF} alt={`${flag.code} flag`} className="w-6 h-6 m-2 cursor-pointer" onClick={() => handleSelectFlag(flag)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LangChanger;
