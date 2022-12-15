import { Input, useToast } from '@chakra-ui/react'
import React from 'react'
import LoginImage from "../../assets/LoginImage.png"
import Logo from "../../assets/logo.svg"
import Mail from "../../assets/mail.svg"
import Lock from "../../assets/lock.svg"
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import * as yup from 'yup'
import { useLoginCallback } from '../../action/useAuth'

export default function Index() {

    const navigate = useNavigate()
    const toast = useToast()
    const [loading, setLoading] = React.useState(false)
    const { handleLogin } = useLoginCallback();

    const loginSchema = yup.object({ 
        email: yup.string().email('This email is not valid').required('Your email is required'),
        password: yup.string().required('Your password is required').min(6, 'A minimium of 6 characters')
    }) 

    // formik
    const formik = useFormik({
        initialValues: {email: '', password: ''},
        validationSchema: loginSchema,
        onSubmit: () => {},
    });    

    const submit = async () => {
    
        if (!formik.dirty) { 
            toast({
                title: "You have to fill in th form to continue",
                position: "bottom",
                status: "error",
                isClosable: true,
            }) 
            return;
        }else if (!formik.isValid) { 
            toast({
                title: "You have to fill in th form to continue",
                position: "bottom",
                status: "error",
                isClosable: true,
            })
          return;
        }else {
            setLoading(true);
            const request = await handleLogin(JSON.stringify(formik.values))  
            console.log(request);
            if (request.status === 200 || request.status === 201) { 
                localStorage.setItem("token", request?.data?.data?.token)   
                toast({
                    title: request?.data?.message,
                    position: "bottom",
                    status: "success",
                    isClosable: true,
                })
                const t1 = setTimeout(() => {
                    setLoading(false); 
                    navigate("/dashboard")
                    clearTimeout(t1);
                }, 1000);  
            }else { 

                toast({
                    title: request?.data?.message,
                    position: "bottom",
                    status: "error",
                    isClosable: true,
                }) 
                setLoading(false)  
            }
        }
    }  


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
                            <Input 
                                name="email"
                                onChange={formik.handleChange}
                                onFocus={() =>
                                    formik.setFieldTouched("email", true, true)
                                } 
                                height="45px" type="email" paddingLeft="50px" />
                            <div className=' absolute z-10 pl-3 h-full w-fit flex justify-center items-center  ' >
                                <img src={Mail} className=" w-[25px] "  alt="logo" />
                            </div>
                        </div>
                        <div className="w-full h-auto pt-2">
                            {formik.touched.email && formik.errors.email && (
                                <motion.p
                                    initial={{ y: -100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="text-xs font-Medium text-[#ff0000]"
                                >
                                    {formik.errors.email}
                                </motion.p>
                            )}
                        </div> 
                    </div>
                    <div className=' mt-4 w-full ' >
                        <p className=' font-medium text-[#AAAAAA] poppins-regular text-sm my-2 '>Password Address</p>
                        <div className=' relative w-full flex ' >
                            <Input 
                                name="password"
                                onChange={formik.handleChange}
                                onFocus={() =>
                                    formik.setFieldTouched("password", true, true)
                                } 
                                height="45px" type="password" paddingLeft="50px" />
                            <div className=' absolute z-10 pl-3 h-full w-fit flex justify-center items-center  ' >
                                <img src={Lock} className=" w-[25px] "  alt="logo" />
                            </div>
                        </div>
                        <div className="w-full h-auto pt-2">
                            {formik.touched.password && formik.errors.password && (
                                <motion.p
                                    initial={{ y: -100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="text-xs font-Ubuntu-Medium text-[#ff0000]"
                                >
                                    {formik.errors.password}
                                </motion.p>
                            )}
                        </div> 
                    </div> 
                    <p className=' ml-auto font-medium text-[#AAAAAA] poppins-regular text-sm my-2 cursor-pointer '>Forgot my password?</p>
                    <button onClick={()=> submit()} className=' bg-[#183964] w-full h-[45px] rounded-lg mt-8 poppins-medium text-white ' >{loading ? "Loading..": "Sign in"}</button>
                </div>
            </div>
            <p className=' ubuntu font-medium text-sm fixed bottom-6 right-6 ' >Designed by Icoweb Agency</p>
        </div>
    )
} 