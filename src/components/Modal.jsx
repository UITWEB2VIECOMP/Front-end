import React, { useState } from 'react'
import '../styles/Modal.css'
import { FaPlus } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"

const Modal = () => {

  const [modal, setModal] = useState(false)

  const toggleModal = () => {
    setModal(!modal)
  }

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <div onClick={toggleModal} className='btn w-44 h-14 flex items-center justify-evenly cursor-pointer rounded-2xl'>
        <FaPlus className='w-5 h-5' />
        <p>Create contest</p>
      </div>

      {
        modal && (
          <div className="modal">
            <div className="overlay"></div>
            <div className="modal-content">
              <div className="title-project">
                  <h2>Create Contest</h2>
                  <button className="close-modal" onClick={toggleModal}>
                  <IoMdClose />
                  </button>
              </div>
              <form className="form-create">
                  <div className="upperform">
                    <div>
                      <label htmlFor="">Name: </label>
                      <input type="text" placeholder='Name' />
                    </div>
                    <div>
                      <label htmlFor="">Start date: </label>
                      <input type="date" />
                    </div>
                    <div>
                      <label htmlFor="">End date: </label>
                      <input type="date"/>
                    </div>
                  </div>
                  <div className="midform">
                    <div>
                      <label htmlFor="">Contest description: </label>
                      <input type="text" placeholder='Description' />
                    </div>
                    <div>
                      <div>
                        <label htmlFor="">Prize: </label>
                        <input type="text" placeholder='Prize' />
                      </div>
                      <div>
                        <label htmlFor="">Image: </label>
                        <input type="file"  />
                      </div>
                    </div>
                  </div>
              </form>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Modal
