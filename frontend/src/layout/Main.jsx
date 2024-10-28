import React from 'react'
import Router from '../Router/Router'
import Navbar from '../component/navbar/Navbar'
import Footer from '../component/footer/Footer'
import "../App.css"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import 'sweetalert2/src/sweetalert2.scss'

const Main = () => {
  return (
    <div className='bg-gradient-to-r from-[#FAFAFA] to-[rgb(252,252,252)]'>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <Router />
      <Footer />
    </div>
  )
}

export default Main
