import { Dimensions, View, Text, StyleSheet, Image, Pressable } from "react-native"
import Colors from "../../constants/Colors"
import { useState } from "react";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const dimensions = Dimensions.get("window");
const deviceWidth = dimensions.width;

export default function Templearncards({ id, title, description, onPress, lessoncount,pressQuiz,pressLearn }) {

  return (
    <Pressable style={[styles.container, { marginTop: lessoncount === 1 ? 25 : 0 }]} onPress={pressLearn}>
      <View style={styles.lessonNumberContainer}>
        <Text style={styles.lessonNumberText}>
          Lesson {lessoncount}
        </Text>
      </View>

      <View style={styles.titleContainer} numberOfLines={1}>
        <FontAwesome5
          name="book"
          size={24}
          color={Colors.bgViolet} />
        <Text style={styles.title}>{title} </Text>
      </View>

      <View>
        <Text numberOfLines={2} 
        style={styles.description}
        >{description}</Text>
      </View>

      <View style={styles.assessContainer}>
        <Pressable style={styles.assessmentButton} onPress={pressQuiz}>
          <Text style={styles.assessAddText}>
            Assessment
            
          </Text>
          <FontAwesome5
              name={"chevron-right"}
              size={10}
              color={Colors.bgViolet} />
        </Pressable>
        
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: Colors.bgYellow,
    borderRadius: 10,
    height: 'fit-content',
    minwidth: '100%',
    padding: 20,
    marginHorizontal: 20,
    marginBottom:25,
  },
  // video: {
  //   width: '50%',
  //   height: '50%',
  //   resizeMode:"contain",
  //   alignSelf:"center"
  // },
  lessonNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -30,
  
  },
  lessonNumberText: {
    backgroundColor: 'black',
    fontSize: 16,
    color: 'white',
    fontFamily: 'PTSans-Bold',
    borderRadius: 15,
    width: "30%",
    paddingVertical: 5,
    textAlign: 'center',
    overflow:"hidden",
   
  },
  titleContainer: {
    marginTop:4,
    flexDirection: 'row',
    gap: 5,
    marginRight:20
  },
  title: {
    color: Colors.bgViolet,
    fontSize: 20,
    fontFamily: 'PTSans-Bold',
  },
  description: {
    marginBottom: 15,
    marginTop: 5,
    fontSize: 14,
    minWidth: "100%",
    textAlign:"justify",
    fontFamily: 'PTSans-Regular',
  },
  assessContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  assessAddText: {
    fontSize: 14,
    color: Colors.bgViolet,
    fontFamily: 'PTSans-Bold',
  },
  assessmentButton:{
    flexDirection:"row",
    alignItems:"center",
    gap: 5,
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginHorizontal: -2,
  }
})
