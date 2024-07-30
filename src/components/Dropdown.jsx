import React, { useState } from 'react';
import { MdArrowDropDownCircle } from 'react-icons/md';
import '../styles/Dropdown.css';

const Dropdown = () => {
  const [show, setShow] = useState(false);

  const toggleDropdown = () => {
    setShow(!show);
  };

  return (
    <>
      <div className="contest-dropdown h-16 flex items-center justify-between px-8 rounded-xl">
        <h1>Contest 1</h1>
        <div className='flex flex-row items-center gap-x-3'>
          <MdArrowDropDownCircle 
            className={`w-8 h-8 cursor-pointer transition-transform duration-300 ${show ? 'rotate-180' : ''}`} 
            onClick={toggleDropdown} 
          />
        </div>
      </div>
      {
        show && (
          <div className='dropdown-content h-16 flex items-center rounded-xl justify-between px-8'>
            <h1>Student 1</h1>
            <div className=''>
              <p>Submitted</p>
              <p>11:59:30 PM</p>
            </div>
          </div>
      )}
    </>
  );
};

export default Dropdown;
