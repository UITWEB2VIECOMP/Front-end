import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import '../styles/Grade_Modal.css'


const Grade_Modal = () => {
  const [modal, setModal] = useState(false)
  const [grade, setGrade] = useState('');

  const handleSubmit = () => {
    submitGrade(grade);
    toggleModal();
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  return (
    <>
      <div onClick={toggleModal} className='btn w-44 h-14 flex items-center justify-evenly cursor-pointer rounded-2xl'>
        <p>Final Score</p>
      </div>
      {modal && (
        <div className="modal">
          <div className="overlay" onClick={toggleModal}></div>
          <div className="modal-content">
            <div className="title-project">
              <h2>Input Final Grade</h2>
              <button className="close-modal" onClick={toggleModal}>
                <IoMdClose />
              </button>
            </div>
            <form className="form-create" onSubmit={(e) => e.preventDefault()}>
              <div className="input-group">
                <label htmlFor="grade">Final Grade: </label>
                <input
                  type="number"
                  id="grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder="Enter final grade"
                  className="input"
                />
              </div>
              <button type="button" className="submit-btn" onClick={handleSubmit}>Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Grade_Modal