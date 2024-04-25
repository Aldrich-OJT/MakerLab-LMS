import { createContext, useEffect, useState } from "react";

const light = {
    "colors": {
        "lightYellow": "#ffd766",
        "error": "#CF316A",
        "grayOffwhite": "#EDEDED",
        "offwhiteGray": "#484848",
        "whiteGray": "#484848",
        "darkGrayWhite": "white",
        "lightGrayOffwhite": "#CBCBCB",
        "lightGrayDarkgray": "#1D1D1D",
        "fontcolorPurple": "rgba(143, 124, 255,0.90)",
        "darkpurpletintPurple":"rgba(143, 124, 255,0.90)",
        "purpletintPurple": "#8F7CFF",
        "grayLightgray":"#484848",
        "fontcolor":"#1D1D1D",
        "fontcolorOffwhiteBlack":"black",
        "Violet": "#733AD1",
        "RedInvalid": "#Be254b",
        "Purple": "#8F7CFF",
        "Gray": "#484848",
        "LightGray": "#CBCBCB",
        "DarkGray": "#1D1D1D",
        "yellow": "#FFB800",
        "offWhite": '#EDEDED',
        "violet": "#733AD1",
        "redInvalid": "#Be254b",
        "purpleTint": "rgba(238, 227, 255, 0.90)",
        "darkPurpleTint": "#8F7CFF"
    }

}
const dark = {
    "colors": {
        "thisisdark":"dark",
        "lightYellow": "#ffd766",
        "error": "#CF316A",
        "grayOffwhite": "#484848",
        "offwhiteGray": "#EDEDED",
        "whiteGray": "#EDEDED",
        "darkGrayWhite": "#1D1D1D",
        "lightGrayOffwhite":"#EDEDED",
        "lightGrayDarkgray": "#CBCBCB",
        "fontcolorPurple": "rgba(238, 227, 255, 0.90)",
        "darkpurpletintPurple":"#8F7CFF",
        "purpletintPurple": "rgba(238, 227, 255, 0.90)",
        "grayLightgray":"#CBCBCB",
        "fontcolor": "white",
        "fontcolorOffwhiteBlack":"#EDEDED",
        "violet": "#733AD1",
        "redInvalid": "#Be254b",
        "Purple": "#8F7CFF",
        "Gray": "#484848",
        "LightGray": "#CBCBCB",
        "yellow": "#FFB800",
        "offWhite": '#EDEDED',
        "violet": "#733AD1",
        "redInvalid": "#Be254b",
        "DarkGray": "#1D1D1D",
        "purpleTint": "rgba(238, 227, 255, 0.90)",
        "darkPurpleTint": "#8F7CFF"
    }

}


export const DarkModeContext = createContext({})

const ThemeProvider =({children})=>{
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [theme, setTheme] = useState(light)


    const toggleDarkMode = ()=>{
        setIsDarkMode(!isDarkMode)
        
        
       
    }
    useEffect(()=>{
        setTheme(isDarkMode ? dark : light)
    },[isDarkMode])

    const contextValue = {
        theme: theme,
        toggleDarkMode: toggleDarkMode
    }
    console.log("dark",isDarkMode)
     //console.log(theme)
    return(
        <DarkModeContext.Provider value={contextValue}>
            {children}
        </DarkModeContext.Provider>
    
    )
}

export default ThemeProvider;


