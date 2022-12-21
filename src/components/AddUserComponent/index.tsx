import { Input, Checkbox, Select, Modal, ModalBody, ModalContent, ModalOverlay, ModalCloseButton, ModalHeader, useToast } from '@chakra-ui/react'
import React from 'react'
import SelectLocation from '../SelectLocation'
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import * as yup from 'yup'
import Close from "../../assets/Close.svg"
import { useGetDataCallback, usePostCallback, useUpdateUserCallback } from '../../action/useAction';
import { useNavigate } from 'react-router-dom';
import { IUser, UserContext } from '../../context';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/high-res.css'
import { dateFormat } from '../../utils/dateFormat';

export default function AddUserComponent(props: any) {

    const [ countryOfOrigin, setCountryOfOrigin ] = React.useState("")
    const [ showPassword, setShowPassword ] = React.useState(false)
    const [ gender, setGender ] = React.useState("")
    const [ phoneNumber, setPhoneNumber ] = React.useState("")
    const [ maritalStatus, setMaritalStatus ] = React.useState("")
    const [ location, setLocation ] = React.useState("")  
    const [image, setImage] = React.useState('');   
    const { handlePost } = usePostCallback();
    const navigate = useNavigate()
    const toast = useToast()
    const [loading, setLoading] = React.useState(false)
    const userContext: IUser = React.useContext(UserContext); 
    const { handleUpdateUser } = useUpdateUserCallback();
    const { handleGetData } = useGetDataCallback();

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
        formik.setFieldValue("phone", phoneNumber) 
    }, [countryOfOrigin, location, gender, maritalStatus, formik.values.password, phoneNumber])    

    const handleImageChange = (e: any ) => {

        const selected = e.target.files[0]; 
        const TYPES = ["image/png", "image/jpg", "image/jpeg" ];        
        if (selected && TYPES.includes(selected.type)) {
            setImage(selected) 
        } else {
            console.log('Error')
        }   
    }     

    React.useEffect(() => { 
        if(props?.data?.first_name){
            // GetInformation() 
            formik.setValues({ 
                first_name: props?.data?.first_name,
                last_name: props?.data?.last_name,
                other_name: props?.data?.other_name,
                email: props?.data?.email,
                phone: props?.data?.phone,
                password: props?.data?.password_text,
                marital_status: props?.data?.marital_status,
                gender: props?.data?.gender,
                dob: props?.data?.dob,
                country_of_birth: props?.data?.country_of_birth,
                nationality: props?.data?.nationality,
                residential_address: props?.data?.residential_address,
                ssn: props?.data?.ssn,
                employment_status: props?.data?.employment_status,
                account_type: props?.data?.account_type,
                next_of_kin: props?.data?.next_of_kin,
                account_number: props?.data?.account_number,
                balance: props?.data?.balance,
                password_confirmation: props?.data?.password_text
            })
            setMaritalStatus(props?.data?.marital_status)
            setGender(props?.data?.gender)
            setPhoneNumber(props?.data?.phone)
            setCountryOfOrigin(props?.data?.country_of_birth)
            setLocation(props?.data?.nationality)
            setImage("")
        }
    },[props])  

    React.useEffect(()=>{ 
        setImage("")
    },[])

    const submit = async () => { 
        if(props?.data?.first_name){
            update()
        } else {
            adduser(image)
        }
    }   

    const adduser = async(item: any)=> {
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

            let request = await handlePost(formik.values, image)   
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

    const update = async () => { 
        setLoading(true);
        let request = await handleUpdateUser( formik.values, props?.data?.id, image) 
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
                // props.check()
                // props.close(false)
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
    

    return (
        <> 
            <Modal scrollBehavior="inside" onClose={props.close} size="full" isOpen={props.open} >
            <ModalOverlay />
                <ModalContent rounded="none"  > 
                    <ModalHeader>{props.data? "Update User Information": "Create A New Account"}</ModalHeader>
                    <ModalCloseButton /> 
                    <ModalBody  >  
                        <div className=' w-full grid grid-cols-3 gap-6 p-6 text-sm poppins-medium ' >
                            <div className=' w-full ' >
                                <p className=' text-[#7C7C7C] poppins-medium text-xs mb-2 ' >First Name</p>
                                <Input 
                                    name="first_name"
                                    value={formik.values.first_name}
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
                                <p className=' text-[#7C7C7C] poppins-medium text-xs mb-2 ' >Last Name</p>
                                <Input 
                                    name="last_name"
                                    value={formik.values.last_name}
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
                                <p className=' text-[#7C7C7C] poppins-medium text-xs mb-2 ' >Other Name (Optional)</p>
                                <Input 
                                    name="other_name"
                                    value={formik.values.other_name}
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

                            {props.data?.photo && (
                                <div className=' w-full ' >
                                    <p className=' text-[#7C7C7C] poppins-medium text-xs mb-2 ' >Image Link</p>  
                                    <a target="_blank" href={props.data?.photo} className=' border flex items-center pl-4 border-[#E1E2E5] rounded h-[50px] ' >
                                        Click Here
                                    </a>
                                </div> 
                            )}

                            <div className=' w-full ' >
                                <p className=' text-[#7C7C7C] poppins-medium text-xs mb-2 ' >{props.data?.photo ? "Change Photo": "Photo"}</p>
                                <div className=' w-full ' >
                                <Input  accept="image/*" id="input"
                                    onChange={(e)=> handleImageChange(e)} type="file"
                                      fontSize="14px" paddingTop="10px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  /> 
                                </div>
                            </div>
                            <div className=' w-full ' >
                                <p className=' text-[#7C7C7C] poppins-medium text-xs mb-2 ' >Email Address</p>
                                <Input 
                                    name="email"
                                    value={formik.values.email}
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
                                <p className=' text-[#7C7C7C] poppins-medium text-xs mb-2 ' >Phone Number</p>
                                <PhoneInput  
                                    country='us'  
                                    onChange={setPhoneNumber}
                                    inputStyle={{height: '50px', width:'100%'}}
                                    enableSearch
                                    inputProps={{
                                        name: 'phone',
                                        required: true,
                                        autoFocus: true,  
                                    }}

                                    value={formik.values.phone}
                                    />  
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
                                <p className=' text-[#7C7C7C] poppins-medium text-xs mb-2 ' >Password</p>
                                <div className=' w-full relative ' >
                                    <Input 
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onFocus={() =>
                                            formik.setFieldTouched("password", true, true)
                                        } type={showPassword ? "text" : "password"} 
                                        placeholder={'Password'} fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
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
                                        <Checkbox isChecked={gender === "male" ? true: false} onChange={()=> setGender("male")} />
                                    </div>
                                    <div className=' mx-2 flex items-center ' >
                                        <p className=' text-[#7C7C7C] poppins-regular mr-2 text-xs ' >Female</p>
                                        <Checkbox isChecked={gender === "female" ? true: false} onChange={()=> setGender("female")}   />
                                    </div> 
                                </div>
                            </div>
                            {props.data?.dob && (
                                <div className=' w-full ' >
                                    <p className=' text-[#7C7C7C] poppins-medium text-xs mb-2 ' >Date of Birth:</p>  
                                    <div className=' border flex items-center pl-4 border-[#E1E2E5] rounded h-[50px] ' >
                                        {dateFormat(formik.values.dob)}
                                    </div>
                                </div> 
                            )}
                            <div className=' w-full ' >
                                <p className=' text-[#7C7C7C] poppins-medium text-xs mb-2 ' >{props.data?.dob ? "Edit" : ""} Date of Birth:</p> 
                                <Input 
                                    name="dob" 
                                    onChange={formik.handleChange}
                                    onFocus={() =>
                                        formik.setFieldTouched("dob", true, true)
                                    } 
                                    // value={curr}
                                    defaultValue={formik.values.dob}
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
                            <div> 
                                <p className=' text-[#7C7C7C] poppins-medium text-xs mb-2 ' >Country of Birth</p>
                            <SelectLocation name={props?.data?.country_of_birth ?props?.data?.country_of_birth:'Country of Birth'} location={setLocation} birth={setCountryOfOrigin} />
                            </div> 
                            <div> 
                                <p className=' text-[#7C7C7C] poppins-medium text-xs mb-2 ' >Nationality</p>
                                <SelectLocation name={props?.data?.nationality ?props?.data?.nationality:'Nationality'} location={setLocation} birth={setCountryOfOrigin}  />
                            </div> 
                            <div className=' w-full ' > 
                                <p className=' text-[#7C7C7C] poppins-medium text-xs mb-2 ' >Residential Address</p>
                                <Input 
                                    name="residential_address"
                                    value={formik.values.residential_address}
                                    onChange={formik.handleChange}
                                    onFocus={() =>
                                        formik.setFieldTouched("residential_address", true, true)
                                    } type="text"
                                    placeholder={'Residential Address'} fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
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
                                <p className=' text-[#7C7C7C] poppins-medium text-xs mb-2 ' >Social Security Number</p>
                                <Input 
                                    name="ssn"
                                    value={formik.values.ssn}
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
                                <p className=' text-[#7C7C7C] poppins-medium text-xs mb-2 ' >Employment Status</p>
                                <Select 
                                    name="employment_status"
                                    value={formik.values.employment_status}
                                    onChange={formik.handleChange}
                                    onFocus={() =>
                                        formik.setFieldTouched("employment_status", true, true)
                                    } 
                                    placeholder={'Employment Status'} fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px" >
                                        <option>Employed</option>
                                        <option>Self-Employed</option>
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
                                <p className=' text-[#7C7C7C] poppins-medium text-xs mb-2 ' >Account Type</p>
                                <Select 
                                    name="account_type"
                                    value={formik.values.account_type}
                                    onChange={formik.handleChange}
                                    onFocus={() =>
                                        formik.setFieldTouched("account_type", true, true)
                                    }  
                                    placeholder={'Account Type'} fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px" >
                                    <option>Savings</option>
                                    <option>Current</option>
                                    <option>Fixed Deposit</option>
                                    <option>Checking</option>
                                    <option>Non-resident</option>
                                    <option>Domiciliary</option>
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
                                <p className=' text-[#7C7C7C] poppins-medium text-xs mb-2 ' >Next of Kin</p>
                                <Input 
                                    name="next_of_kin"
                                    value={formik.values.next_of_kin}
                                    onChange={formik.handleChange}
                                    onFocus={() =>
                                        formik.setFieldTouched("next_of_kin", true, true)
                                    } type="text"
                                    placeholder={'Next of Kin'} fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
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
                                <p className=' text-[#7C7C7C] poppins-medium text-xs mb-2 ' >Assign Account Number</p>
                                <Input 
                                    name="account_number"
                                    value={formik.values.account_number}
                                    onChange={formik.handleChange}
                                    onFocus={() =>
                                        formik.setFieldTouched("account_number", true, true)
                                    } type="number"
                                    placeholder={'Assign Account Number:'} fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
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
                                <p className=' text-[#7C7C7C] poppins-medium text-xs mb-2 ' >Account Balance</p>
                                <Input 
                                    name="balance"
                                    value={formik.values.balance}
                                    onChange={formik.handleChange}
                                    onFocus={() =>
                                        formik.setFieldTouched("balance", true, true)
                                    } type="number"
                                    placeholder={'Account Balance'} fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
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
                            <p className=' mr-2 ' >Account Status:</p>
                            <button className=' h-[40px] text-white w-[130px] text-sm font-bold rounded-full bg-[#7F63F4] mx-3 ' >Declined</button>
                            <button className=' h-[40px] text-white w-[130px] text-sm font-bold rounded-full bg-[#4CAF50] mx-3 ' >Successful</button>
                            <button className=' h-[40px] text-white w-[130px] text-sm font-bold rounded-full bg-[#B72C00] mx-3 ' >Block</button>
                        </div>
                        <div className=' w-full flex mt-8 px-6 pb-10 ' >
                        <button onClick={submit} className=' bg-[#183964] h-[45px] rounded px-10 text-sm text-white ml-auto font-bold ' >
                            {loading ?
                                "loading...":
                                (props.data?.first_name ? "Update User":
                                "Submit"    )
                            }
                        </button>
                        </div>
                    </ModalBody> 
                </ModalContent>
            </Modal> 
        </>
    )
} 