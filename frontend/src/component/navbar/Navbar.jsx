import React, { useEffect, useRef, useState } from "react";
import logo from "/logo.png";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownMenuRef=useRef(null)
  const dropdownServicesRef=useRef(null)

  const handleToggle = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };
  useEffect(()=>{
    const hanldeOutside=(e)=>{
      if ((dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(e.target)) && (dropdownServicesRef.current &&
          !dropdownServicesRef.current.contains(e.target))) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener("mousedown",hanldeOutside)

    return () => {document.removeEventListener("mousedown",hanldeOutside)}
  },[dropdownMenuRef,dropdownServicesRef])

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
          Menu {openDropdown === "menu" ? <FaAngleUp />:<FaAngleDown />}
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
          Services  {openDropdown === "services" ? <FaAngleUp />:<FaAngleDown />}
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

  return (
    <header className="max-w-screen-2xl container mx-auto">
      <div className="navbar lg::px-24">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
