import { Dimensions, View, Text, StyleSheet, Image, Pressable } from "react-native"
import Colors from "../../constants/Colors"
import { useState } from "react";
import { FontAwesome5 } from '@expo/vector-icons';

const dimensions = Dimensions.get("window");
const deviceWidth = dimensions.width;

export default function Templearncards({ id, title, description, onPress, lessoncount,pressQuiz,pressLearn }) {
  //const [isPressed, setIsPressed] = useState(false);
  //const [hasAssessment, setHasAssessment] = useState(false);

  return (
    <Pressable style={styles.container} onPress={pressLearn}>
      <View style={styles.lessonNumberTitle}>
        <Text style={styles.lessonNumberText}>
          Lesson {lessoncount}
        </Text>
      </View>

      <View style={styles.titleContainer} numberOfLines={1}>
        <FontAwesome5
          //style={styles.titleIcon}
          name="book"
          size={24}
          color={Colors.bgViolet} />
        <Text style={styles.title}>{title} </Text>
      </View>

      <View>
        <Text style={styles.description} numberOfLines={1}>{description}</Text>
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

        <View>
          <FontAwesome5
            style={{ top: 6 }}
            name="chevron-right"
            size={13}
            color={'black'} />
        </View>
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
    marginVertical:10
  },
  // video: {
  //   width: '50%',
  //   height: '50%',
  //   resizeMode:"contain",
  //   alignSelf:"center"
  // },
  lessonNumberTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -30,
    
  },
  lessonNumberText: {
    backgroundColor: Colors.bgGray,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    borderRadius: 15,
    width: deviceWidth * .3,
    paddingVertical: 5,
    textAlign: 'center',
    overflow:"hidden",
   
  },
  edit: {
    position: 'absolute',
    right: 0,
    backgroundColor: Colors.bgViolet,
    width: deviceWidth * .12,
    paddingVertical: 8,
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: 50,
  },
  titleContainer: {
    marginTop:10,
    flexDirection: 'row',
    gap: 5
  },
  title: {
    color: Colors.bgViolet,
    fontSize: 22,
    fontWeight: 'bold',
    //marginBottom: -8,
    //marginTop: 20,
  },
  description: {
    marginVertical: 15,
    fontSize: 13,
    minWidth: "100%",
  },
  assessContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  assessEditText: {
    backgroundColor: Colors.bgViolet,
    color: 'white',
    borderRadius: 50,
    borderWidth: 2,
    fontSize: 14,
    fontWeight: 'bold',
    borderColor: Colors.bgViolet,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginHorizontal: -2,
  },
  assessAddText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.bgViolet,
  },
  title: {
    color: Colors.bgViolet,
    fontSize: 22,
    fontWeight: 'bold',

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
