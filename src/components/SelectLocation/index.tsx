import React from 'react'
import { Select } from '@chakra-ui/select';

export default function Index(props: any) {

    const [loadingOptions, setLoadingOptions] = React.useState(false)
    const [locations, setLocations] = React.useState<Array<string>>([])

    React.useEffect(() => {
        setLoadingOptions(true)
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                const countryNames = data.map((country: any) => country.name.common);
                setLocations([...countryNames])
                setLoadingOptions(false)
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const ChangeHandler = (event: any) => {
        if (props.name === "Nationality") {
            props.location(event.target.value)
        } else {
            props.birth(event.target.value)
        }
    }

    return (
        <div className=' w-full flex justify-center ' >
            {loadingOptions && (
                <p>Loading...</p>
            )}
            {!loadingOptions && (
                <Select onChange={(e) => ChangeHandler(e)} placeholder={props.name} fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  >
                    {locations.map((item: any, index: any) => {
                        return (
                            <option key={index} >{item}</option>
                        )
                    })}
                </Select>
            )}
        </div>
    )
} 