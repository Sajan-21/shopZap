import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";

function Nav() {
  return (
    <div>
      <nav className='flex justify-between items-center px-5 p-3 bg-green-950 text-white logo-font'>
        <div className='text-center font-bold text-white text-2xl'>
            shopZap
        </div>
        <div>
            <ul className='flex gap-20'>
                <li>Home</li>
                <li>Shop</li>
                <li>About</li>
                <li> <FontAwesomeIcon icon={faHeart} /> </li>
                <li><FontAwesomeIcon icon={faCartShopping} /></li>
                <li><FontAwesomeIcon icon={faUser} /></li>
            </ul>
        </div>
      </nav>
    </div>
  )
}

export default Nav
