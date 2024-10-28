import React, { useContext } from 'react'
import Main from './layout/Main'
import { AuthContext } from './context/AuthProvider'
import loader from '/images/loader.gif'

const App = () => {
const {loading}=useContext(AuthContext)

if (loading) {
  return (
   <div className="flex items-center justify-center h-screen">
     <img src={loader} alt="" />
   </div>
  )
}

  return (
    <div>
    <Main/>
    </div>
  )
}

export default App
