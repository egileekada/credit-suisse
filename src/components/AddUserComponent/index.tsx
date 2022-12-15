import { Input, Checkbox, Select, Modal, ModalBody, ModalContent, ModalOverlay, ModalCloseButton, ModalHeader, useToast } from '@chakra-ui/react'
import React from 'react'
import SelectLocation from '../SelectLocation'
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import * as yup from 'yup'
import Close from "../../assets/Close.svg"
import { usePostCallback } from '../../action/useAction';
import { useNavigate } from 'react-router-dom';
import { IUser, UserContext } from '../../context';

export default function Index(props: any) {

    const [ countryOfOrigin, setCountryOfOrigin ] = React.useState("")
    const [ showPassword, setShowPassword ] = React.useState(false)
    const [ gender, setGender ] = React.useState("")
    const [ maritalStatus, setMaritalStatus ] = React.useState("")
    const [ location, setLocation ] = React.useState("")
    const { handlePost } = usePostCallback();
    const navigate = useNavigate()
    const toast = useToast()
    const [loading, setLoading] = React.useState(false)
    const userContext: IUser = React.useContext(UserContext);

    const loginSchema = yup.object({  
        first_name: yup.string().required('Required'),
        last_name: yup.string().required('Required'),
        // other_name: yup.string().required('Required'),
        password: yup.string().required('Your password is required').min(6, 'A minimium of 6 characters'),
        email: yup.string().email('This email is not valid').required('Your email is required'),
        phone: yup.string().required('Required'),
        marital_status: yup.string().required('Required'),
        gender: yup.string().required('Required'),
        dob: yup.string().required('Required'),
        country_of_birth: yup.string().required('Required'),
        nationality: yup.string().required('Required'),
        residential_address: yup.string().required('Required'),
        ssn: yup.string().required('Required'),
        employment_status: yup.string().required('Required'),
        account_type: yup.string().required('Required'),
        next_of_kin: yup.string().required('Required'),
        account_number: yup.string().required('Required'),
        balance: yup.string().required('Required'),
        password_confirmation: yup.string().required('Required') 
    }) 

    // formik
    const formik = useFormik({
        initialValues: { 
            first_name: "",
            last_name: "",
            other_name: "",
            email: "",
            phone: "",
            password: "",
            marital_status: "",
            gender: "",
            dob: "",
            country_of_birth: "",
            nationality: "",
            residential_address: "",
            ssn: "",
            employment_status: "",
            account_type: "",
            next_of_kin: "",
            account_number: "",
            balance: "",
            password_confirmation: "" },
        validationSchema: loginSchema,
        onSubmit: () => {},
    });   

    React.useEffect(() => { 
        formik.setFieldValue("gender", gender)
        formik.setFieldValue("marital_status", maritalStatus)
        formik.setFieldValue("password_confirmation", formik.values.password)
        formik.setFieldValue("country_of_birth", countryOfOrigin)
        formik.setFieldValue("nationality", location)
    }, [countryOfOrigin, location, gender, maritalStatus, formik.values.password]) 

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
            const request = await handlePost(JSON.stringify(formik.values))   
            if (request.status === 200 || request.status === 201) {   
                toast({
                    title: "User Added Successfully",
                    position: "bottom",
                    status: "success",
                    isClosable: true,
                })
                userContext.setCheck(userContext.check+"1")
                const t1 = setTimeout(() => {
                    setLoading(false); 
                    props.check()
                    props.close(false)
                    clearTimeout(t1);
                }, 3000);  
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
        <> 
            <Modal 
        scrollBehavior="inside" onClose={props.close} size="full" isOpen={props.open} >
            <ModalOverlay />
                <ModalContent rounded="none"  > 
                    <ModalHeader>Create A New Account</ModalHeader>
                    <ModalCloseButton /> 
                    <ModalBody  >  
                        <div className=' w-full grid grid-cols-3 gap-6 p-6 text-sm poppins-medium ' >
                            <div className=' w-full ' >
                                <Input 
                                    name="first_name"
                                    onChange={formik.handleChange}
                                    onFocus={() =>
                                        formik.setFieldTouched("first_name", true, true)
                                    } 
                                    type="text"
                                    placeholder='First Name' fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
                            
                                <div className="w-full h-auto pt-2">
                                    {formik.touched.first_name && formik.errors.first_name && (
                                        <motion.p
                                            initial={{ y: -100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="text-xs font-Inter-Medium text-[#ff0000]"
                                        >
                                            {formik.errors.first_name}
                                        </motion.p>
                                    )}
                                </div> 
                            </div>
                            <div className=' w-full ' >
                                <Input 
                                    name="last_name"
                                    onChange={formik.handleChange}
                                    onFocus={() =>
                                        formik.setFieldTouched("last_name", true, true)
                                    } type="text"
                                    placeholder='Last Name' fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
                                <div className="w-full h-auto pt-2">
                                    {formik.touched.last_name && formik.errors.last_name && (
                                        <motion.p
                                            initial={{ y: -100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="text-xs font-Inter-Medium text-[#ff0000]"
                                        >
                                            {formik.errors.last_name}
                                        </motion.p>
                                    )}
                                </div> 
                            </div>
                            <div className=' w-full ' >
                                <Input 
                                    name="other_name"
                                    onChange={formik.handleChange}
                                    onFocus={() =>
                                        formik.setFieldTouched("other_name", true, true)
                                    } type="text"
                                    placeholder='Other Name (Optional)' fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
                                <div className="w-full h-auto pt-2">
                                    {formik.touched.other_name && formik.errors.other_name && (
                                        <motion.p
                                            initial={{ y: -100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="text-xs font-Inter-Medium text-[#ff0000]"
                                        >
                                            {formik.errors.other_name}
                                        </motion.p>
                                    )}
                                </div> 
                            </div>
                            <div className=' w-full ' >
                                <Input 
                                    name="email"
                                    onChange={formik.handleChange}
                                    onFocus={() =>
                                        formik.setFieldTouched("email", true, true)
                                    } type="email"
                                    placeholder='Email' fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
                                <div className="w-full h-auto pt-2">
                                    {formik.touched.email && formik.errors.email && (
                                        <motion.p
                                            initial={{ y: -100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="text-xs font-Inter-Medium text-[#ff0000]"
                                        >
                                            {formik.errors.email}
                                        </motion.p>
                                    )}
                                </div> 
                            </div>
                            <div className=' w-full ' >
                                <Input 
                                    name="phone"
                                    onChange={formik.handleChange}
                                    onFocus={() =>
                                        formik.setFieldTouched("phone", true, true)
                                    } type="tel"
                                    placeholder='Phone Number' fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
                                <div className="w-full h-auto pt-2">
                                    {formik.touched.phone && formik.errors.phone && (
                                        <motion.p
                                            initial={{ y: -100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="text-xs font-Inter-Medium text-[#ff0000]"
                                        >
                                            {formik.errors.phone}
                                        </motion.p>
                                    )}
                                </div> 
                            </div>
                            <div className=' w-full relative ' >
                                <div className=' w-full relative ' >
                                    <Input 
                                        name="password"
                                        onChange={formik.handleChange}
                                        onFocus={() =>
                                            formik.setFieldTouched("password", true, true)
                                        } type={showPassword ? "text" : "password"}
                                        placeholder='Password' fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
                                    <button onClick={()=> setShowPassword((prev)=> !prev)} className=' absolute top-0 bottom-0 right-0 px-4 flex justify-center items-center ' > 
                                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15 3.12463C13.6298 1.9964 12.1174 1.12463 10 1.12463C4 1.12463 1 8.12463 1 8.12463C1 8.12463 2.33333 11.0506 5 13.1246M17 4.92456C18.3333 6.56908 19 8.12463 19 8.12463C19 8.12463 16 15.1246 10 15.1246C8.89898 15.1246 7.89898 14.8889 7 14.504" stroke="#9FA4AB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M12.2361 6.12463C11.6868 5.51088 10.8885 5.12463 10 5.12463C8.34315 5.12463 7 6.46778 7 8.12463C7 8.89299 7.28885 9.59388 7.76389 10.1246" stroke="#9FA4AB" stroke-width="1.5"/>
                                            {!showPassword ? <path d="M17 1.12463L3 15.1246" stroke="#9FA4AB" stroke-width="1.5" stroke-linecap="round"/>: null}
                                        </svg>
                                    </button>
                                </div>
                                <div className="w-full h-auto pt-2">
                                    {formik.touched.password && formik.errors.password && (
                                        <motion.p
                                            initial={{ y: -100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="text-xs font-Inter-Medium text-[#ff0000]"
                                        >
                                            {formik.errors.password}
                                        </motion.p>
                                    )}
                                </div> 
                            </div>
                            <div className=' w-full ' >
                                <p className=' text-[#7C7C7C] poppins-medium text-xs mb-2 ' >Marital Status:</p>
                                <div className=' border-[#E1E2E5] border w-full rounded-[5px] h-[50px] items-center px-3 flex ' >
                                    
                                    <div className=' mx-2 flex items-center ' >
                                        <p className=' text-[#7C7C7C] poppins-regular mr-2 text-xs ' >Single</p>
                                        <Checkbox isChecked={maritalStatus === "Single" ? true: false} onChange={()=> setMaritalStatus("Single")} />
                                    </div>
                                    <div className=' mx-2 flex items-center ' >
                                        <p className=' text-[#7C7C7C] poppins-regular mr-2 text-xs ' >Married</p>
                                        <Checkbox isChecked={maritalStatus === "Married" ? true: false} onChange={()=> setMaritalStatus("Married")} />
                                    </div>
                                    <div className=' mx-2 flex items-center ' >
                                        <p className=' text-[#7C7C7C] poppins-regular mr-2 text-xs ' >Others</p>
                                        <Checkbox isChecked={maritalStatus === "Others" ? true: false} onChange={()=> setMaritalStatus("Others")} />
                                    </div>
                                </div>
                            </div>
                            <div className=' w-full ' >
                                <p className=' text-[#7C7C7C] poppins-medium text-xs mb-2 ' >Gender:</p>
                                <div className=' border-[#E1E2E5] border w-full rounded-[5px] h-[50px] items-center px-3 flex ' > 
                                    <div className=' mx-2 flex items-center ' >
                                        <p className=' text-[#7C7C7C] poppins-regular mr-2 text-xs ' >Male</p>
                                        <Checkbox isChecked={gender === "Male" ? true: false} onChange={()=> setGender("Male")} />
                                    </div>
                                    <div className=' mx-2 flex items-center ' >
                                        <p className=' text-[#7C7C7C] poppins-regular mr-2 text-xs ' >Female</p>
                                        <Checkbox isChecked={gender === "Female" ? true: false} onChange={()=> setGender("Female")}   />
                                    </div> 
                                </div>
                            </div>
                            <div className=' w-full ' >
                                <p className=' text-[#7C7C7C] poppins-medium text-xs mb-2 ' >Date of Birth:</p>
                                <Input 
                                    name="dob"
                                    onChange={formik.handleChange}
                                    onFocus={() =>
                                        formik.setFieldTouched("dob", true, true)
                                    } 
                                    type="date" fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
                                <div className="w-full h-auto pt-2">
                                    {formik.touched.dob && formik.errors.dob && (
                                        <motion.p
                                            initial={{ y: -100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="text-xs font-Inter-Medium text-[#ff0000]"
                                        >
                                            {formik.errors.dob}
                                        </motion.p>
                                    )}
                                </div> 
                            </div> 
                            <SelectLocation name='Country of Birth' location={setLocation} birth={setCountryOfOrigin} />
                            <SelectLocation name='Nationality' location={setLocation} birth={setCountryOfOrigin}  /> 
                            <div className=' w-full ' >
                                <Input 
                                    name="residential_address"
                                    onChange={formik.handleChange}
                                    onFocus={() =>
                                        formik.setFieldTouched("residential_address", true, true)
                                    } type="text"
                                    placeholder='Residential Address' fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
                                <div className="w-full h-auto pt-2">
                                    {formik.touched.residential_address && formik.errors.residential_address && (
                                        <motion.p
                                            initial={{ y: -100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="text-xs font-Inter-Medium text-[#ff0000]"
                                        >
                                            {formik.errors.residential_address}
                                        </motion.p>
                                    )}
                                </div> 
                            </div>
                            <div className=' w-full ' >
                                <Input 
                                    name="ssn"
                                    onChange={formik.handleChange}
                                    onFocus={() =>
                                        formik.setFieldTouched("ssn", true, true)
                                    } 
                                    type="text"
                                    placeholder='Social Security Number' fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
                                <div className="w-full h-auto pt-2">
                                    {formik.touched.ssn && formik.errors.ssn && (
                                        <motion.p
                                            initial={{ y: -100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="text-xs font-Inter-Medium text-[#ff0000]"
                                        >
                                            {formik.errors.ssn}
                                        </motion.p>
                                    )}
                                </div> 
                            </div>
                            <div className=' w-full ' >
                                <Select 
                                    name="employment_status"
                                    onChange={formik.handleChange}
                                    onFocus={() =>
                                        formik.setFieldTouched("employment_status", true, true)
                                    } 
                                    placeholder='Employment Status' fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px" >
                                        <option>Employed</option>
                                        <option>Unemployed</option>
                                    </Select>
                                <div className="w-full h-auto pt-2">
                                    {formik.touched.employment_status && formik.errors.employment_status && (
                                        <motion.p
                                            initial={{ y: -100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="text-xs font-Inter-Medium text-[#ff0000]"
                                        >
                                            {formik.errors.employment_status}
                                        </motion.p>
                                    )}
                                </div> 
                            </div>
                            <div className=' w-full ' >
                                <Select 
                                    name="account_type"
                                    onChange={formik.handleChange}
                                    onFocus={() =>
                                        formik.setFieldTouched("account_type", true, true)
                                    }  
                                    placeholder='Account Type' fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px" >
                                    <option>Savings</option>
                                    <option>Current</option>
                                </Select>
                                <div className="w-full h-auto pt-2">
                                    {formik.touched.account_type && formik.errors.account_type && (
                                        <motion.p
                                            initial={{ y: -100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="text-xs font-Inter-Medium text-[#ff0000]"
                                        >
                                            {formik.errors.account_type}
                                        </motion.p>
                                    )}
                                </div> 
                            </div>
                            <div className=' w-full ' >
                                <Input 
                                    name="next_of_kin"
                                    onChange={formik.handleChange}
                                    onFocus={() =>
                                        formik.setFieldTouched("next_of_kin", true, true)
                                    } type="text"
                                    placeholder='Next of Kin' fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
                                <div className="w-full h-auto pt-2">
                                    {formik.touched.next_of_kin && formik.errors.next_of_kin && (
                                        <motion.p
                                            initial={{ y: -100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="text-xs font-Inter-Medium text-[#ff0000]"
                                        >
                                            {formik.errors.next_of_kin}
                                        </motion.p>
                                    )}
                                </div> 
                            </div>
                            <div className=' w-full ' >
                                <Input 
                                    name="account_number"
                                    onChange={formik.handleChange}
                                    onFocus={() =>
                                        formik.setFieldTouched("account_number", true, true)
                                    } type="number"
                                    placeholder='Assign Account Number:' fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
                                <div className="w-full h-auto pt-2">
                                    {formik.touched.account_number && formik.errors.account_number && (
                                        <motion.p
                                            initial={{ y: -100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="text-xs font-Inter-Medium text-[#ff0000]"
                                        >
                                            {formik.errors.account_number}
                                        </motion.p>
                                    )}
                                </div> 
                            </div>
                            <div className=' w-full ' >
                                <Input 
                                    name="balance"
                                    onChange={formik.handleChange}
                                    onFocus={() =>
                                        formik.setFieldTouched("balance", true, true)
                                    } type="number"
                                    placeholder='Account Balance' fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
                                <div className="w-full h-auto pt-2">
                                    {formik.touched.balance && formik.errors.balance && (
                                        <motion.p
                                            initial={{ y: -100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="text-xs font-Inter-Medium text-[#ff0000]"
                                        >
                                            {formik.errors.balance}
                                        </motion.p>
                                    )}
                                </div> 
                            </div>
                        </div>
                        <div className=' pl-6 poppins-medium pb-8 flex items-center ' >
                            <p className=' mr-2 ' >Account Balance:</p>
                            <button className=' h-[40px] text-white w-[130px] text-sm font-bold rounded-full bg-[#7F63F4] mx-3 ' >Declined</button>
                            <button className=' h-[40px] text-white w-[130px] text-sm font-bold rounded-full bg-[#4CAF50] mx-3 ' >Successful</button>
                            <button className=' h-[40px] text-white w-[130px] text-sm font-bold rounded-full bg-[#B72C00] mx-3 ' >Block</button>
                        </div>
                        <div className=' w-full flex mt-8 px-6 pb-10 ' >
                        <button onClick={submit} className=' bg-[#183964] h-[45px] rounded px-10 text-sm text-white ml-auto font-bold ' >
                            {loading ?
                                "loading...":
                                "Submit"    
                            }
                        </button>
                        </div>
                    </ModalBody> 
                </ModalContent>
            </Modal> 
        </>
    )
} 