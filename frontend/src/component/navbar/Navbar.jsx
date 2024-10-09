import React, { useEffect, useRef, useState } from "react";
import logo from "/logo.png";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { BiPhoneCall } from "react-icons/bi";
const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const dropdownMenuRef = useRef(null);
  const dropdownServicesRef = useRef(null);

  const handleToggle = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };
  useEffect(() => {
    const hanldeOutside = (e) => {
      if (
        (dropdownMenuRef.current &&
          !dropdownMenuRef.current.contains(e.target)) ||
        (dropdownServicesRef.current &&
          !dropdownServicesRef.current.contains(e.target))
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", hanldeOutside);

    return () => {
      document.removeEventListener("mousedown", hanldeOutside);
    };
  }, [dropdownMenuRef, dropdownServicesRef]);

  const navItems = (
    <>
      <li>
        <a>Home</a>
      </li>
      <li ref={dropdownMenuRef} tabIndex={0} className="relative">
        <a
          role="button"
          onClick={() => handleToggle("menu")}
          className="cursor-pointer"
        >
          Menu {openDropdown === "menu" ? <FaAngleUp /> : <FaAngleDown />}
        </a>
        {openDropdown === "menu" && (
          <ul className="lg:absolute lg:left-0  lg:top-8 lg:mt-2 w-48 bg-base-100 rounded-lg lg:shadow-lg p-2 z-10 ">
            <li>
              <a className="">All</a>
            </li>
            <li>
              <a className="">Salad</a>
            </li>
            <li>
              <a className="">Pizza</a>
            </li>
          </ul>
        )}
      </li>
      <li ref={dropdownServicesRef} tabIndex={0} className="relative">
        <a
          role="button"
          onClick={() => handleToggle("services")}
          className="cursor-pointer"
        >
          Services{" "}
          {openDropdown === "services" ? <FaAngleUp /> : <FaAngleDown />}
        </a>
        {openDropdown === "services" && (
          <ul className="lg:absolute lg:left-0  lg:top-8 lg:mt-2 w-48 bg-base-100 rounded-lg lg:shadow-lg p-2 z-10 ">
            <li>
              <a className="whitespace-nowrap">Online Orders</a>
            </li>
            <li>
              <a className="whitespace-nowrap">Table Booking</a>
            </li>
            <li>
              <a className="whitespace-nowrap">Order Tracking</a>
            </li>
          </ul>
        )}
      </li>
      <li>
        <a>Offers</a>
      </li>
    </>
  );

  useEffect(()=>{
   const handleNav=()=>{
    const offset=window.scrollY
    if (offset >0) {
      setIsSticky(true)
    } else {
      setIsSticky(false)
    }
   }
    window.addEventListener("scroll",handleNav)
    return ()=>{window.addEventListener("scroll",handleNav)}
  },[isSticky])

  return (
    <header className={`${isSticky ? "fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out shadow-md bg-base-100 z-50":""}`}>
      <div className='navbar section-container'>
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn  btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          <a href="/">
            <img src={logo} alt="" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end flex items-center">

          {/* Serach Button */}
          <button tabIndex={0} className="btn btn-ghost btn-circle hidden lg:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* cart button */}
          <label tabIndex={0} className="dropdown dropdown-end lg:flex items-center justify-center hidden ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </div>
          </label>

          {/*Button  */}
          <a className="btn bg-green flex items-center gap-2 rounded-full text-white px-6">
            <BiPhoneCall /> Contact
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
