import React, { useContext } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

import { useTheme } from 'react-native-paper';


function ShortcutTextContainer({ text, theme }) {

  return (
    <View style={styles.shortcutTextContainer}>
      <Text style={[styles.shortcutText, {color: theme.colors.whiteGray}]}>{text}</Text>
      <Text style={[styles.icons, {fontSize: 30, color:  theme.colors.offwhiteGray}]}></Text>
    </View>
  );
}

export default function Shortcut({ icon, text, onPress }) {
  const theme = useTheme()
  //const {isDarkMode} = useContext(DarkModeContext)

  return (
    <Pressable style={[styles.shortcuts, {backgroundColor:theme.colors.darkGrayWhite}]} onPress={onPress}>
      <Text style={[styles.icons, { fontSize: 70, color: theme.colors.offwhiteGray}]}>{icon}</Text>
      <ShortcutTextContainer 
      theme = {theme}
      text={text}  />
    </Pressable>
  );
}


  
const styles = StyleSheet.create({
  shortcuts: {
      flex: 1,
      padding: 20,
      borderRadius: 10,
      gap: 5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      
      elevation: 5,
    },
  shortcutTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight:40,
  },
  shortcutText:{     
    fontFamily: 'PTSans-Bold',
  },
  icons:{
    fontFamily: 'icon',
  },
})