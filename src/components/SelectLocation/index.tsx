import { Select } from '@chakra-ui/react';
// import React from 'react'
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

export default function Index(props: any) { 

    countries.registerLocale(enLocale);

    const countryObj = countries.getNames('en', { select: 'official' });

    const countryList = Object.entries(countryObj).map(([code,name]) => ({
        label: name,
        value: code,
    }));

    const ChangeHandler = (event: any) => {
        if (props.name === "Nationality") {
            props.location(event.target.value)
        } else {
            props.birth(event.target.value)
        }
    } 

    
    return (
        <div className=' w-full flex justify-center ' > 
                <Select onChange={(e) => ChangeHandler(e)} placeholder={props.name} fontSize="14px" height="50px" border="1px solid #E1E2E5" border-radius="5px"  >
                    {countryList.map((item: {
                        label: string,
                        value: string,
                    }, index: any) => {
                        return (
                            <option key={index} value={item.label} >{item.label}</option>
                        )
                    })}
                </Select> 
        </div>
    )
} 