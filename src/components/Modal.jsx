import React, { useEffect, useState } from 'react'
import '../styles/Modal.css'
import { FaPlus } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';

const Modal = () => {

  const [modal, setModal] = useState(false)
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);
  const [datepicker, setDatePicker] = useState(false)

  const toggleModal = () => {
    setModal(!modal)
  }
  const toggleDatePicker = () => {
    setDatePicker(!datepicker)
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
                    <div className='datepicker'>
                        <button type="button" onClick={toggleDatePicker}>Select Start Date - End Date</button>
                        {datepicker &&(
                          <DateRange
                          editableDateInputs={true}
                          onChange={item => setState([item.selection])}
                          moveRangeOnFirstSelection={false}
                          ranges={state}
                        />
                          )
                        }

                    </div>
                  </div>
                  <div className="midform">
                    <div>
                      <label htmlFor="">Contest description: </label>
                      <textarea name="description" rows="4" cols="100" id=""></textarea>
                    </div>
                    <div className='other'>
                      <div>
                        <label htmlFor="">Prize: </label>
                        <input type="text" placeholder='Prize' />
                      </div>
                      <div>
                        <label htmlFor="">Image: </label>
                        <input className='file-input' type="file"  />
                      </div>
                    </div>
                  </div>
                  <hr style={{margin:"10px"}}/>
              </form>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Modal
