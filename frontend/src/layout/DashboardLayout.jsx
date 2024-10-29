import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { FaUsers ,FaPlusCircle,FaEdit   } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import logo from "/logo.png";
const DashboardLayout = () => {
  return (
    <div>
     <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
  
    {/* Page content here */}
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
    Open Drawer
    </label>
    <Outlet/>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      {/* Sidebar content here */}
      <li><Link className='flex items-center mb-3' to={"/dashboard"}> <img className='w-20' src={logo} alt="logo" /> <span className='badge badge-primary'>Admin</span> </Link></li>
      <li><Link className='mt-4' to={"/dashboard"}><MdDashboard/>Dashboard</Link></li>
      <li><Link to={"/dashboard/user"}><FaBagShopping />Manage Booking</Link></li>
      <li><Link to={"/dashboard/user"}><FaPlusCircle />Add Menu</Link></li>
      <li><Link to={"/dashboard/user"}><FaEdit />Manage Items</Link></li>
      <li><Link to={"/dashboard/user"}><FaUsers />All User</Link></li>
    </ul>
  </div>
</div>
    </div>
  )
}

export default DashboardLayout
