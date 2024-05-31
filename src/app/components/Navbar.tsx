import React from 'react'

const Navbar = () => {
  return (
    <div className='max-w-8xl w-full flex justify-between items-center p-3 bg-white border-b'>
        <div>
            <p>Brand Name</p>
        </div>
        <div className='flex justify-end items-center'>
            <p>Satya Rai</p>
        </div>
    </div>
  )
}

export default Navbar