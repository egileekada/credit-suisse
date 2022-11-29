import { Checkbox, Input, Select, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react' 
import Trash from "../../assets/trash.svg"
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Index() {

    const [ value, setValue ] = React.useState("Active")
    const [ rating, setRating ] = React.useState(3)
    const navigate = useNavigate()

    React.useEffect(() => {
        navigate("/dashboard/users")
    }, [])

    return (
        <div className=' w-full h-full rounded-lg bg-[#FAFAFA]' >
            <div className=' w-full flex ubuntu py-2 px-6 items-center justify-between ' >
                <p className=' font-bold text-[21px] ' >Users</p>
                <Select fontSize="14px" width="200px" >
                    <option>Monthly</option>
                </Select>
            </div>
            <div className=' w-full px-6 ' >
                <TableContainer>
                    <Table variant='simple'> 
                        <Thead className=' text-[#B5BFC9] poppins-medium text-xs ' >
                            <Tr>
                                <Td>
                                    <Checkbox size="md" />
                                </Td>
                                <Td>
                                    FULL NAME
                                </Td>
                                <Td>
                                    EMAIL ADDRESS
                                </Td>
                                <Td>
                                    STATUS
                                </Td>
                                <Td>
                                    PHONE NUMBER
                                </Td>
                                <Td>
                                    REVENUE
                                </Td>
                                <Td>
                                    RATING
                                </Td>
                                <Td>

                                </Td>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr className=' text-xs poppins-regular ' >
                                <Td>
                                    <Checkbox size="md" />
                                </Td>
                                <Td className=' text-[#1B2126] font-semibold ' >Rafael Sinatra</Td>
                                <Td className=' text-[#68727B] ' >rafaelsinatra@email.com</Td>
                                <Td>
                                    <Select width='100px' onChange={(e)=> setValue(e.target.value)} textColor="#11706A" fontSize="12px" fontWeight="600" backgroundColor="rgba(17, 112, 106, 0.1)" >
                                        <option>Active</option>
                                    </Select>
                                </Td>
                                <Td className=' text-[#68727B] ' >(+62) 812 3456 7890</Td>
                                <Td className=' text-[#68727B] ' >$724</Td>
                                <Td>
                                    {rating === 2 &&
                                        <div className=' flex flex-col ' >
                                            <p className=' text-[#1B2126] ' >{rating}</p>
                                            <div className=' w-[15px] mt-[1px] h-[4px] bg-[#F74646] rounded-[30px] ' />
                                        </div>
                                    }
                                    {rating === 3 &&
                                        <div className=' flex flex-col ' >
                                            <p className=' text-[#1B2126] ' >{rating}</p>
                                            <div className=' w-[24px] mt-[1px] h-[4px] bg-[#FFE053] rounded-[30px] ' />
                                        </div>
                                    }
                                    {rating === 4 &&
                                        <div className=' flex flex-col ' >
                                            <p className=' text-[#1B2126] ' >{rating}</p>
                                            <div className=' w-[39px] mt-[1px] h-[4px] bg-[#20DC33] rounded-[30px] ' />
                                        </div>
                                    }
                                    {rating === 5 &&
                                        <div className=' flex flex-col ' >
                                            <p className=' text-[#1B2126] ' >{rating}</p>
                                            <div className=' w-[45px] mt-[1px] h-[4px] bg-[#11706A] rounded-[30px] ' />
                                        </div>
                                    }
                                </Td>
                                <Td>
                                    <button>
                                        <img src={Trash} className=" w-[12px] " alt="trash" />
                                    </button>
                                </Td>
                            </Tr> 
                        </Tbody> 
                    </Table>
                </TableContainer>
                {/* <div className=' py-3 w-full flex justify-center items-center ' >
                    <button className=' flex items-center poppins-medium ' >
                        Load more
                        <svg className=' ml-2 ' width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.68568 0.310934L5.50492 4.43546L9.32416 0.310934C9.70805 -0.103645 10.3282 -0.103645 10.7121 0.310934C11.096 0.725513 11.096 1.39522 10.7121 1.80979L6.19396 6.68907C5.81007 7.10364 5.18993 7.10364 4.80604 6.68907L0.287919 1.80979C-0.0959731 1.39522 -0.0959731 0.725513 0.287919 0.310934C0.671812 -0.0930142 1.30179 -0.103645 1.68568 0.310934Z" fill="#141926"/>
                        </svg>
                    </button>
                </div> */}
            </div>
            <div className=' w-full grid grid-cols-3 gap-6 p-6 text-sm poppins-medium ' >
                <div className=' w-full ' >
                    <Input placeholder='First Name' fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
                </div>
                <div className=' w-full ' >
                    <Input placeholder='Last Name' fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
                </div>
                <div className=' w-full ' >
                    <Input placeholder='Other Name (Optional)' fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
                </div>
                <div className=' w-full ' >
                    <Input placeholder='Email' fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
                </div>
                <div className=' w-full ' >
                    <Input placeholder='Phone Number' fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
                </div>
                <div className=' w-full ' >
                    <Input placeholder='Password' fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
                </div>
                <div className=' w-full ' >
                    <p className=' text-[#7C7C7C] poppins-medium text-xs mb-2 ' >Marital Status:</p>
                    <div className=' border-[#E1E2E5] border w-full rounded-[5px] h-[50px] items-center px-3 flex ' >
                        
                        <div className=' mx-2 flex items-center ' >
                            <p className=' text-[#7C7C7C] poppins-regular mr-2 text-xs ' >Single</p>
                            <Checkbox  />
                        </div>
                        <div className=' mx-2 flex items-center ' >
                            <p className=' text-[#7C7C7C] poppins-regular mr-2 text-xs ' >Married</p>
                            <Checkbox  />
                        </div>
                        <div className=' mx-2 flex items-center ' >
                            <p className=' text-[#7C7C7C] poppins-regular mr-2 text-xs ' >Others</p>
                            <Checkbox  />
                        </div>
                    </div>
                </div>
                <div className=' w-full ' >
                    <p className=' text-[#7C7C7C] poppins-medium text-xs mb-2 ' >Gender:</p>
                    <div className=' border-[#E1E2E5] border w-full rounded-[5px] h-[50px] items-center px-3 flex ' >
                        
                        <div className=' mx-2 flex items-center ' >
                            <p className=' text-[#7C7C7C] poppins-regular mr-2 text-xs ' >Male</p>
                            <Checkbox  />
                        </div>
                        <div className=' mx-2 flex items-center ' >
                            <p className=' text-[#7C7C7C] poppins-regular mr-2 text-xs ' >Female</p>
                            <Checkbox  />
                        </div> 
                    </div>
                </div>
                <div className=' w-full ' >
                    <p className=' text-[#7C7C7C] poppins-medium text-xs mb-2 ' >Date of Birth:</p>
                    <Input type="date" fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
                </div>
                <div className=' w-full ' >
                    <Select placeholder='Country of Birth' fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
                </div>
                <div className=' w-full ' >
                    <Select placeholder='Nationality' fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
                </div>
                <div className=' w-full ' >
                    <Input placeholder='Residential Address' fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
                </div>
                <div className=' w-full ' >
                    <Input placeholder='Social Security Number' fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
                </div>
                <div className=' w-full ' >
                    <Select placeholder='Employment Status' fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
                </div>
                <div className=' w-full ' >
                    <Select placeholder='Account Type' fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px" >
                        <option>Savings</option>
                        <option>Current</option>
                    </Select>
                </div>
                <div className=' w-full ' >
                    <Input placeholder='Next of Kin' fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
                </div>
                <div className=' w-full ' >
                    <Input placeholder='Assign Account Number:' fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
                </div>
                <div className=' w-full ' >
                    <Input placeholder='Account Balance' fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  />
                </div>
            </div>
            <div className=' pl-6 poppins-medium pb-8 flex items-center ' >
                <p className=' mr-2 ' >Account Balance:</p>
                <button className=' h-[40px] text-white w-[130px] text-sm font-bold rounded-full bg-[#7F63F4] mx-3 ' >Declined</button>
                <button className=' h-[40px] text-white w-[130px] text-sm font-bold rounded-full bg-[#4CAF50] mx-3 ' >Successful</button>
                <button className=' h-[40px] text-white w-[130px] text-sm font-bold rounded-full bg-[#B72C00] mx-3 ' >Block</button>
            </div>
        </div>
    )
} 