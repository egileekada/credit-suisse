import { Input } from '@chakra-ui/react'
import React from 'react'
import LoginImage from "../../assets/LoginImage.png"
import Logo from "../../assets/logo.svg"
import Mail from "../../assets/mail.svg"
import Lock from "../../assets/lock.svg"
import { useNavigate } from 'react-router-dom'

export default function Index() {

    const navigate = useNavigate()

    return (
        <div className=' w-full h-screen overflow-hidden flex ' >
            <div className=' w-full ' >
                <img src={LoginImage} alt="LoginImage" />
            </div>
            <div className=' w-full flex justify-center items-center ' >
                <div className=' w-[500px] ubuntu flex flex-col  ' >
                    <img src={Logo} className=" w-[280px] " alt="logo" />
                    <p className=' font-medium text-[#AAAAAA] my-2 ' >Welcome Back,</p>
                    <p className=' font-bold text-2xl ' >Sign in to Credit Suisse</p>
                    <div className=' mt-8 w-full ' >
                        <p className=' font-medium text-[#AAAAAA] poppins-regular text-sm my-2 '>Email Address</p>
                        <div className=' relative w-full flex ' >
                            <Input height="45px" type="email" paddingLeft="50px" />
                            <div className=' absolute z-10 pl-3 h-full w-fit flex justify-center items-center  ' >
                                <img src={Mail} className=" w-[25px] "  alt="logo" />
                            </div>
                        </div>
                    </div>
                    <div className=' mt-4 w-full ' >
                        <p className=' font-medium text-[#AAAAAA] poppins-regular text-sm my-2 '>Password Address</p>
                        <div className=' relative w-full flex ' >
                            <Input height="45px" type="password" paddingLeft="50px" />
                            <div className=' absolute z-10 pl-3 h-full w-fit flex justify-center items-center  ' >
                                <img src={Lock} className=" w-[25px] "  alt="logo" />
                            </div>
                        </div>
                    </div> 
                    <p className=' ml-auto font-medium text-[#AAAAAA] poppins-regular text-sm my-2 cursor-pointer '>Forgot my password?</p>
                    <button onClick={()=> navigate("/dashboard")} className=' bg-[#183964] w-full h-[45px] rounded-lg mt-8 poppins-medium text-white ' >Sign in</button>
                </div>
            </div>
            <p className=' ubuntu font-medium text-sm fixed bottom-6 right-6 ' >Designed by Icoweb Agency</p>
        </div>
    )
} 