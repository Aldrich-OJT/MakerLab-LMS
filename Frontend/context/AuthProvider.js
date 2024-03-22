import { useState, createContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
    token:"",
    isAuthenticated: false,
    authenticate: (token)=>{},
    logout: ()=>{}
})


const AuthProvider = ({children})=>{
    const [authToken, setAuthToken] = useState(null)


    const authenticate = (token)=>{
        setAuthToken(token)
        AsyncStorage.setItem('token',token)
    }
    const logout = ()=>{
        setAuthToken(null)
        AsyncStorage.removeItem('token')
        console.log("logout success")
    }
    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout
        
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider