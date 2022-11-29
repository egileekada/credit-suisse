import React from 'react'
import Bar from "../../../../assets/Bars.png"

export default function Index() {
    return (
        <div className=' w-full flex justify-between px-10 py-[25px] rounded-lg bg-[#FAFAFA] ' >
            <div className=' w-fit ' >
                <p className=' font-normal text-[#656E86] text-sm ' >Total Users</p>
                <div className=' w-full flex my-1 items-start ' >
                    <p className=' font-bold text-[#656E86] text-[20px] mr-4 ' >1k</p>
                    <img src={Bar} alt="Bars" className=" ml-auto " />
                </div>
                <p className=' font-normal text-[#656E86] text-xs ' >400+ Extra (Last Month)</p>
            </div>
            <div className=' w-fit ' >
                <p className=' font-normal text-[#656E86] text-sm ' >Savings Account</p>
                <div className=' w-full flex my-1 items-start ' >
                    <p className=' font-bold text-[#656E86] text-[20px] mr-4 ' >$5,451.01</p>
                    <img src={Bar} alt="Bars" className=" ml-auto " />
                </div>
                <p className=' font-normal text-[#656E86] text-xs ' >Prepared to $25.00 (Last Month)</p>
            </div>
            <div className=' w-fit ' >
                <p className=' font-normal text-[#656E86] text-sm ' >Current Account</p>
                <div className=' w-full flex my-1 items-start ' >
                    <p className=' font-bold text-[#656E86] text-[20px] mr-4 ' >$9,375.12</p>
                    <img src={Bar} alt="Bars" className=" ml-auto " />
                </div>
                <p className=' font-normal text-[#656E86] text-xs ' >Prepared to $25.00 (Last Month)</p>
            </div>
        </div>
    )
} 