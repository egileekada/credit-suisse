import React from 'react' 
import { useNavigate, useLocation } from 'react-router-dom'
import Logo from "../../../../assets/logo.svg"
import { IUser, UserContext } from '../../../../context';
import SideBarIcons from '../SideBarIcons'

export default function Index() {
    
    const userContext: IUser = React.useContext(UserContext); 

    const TabArray = [
        {
            name: "Dashboard",
            link: "/dashboard"
        },
        {
            name: "Users",
            link: "/dashboard/users"
        },
        // {
        //     name: "Profile",
        //     link: "/dashboard/profile"
        // },
    ]

    const BottomTab = [ 
        // {
        //     name: "Help & Support",
        //     link: "/dashboard/help&support"
        // },
        // {
        //     name: "Settings",
        //     link: "/dashboard/settings"
        // },
        {
            name: "Log Out",
            link: "/"
        }
    ]

    const location = useLocation();
    const navigate = useNavigate() 

    const [tab, setTab] = React.useState(location.pathname)

    const ClickHandler =(link: any) => {
        userContext.setSearch("")
        setTab(link)
        navigate(link)
    }

    return (
        <div className=' w-[250px] h-screen py-6 bg-[#FAFAFA] pl-12' >
            <img src={Logo} className=" w-[170px]  " alt="logo" />
            <div className=' h-full w-full flex flex-col pt-10 justify-between ' >
                <div className=' w-full ' >
                    {TabArray.map((item: any) => {
                        return(
                            <button onClick={()=> ClickHandler(item.link)} key={item.name} className=' w-full flex h-[40px] cursor-pointer my-6 items-center ' >
                                <div className=' w-6 ' >
                                    <SideBarIcons name={item.name} active={tab} />
                                </div>
                                <p className={item.link === tab ? ' font-bold ml-[18px] text-[#1E62E4] ' : ' font-bold ml-[18px] text-[#5D667B] ' } >{item.name}</p>
                                {item.link === tab && ( 
                                    <div className=' ml-auto w-[5px] h-[40px] bg-[#1E62E4] rounded-l-2xl ' />
                                ) }
                            </button>
                        )
                    })}
                </div>
                <div className=' w-full ' >
                    {BottomTab.map((item: any) => {
                        return(
                            <button onClick={()=> ClickHandler(item.link)} key={item.name} className=' w-full flex h-[40px] cursor-pointer my-6 items-center ' >
                                <div className=' w-6 ' >
                                    <SideBarIcons name={item.name} active={tab} />
                                </div>
                                <p className={item.link === tab ? ' font-bold ml-[18px] text-[#1E62E4] ' : ' font-bold ml-[18px] text-[#5D667B] ' } >{item.name}</p>
                                {item.link === tab && ( 
                                    <div className=' ml-auto w-[5px] h-[40px] bg-[#1E62E4] rounded-l-2xl ' />
                                ) }
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
