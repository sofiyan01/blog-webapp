import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

function PrivateRoute() {
    
    const {currentUser}=useSelector((state)=>state.user)
  return (
    <div>{currentUser?<Outlet/>:<Navigate to="/sign-in"/>}</div>
  )
}

export default PrivateRoute