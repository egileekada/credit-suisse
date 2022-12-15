import React, { useState, createContext, useContext } from "react";

export interface IUser {
  user: any, 
  setUser: Function, 
  search: any, 
  setSearch: Function, 
  check: any, 
  setCheck: Function,  
  filter: any, 
  setFilter: Function
}

export const UserContext = React.createContext({} as IUser); 

export const useUser = () => useContext(UserContext);

export const UserContextProvider = (props: any) => {
  const [user, setUser] = useState({} as any);   
  const [search, setSearch] = useState(""); 
  const [check, setCheck] = useState(""); 
  const [filter, setFilter] = useState({} as any); 

  return <UserContext.Provider value={{user, setUser, filter, setFilter, check, setCheck, search, setSearch}}>
  {
      props.children
  }</UserContext.Provider>;
};
