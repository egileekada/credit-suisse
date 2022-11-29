import { Input } from '@chakra-ui/react'
import React from 'react'
import Search from "../../../../assets/search.png"

export default function Index() {
    return (
        <div className=' w-full flex items-center justify-between bg-[#FAFAFA] h-[90px] px-8 ' >
            <p className=' text-[#141926] font-bold text-2xl ' >Dashboard</p>
            <div className=' w-[320px] relative flex ' >  
                <div className=' absolute z-10 pl-3 h-full w-fit flex justify-center items-center  ' >
                    <img src={Search} className=" w-[25px] "  alt="logo" />
                </div>
                <Input paddingLeft="50px" height="45px" backgroundColor="#fff" placeholder="Search for your keywords" width="320px" />
            </div>
            <div className=' flex items-center ' >
                <p className=' text-[#141926] text-sm font-bold ' >Christina Williams</p>
                <div className=' w-12 h-12 rounded-full bg-blue-400 ml-2 ' >

                </div>
            </div>
        </div>
    )
} 