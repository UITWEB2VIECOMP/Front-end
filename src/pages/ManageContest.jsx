import React from 'react'
import '../styles/ManageContest.css'
import Modal from '../components/Modal'
import Dropdown from '../components/Dropdown'

const ManageContest = () => {
  return (
    <>
      <div className='w-full h-full flex items-center flex-col'>
        <div className="py-3.5">
          <h1>Manage contest</h1>
        </div>
        <div className='flex justify-end'>
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