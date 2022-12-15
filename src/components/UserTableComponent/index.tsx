import { TableContainer, Table, Thead, Tr, Td, Checkbox, Tbody, Select, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast, Input } from '@chakra-ui/react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useGetDataCallback, useDeleteCallback, useChangeStatusCallback, useUpdateBalanceCallback } from '../../action/useAction';
import Trash from "../../assets/trash.svg" 
import { IUser, UserContext } from '../../context';

export default function Index(props: any) {
 
    const [ rating, setRating ] = React.useState(3)
    const userContext: IUser = React.useContext(UserContext);
    const [ dataLength, setDataLength ] = React.useState(10)
    const [ newAmount, setNewAmount ] = React.useState("")
    const [ modalType, setModalType ] = React.useState("")
    const [ loading, setLoading ] = React.useState(false)
    const [ dataInfo, setDataInfo ] = React.useState([] as any)
    const [ currentData, setCurrentData ] = React.useState({} as any)
    const toast = useToast()
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { handleGetData } = useGetDataCallback();
    const { handleDelete } = useDeleteCallback();
    const { handleChangeStatus } = useChangeStatusCallback();
    const { handleUpdateBalance } = useUpdateBalanceCallback();

    const GetInformation =async()=>{
        const request = await handleGetData("/admin/users")  
        if(request?.data?.message === "Unauthenticated."){
            navigate("/")
        }
        console.log(request)
        setDataInfo(request.data.data)
    } 

    React.useEffect(() => { 
        GetInformation() 
    }, [userContext.check])  

    const deleteHandler =(item: any, type: any)=> {
        setModalType(type)
        setCurrentData(item)  
        onOpen()
    } 

    const onDeleteHandler = async()=> {
        setLoading(true)
        const request = await handleDelete(currentData.id)  
        console.log(request); 
        if(request?.status === 200){
            toast({
                title: request?.data?.message,
                position: "bottom",
                status: "success",
                isClosable: true,
            })
            GetInformation() 
            userContext.setCheck(userContext.check+"1")
        } else {
            toast({
                title: request?.data?.message,
                position: "bottom",
                status: "success",
                isClosable: true,
            })
        }
        onClose() 
        setLoading(false)
    }

    const handleUserStatus =async(item: any, index: any)=>{
        const request: any = await handleChangeStatus(JSON.stringify({"status":item}), index) 
        if(request?.status === 200){
            toast({
                title: request?.data?.message,
                position: "bottom",
                status: "success",
                isClosable: true,
            })
            GetInformation() 
            userContext.setCheck(userContext.check+"1")
        } else {
            toast({
                title: request?.data?.message,
                position: "bottom",
                status: "success",
                isClosable: true,
            })
        }
        GetInformation()  
        onClose()
    }

    const handleUserBalance =async()=>{ 
        setLoading(true)
        const request: any = await handleUpdateBalance(JSON.stringify({"balance":newAmount}), currentData.id)
        console.log(request);
        if(request?.status === 200){
            toast({
                title: request?.data?.message,
                position: "bottom",
                status: "success",
                isClosable: true,
            })
            GetInformation() 
            userContext.setCheck(userContext.check+"1")
        } else {
            toast({
                title: request?.data?.message,
                position: "bottom",
                status: "success",
                isClosable: true,
            })
        } 
        setLoading(false)
        onClose()
    }  


    return ( 
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
                        {userContext.search && (
                            <> 
                                {dataInfo.slice(0, dataLength)?.filter((item: any) => (item.first_name).toLowerCase().includes(userContext.search.toLowerCase()) || (item.last_name).toLowerCase().includes(userContext.search.toLowerCase()))?.map((item: any, index: any) => {
                                    return( 
                                        <Tr key={index} className=' text-xs poppins-regular ' >
                                            <Td>
                                                <Checkbox size="md" />
                                            </Td>
                                            <Td className=' text-[#1B2126] font-semibold ' >{item.first_name+" "+item.last_name}</Td>
                                            <Td className=' text-[#68727B] ' >{item.email}</Td>
                                            <Td>
                                                <Select onChange={(e)=> handleUserStatus(e.target.value, item.id)} width='100px' placeholder={item.status === "active" ? "Active" : "Inactive"} textColor={item.status === "active" ? "#11706A" :"#F74646"} fontSize="12px" fontWeight="600" backgroundColor="rgba(17, 112, 106, 0.1)" >
                                                    {item.status !== "active" && <option className=' text-[#11706A] ' value="active">Active</option> }
                                                    {item.status !== "inactive" && <option className=' text-[#F74646] ' value="inactive" >InActive</option> }
                                                </Select>
                                            </Td>
                                            <Td className=' text-[#68727B] ' >{item?.phone}</Td>
                                            <Td className=' text-[#68727B] ' >
                                                <button  onClick={()=> deleteHandler(item, "balance")}>${item?.balance}</button>
                                            </Td>
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
                                                <button onClick={()=> deleteHandler(item, "delete")} >
                                                    <img src={Trash} className=" w-[12px] " alt="trash" />
                                                </button>
                                            </Td>
                                        </Tr> 
                                    )
                                })} 
                            </>
                        )} 
                        {!userContext.search && (
                            <> 
                                {dataInfo.slice(0, dataLength)?.map((item: any, index: any) => {
                                    return(

                                        <Tr key={index} className=' text-xs poppins-regular ' >
                                            <Td>
                                                <Checkbox size="md" />
                                            </Td>
                                            <Td className=' text-[#1B2126] font-semibold ' >{item.first_name+" "+item.last_name}</Td>
                                            <Td className=' text-[#68727B] ' >{item.email}</Td>
                                            <Td>
                                                <Select onChange={(e)=> handleUserStatus(e.target.value, item.id)} width='100px' placeholder={item.status === "active" ? "Active" : "Inactive"} textColor={item.status === "active" ? "#11706A" :"#F74646"} fontSize="12px" fontWeight="600" backgroundColor="rgba(17, 112, 106, 0.1)" >
                                                    {item.status !== "active" && <option className=' text-[#11706A] ' value="active">Active</option> }
                                                    {item.status !== "inactive" && <option className=' text-[#F74646] ' value="inactive" >InActive</option> }
                                                </Select>
                                            </Td>
                                            <Td className=' text-[#68727B] ' >{item?.phone}</Td>
                                            <Td className=' text-[#68727B] ' >
                                                <button  onClick={()=> deleteHandler(item, "balance")}>${item?.balance}</button>
                                            </Td>
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
                                                <button onClick={()=> deleteHandler(item, "delete")} >
                                                    <img src={Trash} className=" w-[12px] " alt="trash" />
                                                </button>
                                            </Td>
                                        </Tr> 
                                    )
                                })}
                            </>
                        )} 
                    </Tbody> 
                </Table>
            </TableContainer>
             

            {userContext.search && (
                <>  
                    {dataInfo.slice(0, dataLength)?.filter((item: any) => (item.first_name).toLowerCase().includes(userContext.search.toLowerCase()) || (item.last_name).toLowerCase().includes(userContext.search.toLowerCase())).length === 0 && (
                        <div className=' w-full flex justify-center py-4 ' >
                            <p className=' font-bold text-xl  ' >No Records Found</p>
                        </div>
                    )}
                </>
            )} 

            {userContext.search && (
                <>  
                    {dataInfo.length === 0 && (
                        <div className=' w-full flex justify-center pt-4 ' >
                            <p className=' font-bold text-xl  ' >No Records Found</p>
                        </div>
                    )}
                </>
            )} 
            
            <Modal closeOnOverlayClick={false} isOpen={isOpen} isCentered onClose={onClose}>
                <ModalOverlay />
                <ModalContent>  
                <ModalCloseButton />
                <ModalBody pb={6}> 
                </ModalBody>
                    {modalType === "delete" && ( 
                        <div className=' w-full flex flex-col py-6 items-center justify-center ' > 
                            <img src={Trash} className=" w-[70px] mb-6 " alt="trash" />
                            <p className=' font-bold ' >Are You Sure You Want Delete <span className=' text-red-600 ' >{currentData.first_name+" "+currentData.last_name}</span> Account?</p>
                        </div>
                    )}
                    {modalType === "balance" && ( 
                        <div className=' w-full flex flex-col px-8 py-6 items-center justify-center ' > 
                            <p className=' font-bold text-xl mb-8 ' >Update User's Balance</p>
                            <Input onChange={(e)=> setNewAmount(e.target.value)} height="45px" placeholder={"$"+currentData?.balance} /> 
                        </div>
                    )}
                <ModalFooter>
                    {modalType === "balance" && ( 
                        <Button onClick={handleUserBalance} colorScheme="green" mr={3}>
                            {loading ? "Loading..." : "Update Balance"}
                        </Button>
                    )}
                    {modalType === "delete" && ( 
                        <Button onClick={onDeleteHandler} colorScheme="red" mr={3}> 
                            {loading ? "Loading..." : "Delete"}
                        </Button>
                    )}
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </Modal> 
            <div className={dataInfo.length > dataLength ? ' py-3 w-full flex justify-center items-center ' : ' hidden'} >
                <button onClick={()=> setDataLength((prev) => prev+10)} className=' flex items-center poppins-medium ' >
                    Load more
                    <svg className=' ml-2 ' width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.68568 0.310934L5.50492 4.43546L9.32416 0.310934C9.70805 -0.103645 10.3282 -0.103645 10.7121 0.310934C11.096 0.725513 11.096 1.39522 10.7121 1.80979L6.19396 6.68907C5.81007 7.10364 5.18993 7.10364 4.80604 6.68907L0.287919 1.80979C-0.0959731 1.39522 -0.0959731 0.725513 0.287919 0.310934C0.671812 -0.0930142 1.30179 -0.103645 1.68568 0.310934Z" fill="#141926"/>
                    </svg>
                </button>
            </div>
        </div>
        )
} 