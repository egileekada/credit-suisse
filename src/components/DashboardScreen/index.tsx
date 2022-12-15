import { Checkbox, Input, Select, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react' 
import Trash from "../../assets/trash.svg"
import React from 'react'
import { useNavigate } from 'react-router-dom'
import UserTableComponent from '../UserTableComponent'

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
            <UserTableComponent />
        </div>
    )
} 