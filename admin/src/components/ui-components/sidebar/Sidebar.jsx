import React from 'react'

function Sidebar() {
  return (
    <div className='w-1/6 bg-gray-950 text-white h-screen'>
      <ul className='flex flex-col gap-5'>
        <li className='me-3 bg-slate-600'>Dashboard</li>
        <li className='me-3 bg-slate-600'>Products</li>
        <li className='me-3 bg-slate-600'>Customers</li>
        <li className='me-3 bg-slate-600'>Sellers</li>
        <li className='me-3 bg-slate-600'>Orders</li>
      </ul>
    </div>
  )
}

export default Sidebar
