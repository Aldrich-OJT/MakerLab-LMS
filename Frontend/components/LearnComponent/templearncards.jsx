import { View, Text, StyleSheet, Pressable } from "react-native"
import Colors from "../../constants/Colors"
import { useState } from "react";

export default function Templearncards({ id, title, description, onPress, pressQuiz,pressLearn, index, length }) {

  return (
    <Pressable style={[styles.container, { marginBottom: index === length-1 ? 70 : 0 }]} onPress={pressLearn}>
      
      <View style={styles.purpleTint}>
        <View style={styles.titleContainer} numberOfLines={1}>
          <Text style={styles.title} numberOfLines={1}>{title} </Text>
        </View>
        <Text style={styles.lessonNumber}>Lesson {index+1}</Text>
      </View>

        <View>
          <Text numberOfLines={2} style={styles.description}>{description}</Text>
        </View>

      <View style={styles.assessContainer}>
        <Pressable style={styles.assessmentButton} onPress={pressQuiz}>
          <Text style={styles.assessAddText}>
            Assessment
          </Text>
          <Text style={{fontFamily: 'icon', fontSize:20, color: 'white'}}></Text> 
        </Pressable>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop:20,
    minWidth: '90%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 5,
  },
  // video: {
  //   width: '50%',
  //   height: '50%',
  //   resizeMode:"contain",
  //   alignSelf:"center"
  // },
  titleContainer: {
    flexDirection: 'row',
    marginHorizontal:20,
    marginTop:10,
  },
  title: {
    color: Colors.bgPurple,
    fontSize: 20,
    fontFamily: 'PTSans-Bold',
  },
  purpleTint:{
    backgroundColor: 'rgba(238, 227, 255, 0.90)',
  },
  lessonNumber:{
    fontFamily: 'PTSans-Regular',
    color: Colors.bgPurple,
    fontSize: 16,
    marginTop:5,
    marginBottom:10,
    marginLeft:20,
  },
  description: {
    marginVertical:10,
    marginHorizontal:20,
    fontSize: 14,
    textAlign:"justify",
    fontFamily: 'PTSans-Regular',
  },
  assessContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  assessAddText: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'PTSans-Bold',
  },
  assessmentButton:{
    flexDirection:"row",
    alignItems:"center",
    gap: 5,
    backgroundColor: Colors.bgPurple,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginRight:20,
    marginBottom:10,
  }
})
