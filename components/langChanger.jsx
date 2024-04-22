'use client'
import React, { useState,useRef,useEffect } from 'react';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import classNames from 'classnames';

// Define flags as an array of objects
const flags = [
  { code: 'en', imgF: '/icons/flags/en.png' },
  { code: 'es', imgF: '/icons/flags/es.png' },
  { code: 'po', imgF: '/icons/flags/po.png' },
];

const LangChanger = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [selectedFlag, setSelectedFlag] = useState(flags[1])
  const dropdownRef = useRef(null);

  const arrowProp = classNames(
    'text-amber-900',
    'transition-transform duration-200',
    {
      'rotate-180': isOpen, 
    }
  ) 

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);

  };
  const handleSelectFlag = (flag) => {
    setSelectedFlag(flag);
    setIsOpen(false); // Cierra el dropdown tras seleccionar una bandera
  };

  useEffect(()=> {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  
  }, [isOpen])
  
  return (
    <div className="relative px-2" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="flex items-center">
      <img src={selectedFlag.imgF} alt={selectedFlag.code + " flag"} className='w-6 h-6'/>
        <KeyboardArrowUpRoundedIcon className={arrowProp} />
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 right-6 bg-amber-50 shadow-lg rounded-lg" style={{ minWidth: '40px' }}>
          {flags.filter(flag => flag.code !== selectedFlag.code).map((flag, index) => (
            <img key={index} src={flag.imgF} alt={`${flag.code} flag`} className="w-6 h-6 m-2 cursor-pointer" onClick={() => handleSelectFlag(flag)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LangChanger;
