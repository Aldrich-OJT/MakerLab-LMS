import React, { useContext } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { DarkModeContext } from '../../context/AuthProvider';

export default function Shortcut({ icon, text, onPress }) {
  const {isDarkMode} = useContext(DarkModeContext)

  return (
    <Pressable style={[styles.shortcuts, {backgroundColor: isDarkMode ? Colors.bgDarkGray : 'white'}]} onPress={onPress}>
      <Text style={[styles.icons, { fontSize: 70, color: isDarkMode ? Colors.bgOffWhite : Colors.bgGray}]}>{icon}</Text>
      <ShortcutTextContainer text={text} isDarkMode={isDarkMode} />
    </Pressable>
  );
}

function ShortcutTextContainer({ text, isDarkMode }) {
  return (
    <View style={styles.shortcutTextContainer}>
      <Text style={[styles.shortcutText, {color: isDarkMode ? 'white' : Colors.bgGray}]}>{text}</Text>
      <Text style={[styles.icons, {fontSize: 30, color: isDarkMode ?  Colors.bgOffWhite : Colors.bgGray}]}></Text>
    </View>
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