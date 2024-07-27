// src/components/Dropdown.js
import React, { useState } from 'react';
import { BsChat } from 'react-icons/bs';
import { FaCloudUploadAlt } from "react-icons/fa";
import '../styles/Dropdown.css'

const Dropdown = () => {
  const [show, setShow] = useState(false);
  const [upload, setUpload] = useState(false);

  const toggleDropdown = () => {
    setShow(!show);
  };

  const toggleUpload = () => {
    setUpload(!upload);
  };

  return (
    <div className="dropdown-container">
      <button className='dropdown-btn' onClick={toggleDropdown}>
        Toggle Dropdown <BsChat className='icons' />
      </button>
      {show && (
        <div className="dropdown-content">
          <div className="dropdown-item">
            <button className='comment-btn' onClick={toggleDropdown}>
              Comment <BsChat className='icons' />
            </button>
            {show && (
              <div className="comment">
                <div className="comment-div">
                  <input type="text" placeholder='Comment here...' autoFocus required />
                  <button className='btn-send' type="submit">
                    <BsChat className='icons' />
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="dropdown-item">
            <button className='move-btn' onClick={toggleUpload}>
              Upload <FaCloudUploadAlt className='icons' />
            </button>
            {upload && (
              <div className="upload">
                <div className="comment-div">
                  <input type="text" placeholder='Upload here...' autoFocus required />
                  <button className='btn-send' type="submit">
                    <FaCloudUploadAlt className='icons' />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
