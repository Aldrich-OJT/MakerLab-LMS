import { useState, createContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
    userData: null,
    isAuthenticated: false,
    authenticate: (userData) => { },
    logout: () => { }
})

export const DarkModeContext = createContext({
    isDarkMode: false,
    setIsDarkMode: (isDark) => { },
  });

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null)
    //const [userRole, setUserRole] = useState(null)
    const [isDarkMode, setIsDarkMode] = useState(false)

    const authenticate = (newUserData) => {
        setUserData(prevUserData => ({
            ...prevUserData,
            ...newUserData 
        }));
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
          <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
            {children}
          </DarkModeContext.Provider>
        </AuthContext.Provider>
      );
}

export default AuthProvider