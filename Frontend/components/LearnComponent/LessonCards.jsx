import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import Colors from "../../constants/Colors";
import { FontAwesome5 } from '@expo/vector-icons';


export default function LessonCards ({title, progress, description, onPress}) {
    const isCompleted = progress === '100%';
    
    return (
      <Pressable style={styles.lessonContainer} onPress={onPress}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            <FontAwesome5 name="book" size={20} color={Colors.bgViolet} /> {title}
          </Text>
          <Text style={styles.titleProgress}>{progress}</Text>
        </View>
  
        <Text style={styles.lessonDescription}>
            {description}
        </Text>
  
        <View style={styles.assessContainer}>
          {/* <View style={styles.assessProgress}>
            <Text style={[styles.assessText, 
                {color: isCompleted ? 'white' : Colors.bgVioletDisable}]}>
                Assessment {' '}
                <FontAwesome5 
                  name={isCompleted ? "chevron-right" : "lock"} 
                  size={10} 
                  color={isCompleted ? "white" : Colors.bgVioletDisable}/>
            </Text>

            <Text style={styles.assessScore}>
                {isCompleted ? assessScore : '   ?'}
                {isCompleted ? '/20' : '/?'}
            </Text>
          </View> */}
  
          {/* <View>
            <FontAwesome5 
              style={{ top: 6 }} 
              name="chevron-right" 
              size={13} 
              color={Colors.bgDarkViolet} />
          </View> */}
        </View>
      </Pressable>
    );
  };

const styles = StyleSheet.create({
    lessonContainer: {
        flexDirection: 'column',
        backgroundColor: Colors.bgYellow,
        borderRadius: 10,
        height: 'fit-content',
        minwidth: '100%',
        padding: 20,
        marginHorizontal: 20,
        marginTop: 20
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    title:{
        color: Colors.bgViolet,
        fontSize: 22,
        fontFamily: 'PTSans-Bold'
    },
    titleProgress:{
        color: Colors.bgViolet,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 4,
        bottom: 3,
        borderRadius: 50,
        minWidth: '20%',
        textAlign: 'center',
    },
    lessonDescription:{
        marginVertical: 10,
        fontSize: 15,
        minWidth: "100%",
        fontFamily: 'PTSans-Regular'
    },
    assessContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    // assessProgress:{
    //     flexDirection: 'row',
    //     borderColor: Colors.bgViolet,
    //     borderWidth: 2,
    //     borderRadius: 50,
    //     minWidth: '50%',
    // },
    // assessText:{
    //     backgroundColor: Colors.bgViolet,
    //     color: Colors.bgOffWhite,
    //     borderRadius: 50,
    //     borderWidth: 2,
    //     fontSize: 12,
    //     fontWeight: 'bold',
    //     borderColor: Colors.bgViolet,
    //     paddingHorizontal: 10,
    //     paddingVertical: 7,
    //     margin: -2,
    // },
    // assessScore:{
    //     color: Colors.bgViolet,
    //     fontSize: 12,
    //     fontWeight: 'bold',
    //     paddingHorizontal: 5,
    //     paddingVertical: 6,
    // },

})