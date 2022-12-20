import { Checkbox, Input, Select, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react' 
import Trash from "../../assets/trash.svg"
import React from 'react'
import { useNavigate } from 'react-router-dom' 
import SelectLocation from '../SelectLocation'
import { useGetDataCallback } from '../../action/useAction'
import UserTableComponent from '../UserTableComponent'
import AddUserComponent from '../AddUserComponent'

export default function Index() {
 
    const [open, setOpen] = React.useState(false) 
    const [check, setCheck] = React.useState(false)  
    const navigate = useNavigate()
    React.useEffect(() => {
        navigate("/dashboard/users")
    }, [])

    const handleCheck =()=> {
        setCheck((prev) => !prev)
    }

    const openModal =()=>{
        localStorage.setItem("userId", "")
        setOpen(true)
    } 
    
    return (
        <div className=' w-full h-full rounded-lg bg-[#FAFAFA]' >
            <div className=' w-full flex ubuntu py-2 px-6 items-center ' >
                <p className=' font-bold text-[21px] mr-auto ' >Users</p>
                <Select fontSize="14px" width="200px" height="45px" >
                    <option>Monthly</option>
                </Select>
                <button onClick={()=> openModal()} className=' bg-[#183964] h-[45px] rounded px-6 text-sm text-white ml-4 ' >Add User</button>
            </div>
            <UserTableComponent check={check} close={setOpen} />
            <AddUserComponent open={open} close={setOpen} check={handleCheck} />
        </div>
    )
} 