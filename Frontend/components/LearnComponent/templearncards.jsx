import {Dimensions, View, Text, StyleSheet, Image, Pressable} from "react-native"
import Colors from "../../constants/Colors"
import { useState } from "react";
import { FontAwesome5 } from '@expo/vector-icons';

const dimensions = Dimensions.get("window");
const deviceWidth = dimensions.width;

export default function Templearncards({id,title, description, onPress, lessoncount}){
  //const [isPressed, setIsPressed] = useState(false);
  const [hasAssessment, setHasAssessment] = useState(false);

    return(
      <Pressable style={styles.container} onPress={onPress}>
        <View style={styles.lessonNumberTitle}>
          <Text style={styles.lessonNumberText}>
            Lesson {lessoncount}
          </Text>
          <FontAwesome5 style={styles.edit} name="pen" size={15} color="white" />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            <FontAwesome5
                name="book" 
                size={24} 
                color={Colors.bgViolet} />
           {' '} {title}
          </Text>
        </View>

        <Text style={styles.description} numberOfLines={1}>{description}</Text>
        
        <View style={styles.assessContainer}>
          <View>
                   {/* If newly added lesson = Add Assessment... if has existing assessment = Edit assessment */}
            <Text style={hasAssessment ? styles.assessEditText : styles.assessAddText}>
                {hasAssessment ? " Edit " : ' Add '}Assessment {' '}
                <FontAwesome5 
                  name={"chevron-right"} 
                  size={10} 
                  color={hasAssessment ? "white" : Colors.bgViolet}/>
            </Text>
          </View>
  
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
    marginTop: 30,
  },
  // video: {
  //   width: '50%',
  //   height: '50%',
  //   resizeMode:"contain",
  //   alignSelf:"center"
  // },
  lessonNumberTitle:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -(deviceWidth * .08),
  },
  lessonNumberText: {
    backgroundColor: Colors.bgGray,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
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
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  title: {
    color: Colors.bgViolet,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: -8,
    marginTop: 10,
  },
  description: {
    marginVertical: 15,
    fontSize: 13,
    minWidth: "100%",
  },
  assessContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
   assessEditText:{
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
   assessAddText:{
    backgroundColor: 'white',
    color: Colors.bgViolet,
    borderRadius: 50,
    borderWidth: 2,
    fontSize: 14,
    fontWeight: 'bold',
    borderColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginHorizontal: -2,
  },
})
