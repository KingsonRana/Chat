import React, { useContext,useState } from "react";
import { createContext } from 'react';
export const MyContext = createContext();
export const TopProvider = (props)=>{

    
    const [from, setFrom] = useState("")
    const [name,setName] = useState("")
    const [to,setTo] = useState("")
    const [image,setImage] = useState("")

    return (
        <MyContext.Provider value={{setFrom,setName,setTo,name,from,to,image,setImage}}>
            {props.children}
        </MyContext.Provider>
    )
} 