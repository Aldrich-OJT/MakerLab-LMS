import { useState, createContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeProvider from "react-native-paper";

export const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null)
    //const [userRole, setUserRole] = useState(null)
   

    const authenticate = async (newUserData) => {
        setUserData(newUserData)
        console.log("this will be my userdata", userData)
        AsyncStorage.setItem('userData', JSON.stringify(newUserData));
    }
    const logout = () => {
        console.log("logout called")
        setUserData(null)
        AsyncStorage.removeItem('userData')
        console.log("logout success")
    }

    const value = {
        userData: userData,
        isAuthenticated: !!userData,
        authenticate: authenticate,
        logout: logout

    }
    console.log(userData)

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider