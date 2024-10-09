import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../component/navbar/Navbar'
import Footer from '../component/footer/Footer'
import "../App.css"

const Main = () => {
  return (
    <div  className='bg-gradient-to-r from-[#FAFAFA] from-[0%] to-[rgb(252,252,252)] to-[100%]'>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Main
