import { Sidebar } from 'flowbite-react'
import React from 'react'
import {HiArrowSmRight, HiUser} from "react-icons/hi"
import { useState,useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function DashSidebar() {
    
  const location=useLocation()
  const [tab,setTab]=useState("")

  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search)
    const tabFromUrl=urlParams.get('tab')
    // console.log(tabFromUrl);
      if (tabFromUrl) {
        setTab(tabFromUrl)
      }
    
  },[location])
  return (
        <Sidebar className="w-full md:w-56">
            <Sidebar.Items>
               <Sidebar.ItemGroup>
               <Link to="/dashboard?tab=profile" >
                <Sidebar.Item active={tab==="profile"} icon={HiUser}label="user" labelColor="dark" >
                    Profile
                </Sidebar.Item>
                </Link>
                <Sidebar.Item  icon={HiArrowSmRight}  className="cursor-pointer" >
                    Sign Out
                </Sidebar.Item>
               </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>

)
}

export default DashSidebar