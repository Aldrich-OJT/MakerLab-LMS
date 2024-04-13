import { Dimensions, View, Text, StyleSheet, Image, Pressable } from "react-native"
import Colors from "../../constants/Colors"
import { useState } from "react";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const dimensions = Dimensions.get("window");
const deviceWidth = dimensions.width;

export default function Templearncards({ id, title, description, onPress, lessoncount,pressQuiz,pressLearn }) {
  const [showDescription, setShowDescription] = useState(false);

  const showDescriptionHandler = () => {
      setShowDescription(!showDescription);
  };

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
        <Text numberOfLines={showDescription ? undefined : 1} 
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
        
        {description.length > 50 && (
            <Pressable onPress={showDescriptionHandler}>
               <MaterialCommunityIcons 
                  name={showDescription ? "chevron-up" : "chevron-down"} 
                  size={26} 
                  color={Colors.bgViolet}
                  style={{alignSelf:'flex-end', marginRight:5,}}
               />
            </Pressable>
          )}
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
    backgroundColor: 'black',
    fontSize: 16,
    color: 'white',
    fontFamily: 'PTSans-Bold',
    borderRadius: 50,
    width: deviceWidth * .3,
    paddingVertical: 5,
    textAlign: 'center',
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
    gap: 5,
  },
  title: {
    color: Colors.bgViolet,
    fontSize: 20,
    fontFamily: 'PTSans-Bold',
    //marginBottom: -8,
    //marginTop: 20,
  },
  description: {
    marginBottom: 15,
    marginTop: 5,
    fontSize: 14,
    minWidth: "100%",
    fontFamily: 'PTSans-Regular',
  },
  assessContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  //assessEditText: {
  //  backgroundColor: Colors.bgViolet,
  //  color: 'white',
  //  borderRadius: 50,
  //  borderWidth: 2,
  //  fontSize: 16,
  //  fontFamily: 'PTSans-Bold',
  //  borderColor: Colors.bgViolet,
  //  paddingHorizontal: 10,
  //  paddingVertical: 7,
  //  marginHorizontal: -2,
  //},
  assessAddText: {
    fontSize: 14,
    color: Colors.bgViolet,
    fontFamily: 'PTSans-Bold',
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
