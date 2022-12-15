import React from 'react'
import axios from "axios";
import { Select } from '@chakra-ui/select';

export default function Index(props: any) {

    const [loadingOptions, setLoadingOptions] = React.useState(false)
    const [locations, setLocations] = React.useState({
        country: [], state: [],city: [] 
    })

    const [locationData, setLocationData] = React.useState({
        country: "", state: "",city: "" 
    }) 

    React.useEffect(() => {
        async function getCountryAndState() {
            setLoadingOptions(true)
            const { data: countries } = await axios(
                `https://www.universal-tutorial.com/api/countries/`,
                {
                method: "GET", // or 'PUT'
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("country-token")}`,
                    Accept: "application/json"
                }
                }
            );
            
            setLocations({
                country: countries.map((country: any) => country.country_name),
                state: locations.state,
                city: locations.city
            }) 

            // const { data: states } = await axios(
            //     `https://www.universal-tutorial.com/api/states/${locationData.country}`,
            //     {
            //     method: "GET", // or 'PUT'
            //     headers: {
            //         Authorization: `Bearer ${localStorage.getItem("country-token")}`,
            //         Accept: "application/json"
            //     }
            //     }
            // );

            // //   setStates(states.map((state: any) => state.state_name));

            // setLocations({
            //     country: locations.country,
            //     state: states.map((state: any) => state.state_name),
            //     city: locations.city
            // }) 
            // if (!locationData.state) setLoadingOptions(false);
            // const { data: LGAs } = await axios.get(
            //     `https://www.universal-tutorial.com/api/cities/${locationData.state}`,
            //     {
            //     method: "GET", // or 'PUT'
            //     headers: {
            //         Authorization: `Bearer ${localStorage.getItem("country-token")}`,
            //         Accept: "application/json"
            //     }
            //     }
            // );

        //   setLGAs(LGAs.map((lga: any) => lga.city_name));
        //   setLoadingOptions(false);
        } 
        if(localStorage.getItem("country-token")){ 
            getCountryAndState();
        }
    }, [locationData.country, locationData.state]);

    const ChangeHandler =(event: any)=> {
        if(props.name === "Nationality"){
            props.location(event.target.value)
        } else {
            props.birth(event.target.value)
        }
    }

    return ( 
        <div className=' w-full ' >
            <Select onChange={(e)=> ChangeHandler(e)} placeholder={props.name} fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  >
                {locations.country.map((item: any, index: any) => {
                    return(
                        <option key={index} >{item}</option>
                    )
                })}
            </Select>
        </div>
    )
} 