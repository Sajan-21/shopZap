import React, { useState } from "react";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className="flex justify-between items-center p-3 bg-gray-800 text-white px-10">
        <div className="md:hidden">
          <button className="open-btn" onClick={() => setIsOpen(true)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div className={`offcanvas ${isOpen ? "show" : ""}`}>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              &times;
            </button>
            <div className="bg-gray-950 text-white h-screen">
              <ul className="flex flex-col gap-5 pt-10">
                <li className="me-3 py-2 rounded-e-lg ps-3 bg-slate-800 hover:bg-slate-600 cursor-pointer">
                  Dashboard
                </li>
                <li className="me-3 py-2 rounded-e-lg ps-3 bg-slate-800 hover:bg-slate-600 cursor-pointer">
                  Products
                </li>
                <li className="me-3 py-2 rounded-e-lg ps-3 bg-slate-800 hover:bg-slate-600 cursor-pointer">
                  Customers
                </li>
                <li className="me-3 py-2 rounded-e-lg ps-3 bg-slate-800 hover:bg-slate-600 cursor-pointer">
                  Sellers
                </li>
                <li className="me-3 py-2 rounded-e-lg ps-3 bg-slate-800 hover:bg-slate-600 cursor-pointer">
                  Orders status
                </li>
                <li className="me-3 py-2 rounded-e-lg ps-3 bg-slate-800 hover:bg-slate-600 cursor-pointer">
                  Categories
                </li>
              </ul>
            </div>
          </div>

          {isOpen && (
            <div className="overlay" onClick={() => setIsOpen(false)} />
          )}
        </div>
        <div className="logo-font text-2xl">shopZap</div>
        <div>
          {" "}
          <FontAwesomeIcon icon={faUser} className="text-xl" />{" "}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
