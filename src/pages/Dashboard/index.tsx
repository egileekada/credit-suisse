import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardScreen from '../../components/DashboardScreen'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import TransactionDetail from './components/TransactionDetail'

export default function Index() {
    return (
        <div className=' w-full flex ' >
            <div className=' w-fit ' >
                <SideBar />
            </div>
            <div className=' flex flex-1 flex-col w-full h-screen overflow-hidden ' >
                <div className=' w-full h-fit ' > 
                    <Navbar />
                </div>
                <div className=' w-full h-full p-[40px] overflow-y-auto ' > 
                    <div className=' w-full pb-4 ' >
                        <TransactionDetail />
                    </div>
                    <div className=' w-full h-auto rounded-lg  ' >
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}
