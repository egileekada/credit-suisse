import React from 'react'
import { useGetDataCallback } from '../../../../action/useAction';
import Bar from "../../../../assets/Bars.png"
import { IUser, UserContext } from '../../../../context';
import { cashFormat } from '../../../../utils/cashFormat';

export default function Index() {
 
    const { handleGetData } = useGetDataCallback(); 
    const [ dataInfo, setDataInfo ] = React.useState([] as any)
    const userContext: IUser = React.useContext(UserContext);

    const GetInformation =async()=>{
        const request = await handleGetData("/admin/dashboard")  
        setDataInfo(request.data.data)
    } 

    React.useEffect(() => { 
        GetInformation() 
    }, [userContext.check])  
    return (
        <div className=' w-full flex justify-between px-10 py-[25px] rounded-lg bg-[#FAFAFA] ' >
            <div className=' w-fit ' >
                <p className=' font-normal text-[#656E86] text-sm ' >Total Users</p>
                <div className=' w-full flex my-1 items-start ' >
                    <p className=' font-bold text-[#656E86] text-[20px] mr-4 ' >{dataInfo?.total_users}</p>
                    <img src={Bar} alt="Bars" className=" ml-auto " />
                </div>
                <p className=' font-normal text-[#656E86] text-xs ' >400+ Extra (Last Month)</p>
            </div>
            <div className=' w-fit ' >
                <p className=' font-normal text-[#656E86] text-sm ' >Savings Account</p>
                <div className=' w-full flex my-1 items-start ' >
                    <p className=' font-bold text-[#656E86] text-[20px] mr-4 ' >${cashFormat(Number(dataInfo?.savings_account_count))}</p>
                    <img src={Bar} alt="Bars" className=" ml-auto " />
                </div>
                <p className=' font-normal text-[#656E86] text-xs ' >Prepared to $25.00 (Last Month)</p>
            </div>
            <div className=' w-fit ' >
                <p className=' font-normal text-[#656E86] text-sm ' >Current Account</p>
                <div className=' w-full flex my-1 items-start ' >
                    <p className=' font-bold text-[#656E86] text-[20px] mr-4 ' >${cashFormat(Number(dataInfo?.current_account_count))}</p>
                    <img src={Bar} alt="Bars" className=" ml-auto " />
                </div>
                <p className=' font-normal text-[#656E86] text-xs ' >Prepared to $25.00 (Last Month)</p>
            </div>
        </div>
    )
} 