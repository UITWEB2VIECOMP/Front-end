import React, { useState } from 'react'
import '../styles/Modal.css'
import { TiPlus } from "react-icons/ti"
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
      <button onClick={toggleModal} className='w-44 h-14 flex'>
        <TiPlus />
        <p>Create contest</p>
      </button>

      {
        modal && (
          <div className="modal">
            <div className="overlay"></div>
            <div className="modal-content">
              <div className="title-project">
                  <h2>Create Project</h2>
                  <button className="close-modal" onClick={toggleModal}>
                  <IoMdClose />
                  </button>
              </div>
              <form className="form-create">
                  <div className="name-project">
                      <p className="text-label" htmlFor="">Name :</p>
                      <input className="input-modal" type="text" placeholder=" Name of project" autoFocus required />
                  </div>
                  <div className="desc-project">
                      <label className="text-label" htmlFor="">Description :</label>
                      <input className="Desc-table" type="text" placeholder=" Desciption..." required />
                  </div>
                  <div className="create-project">
                      <button className="create-project1" type="submit">Create project</button>
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
