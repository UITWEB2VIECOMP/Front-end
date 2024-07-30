import React from 'react'
import '../styles/ManageContest.css'
import Modal from '../components/Modal'
import Dropdown from '../components/Dropdown'

const ManageContest = () => {
  return (
    <>
      <div className='w-full h-full  flex items-center mn-container flex-col'>
        <div className="title py-3.5">
          <h1>Manage contest</h1>
        </div>
        <div className='w-full flex justify-end px-8'>
          <Modal />
        </div>
        <div className=''>
          <Dropdown />
        </div>
      </div>
    </>
  )
}

export default ManageContest