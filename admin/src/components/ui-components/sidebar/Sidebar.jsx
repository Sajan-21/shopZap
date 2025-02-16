import React from 'react'

function Sidebar() {
  return (
    <div className='w-1/4 bg-gray-950 text-white h-screen max-md:hidden'>
      <ul className='flex flex-col gap-5 mt-5'>
        <li className='me-3 py-2 rounded-e-lg ps-3 bg-slate-800 hover:bg-slate-600 cursor-pointer'>Dashboard</li>
        <li className='me-3 py-2 rounded-e-lg ps-3 bg-slate-800 hover:bg-slate-600 cursor-pointer'>Products</li>
        <li className='me-3 py-2 rounded-e-lg ps-3 bg-slate-800 hover:bg-slate-600 cursor-pointer'>Customers</li>
        <li className='me-3 py-2 rounded-e-lg ps-3 bg-slate-800 hover:bg-slate-600 cursor-pointer'>Sellers</li>
        <li className='me-3 py-2 rounded-e-lg ps-3 bg-slate-800 hover:bg-slate-600 cursor-pointer'>Orders status</li>
        <li className='me-3 py-2 rounded-e-lg ps-3 bg-slate-800 hover:bg-slate-600 cursor-pointer'>Categories</li>
      </ul>
    </div>
  )
}

export default Sidebar
