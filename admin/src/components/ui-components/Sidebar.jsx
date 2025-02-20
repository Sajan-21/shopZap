import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartSimple, faMoneyCheckDollar, faShoppingBag, faTableCells, faUserGroup, faUsers, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

function Sidebar(props) {
  const navigate = useNavigate()
  return (
    <div className='bg-gray-950 text-white h-screen max-lg:h-full max-md:h-full'>
      <ul className='p-5 space-y-2'>
        <li className='hover:bg-gray-800 p-2 pe-5 rounded-lg flex items-center gap-3 cursor-pointer' onClick={() => navigate(`/dashboard/${props.authId}`)}> <FontAwesomeIcon icon={faTableCells} /> Dashboard</li>
        <li className='hover:bg-gray-800 p-2 pe-5 rounded-lg flex items-center gap-3 cursor-pointer' onClick={() => navigate(`/orders/${props.authId}`)}> <FontAwesomeIcon icon={faChartSimple} /> Order status</li>
        <li className='hover:bg-gray-800 p-2 pe-5 rounded-lg flex items-center gap-3 cursor-pointer' onClick={() => navigate(`/products/${props.authId}`)}> <FontAwesomeIcon icon={faShoppingBag} /> Products</li>
        <li className='hover:bg-gray-800 p-2 pe-5 rounded-lg flex items-center gap-3 cursor-pointer' onClick={() => navigate(`/customers/${props.authId}`)}> <FontAwesomeIcon icon={faUsers} /> Customers</li>
        <li className='hover:bg-gray-800 p-2 pe-5 rounded-lg flex items-center gap-3 cursor-pointer' onClick={() => navigate(`/sellers/${props.authId}`)}> <FontAwesomeIcon icon={faUserGroup} /> Sellers</li>
        <li className='hover:bg-gray-800 p-2 pe-5 rounded-lg flex items-center gap-3 cursor-pointer' onClick={() => navigate(`/staffs/${props.authId}`)}> <FontAwesomeIcon icon={faUserTie} /> Staffs</li>
        <li className='hover:bg-gray-800 p-2 pe-5 rounded-lg flex items-center gap-3 cursor-pointer' onClick={() => navigate(`/finance/${props.authId}`)}> <FontAwesomeIcon icon={faMoneyCheckDollar} /> Financial details</li>
      </ul>
    </div>
  )
}

export default Sidebar
