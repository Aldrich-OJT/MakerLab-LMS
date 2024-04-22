import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default function Shortcut({ icon, text, onPress }) {
  return (
    <Pressable style={styles.shortcuts} onPress={onPress}>
      <Text style={[styles.icons, { fontSize: 70 }]}>{icon}</Text>
      <ShortcutTextContainer text={text} />
    </Pressable>
  );
}

function ShortcutTextContainer({ text }) {
  return (
    <View style={styles.shortcutTextContainer}>
      <Text style={styles.shortcutText}>{text}</Text>
      <Text style={[styles.icons, { fontSize: 30 }]}></Text>
    </View>
  );
}
  
const styles = StyleSheet.create({
  shortcuts: {
      flex: 1,
      backgroundColor: 'white',
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
    color:Colors.bgGray,
  },
})