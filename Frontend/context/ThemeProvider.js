import { createContext, useEffect, useState } from "react";

const light = {
    "colors": {
        "lightYellow": "#ffd766",
        "error": "#CF316A",
        "grayOffwhite": "#EDEDED",
        "offwhiteGray": "#484848",
        "whiteGray": "white",
        "darkGrayWhite": "white",
        "lightGrayOffwhite": "#CBCBCB",
        "lightGrayDarkgray": "#1D1D1D",
        "fontcolorPurple": "rgba(143, 124, 255,0.90)",
        "darkpurpletintPurple":"rgba(143, 124, 255,0.90)",
        "purpletintPurple": "rgba(238, 227, 255, 0.90)",
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
        "darkPurpleTint": "#8F7CFF",
        "primary": "rgb(120, 69, 172)",
        "onPrimary": "rgb(255, 255, 255)",
        "primaryContainer": "rgb(240, 219, 255)",
        "onPrimaryContainer": "rgb(44, 0, 81)",
        "secondary": "rgb(102, 90, 111)",
        "onSecondary": "rgb(255, 255, 255)",
        "secondaryContainer": "rgb(237, 221, 246)",
        "onSecondaryContainer": "rgb(33, 24, 42)",
        "tertiary": "rgb(128, 81, 88)",
        "onTertiary": "rgb(255, 255, 255)",
        "tertiaryContainer": "rgb(255, 217, 221)",
        "onTertiaryContainer": "rgb(50, 16, 23)",
        "error": "rgb(186, 26, 26)",
        "onError": "rgb(255, 255, 255)",
        "errorContainer": "rgb(255, 218, 214)",
        "onErrorContainer": "rgb(65, 0, 2)",
        "background": "rgb(255, 251, 255)",
        "onBackground": "rgb(29, 27, 30)",
        "surface": "rgb(255, 251, 255)",
        "onSurface": "rgb(29, 27, 30)",
        "surfaceVariant": "rgb(233, 223, 235)",
        "onSurfaceVariant": "rgb(74, 69, 78)",
        "outline": "rgb(124, 117, 126)",
        "outlineVariant": "rgb(204, 196, 206)",
        "shadow": "rgb(0, 0, 0)",
        "scrim": "rgb(0, 0, 0)",
        "inverseSurface": "rgb(50, 47, 51)",
        "inverseOnSurface": "rgb(245, 239, 244)",
        "inversePrimary": "rgb(220, 184, 255)",
        "elevation": {
          "level0": "transparent",
          "level1": "rgb(248, 242, 251)",
          "level2": "rgb(244, 236, 248)",
          "level3": "rgb(240, 231, 246)",
          "level4": "rgb(239, 229, 245)",
          "level5": "rgb(236, 226, 243)"
        },
        "surfaceDisabled": "rgba(29, 27, 30, 0.12)",
        "onSurfaceDisabled": "rgba(29, 27, 30, 0.38)",
        "backdrop": "rgba(51, 47, 55, 0.4)"
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
        "darkpurpletintPurple":"#8F7CfFF",
        "purpletintPurple": "#8F7CFF",
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
        "darkPurpleTint": "#8F7CFF",
        "primary": "rgb(220, 184, 255)",
        "onPrimary": "rgb(71, 12, 122)",
        "primaryContainer": "rgb(95, 43, 146)",
        "onPrimaryContainer": "rgb(240, 219, 255)",
        "secondary": "rgb(208, 193, 218)",
        "onSecondary": "rgb(54, 44, 63)",
        "secondaryContainer": "rgb(77, 67, 87)",
        "onSecondaryContainer": "rgb(237, 221, 246)",
        "tertiary": "rgb(243, 183, 190)",
        "onTertiary": "rgb(75, 37, 43)",
        "tertiaryContainer": "rgb(101, 58, 65)",
        "onTertiaryContainer": "rgb(255, 217, 221)",
        "error": "rgb(255, 180, 171)",
        "onError": "rgb(105, 0, 5)",
        "errorContainer": "rgb(147, 0, 10)",
        "onErrorContainer": "rgb(255, 180, 171)",
        "background": "rgb(29, 27, 30)",
        "onBackground": "rgb(231, 225, 229)",
        "surface": "rgb(29, 27, 30)",
        "onSurface": "rgb(231, 225, 229)",
        "surfaceVariant": "rgb(74, 69, 78)",
        "onSurfaceVariant": "rgb(204, 196, 206)",
        "outline": "rgb(150, 142, 152)",
        "outlineVariant": "rgb(74, 69, 78)",
        "shadow": "rgb(0, 0, 0)",
        "scrim": "rgb(0, 0, 0)",
        "inverseSurface": "rgb(231, 225, 229)",
        "inverseOnSurface": "rgb(50, 47, 51)",
        "inversePrimary": "rgb(120, 69, 172)",
        "elevation": {
          "level0": "transparent",
          "level1": "rgb(39, 35, 41)",
          "level2": "rgb(44, 40, 48)",
          "level3": "rgb(50, 44, 55)",
          "level4": "rgb(52, 46, 57)",
          "level5": "rgb(56, 49, 62)"
        },
        "surfaceDisabled": "rgba(231, 225, 229, 0.12)",
        "onSurfaceDisabled": "rgba(231, 225, 229, 0.38)",
        "backdrop": "rgba(51, 47, 55, 0.4)"

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


