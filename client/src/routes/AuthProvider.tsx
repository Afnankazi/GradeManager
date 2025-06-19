import React, { createContext, useContext, useState } from 'react'

interface Value{
    isAuth:boolean,
    loading:boolean,
    login():void,
    logout():void
}

const AuthContext = createContext<Value | null>(null)
export const AuthProvider = ({children} ) => {

    const[isAuth , setIsAuth]= useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const login = () : void => {
        setLoading(true);
        localStorage.setItem("isAuth","true");
        setIsAuth(true);
        setLoading(false);
    }
    const logout = (): void =>{
        setLoading(true);
        localStorage.setItem("isAuth","false");
        setIsAuth(false);
        setLoading(false);
    }
    const value:Value = {isAuth , login , logout}
   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  
}
export const useAuth = (): Value => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
};


export default AuthProvider
