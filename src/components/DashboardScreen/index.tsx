import { Checkbox, Input, Select, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react' 
import Trash from "../../assets/trash.svg"
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Index() {

    const [ value, setValue ] = React.useState("Active")
    const [ rating, setRating ] = React.useState(3)
    const navigate = useNavigate()

    React.useEffect(() => {
        navigate("/dashboard")
    }, [])
     
    return (
        <div className=' w-full h-full rounded-lg bg-[#FAFAFA]' >
            <div className=' w-full flex ubuntu py-2 px-6 items-center justify-between ' >
                <p className=' font-bold text-[21px] ' >Users</p>
                <Select width="200px" >
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
                <div className=' py-3 w-full flex justify-center items-center ' >
                    <button className=' flex items-center poppins-medium ' >
                        Load more
                        <svg className=' ml-2 ' width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.68568 0.310934L5.50492 4.43546L9.32416 0.310934C9.70805 -0.103645 10.3282 -0.103645 10.7121 0.310934C11.096 0.725513 11.096 1.39522 10.7121 1.80979L6.19396 6.68907C5.81007 7.10364 5.18993 7.10364 4.80604 6.68907L0.287919 1.80979C-0.0959731 1.39522 -0.0959731 0.725513 0.287919 0.310934C0.671812 -0.0930142 1.30179 -0.103645 1.68568 0.310934Z" fill="#141926"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
} 