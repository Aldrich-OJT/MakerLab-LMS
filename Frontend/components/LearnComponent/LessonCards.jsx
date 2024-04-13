import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import Colors from "../../constants/Colors";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { axiosDelete, axiosGet, axiosPut } from "../../utils/axios";
import { AuthContext } from "../../context/AuthProvider";

const deleteURL = "/api/video/delete/"

export default function LessonCards ({title, description, onPress}) {
  const [showDescription, setShowDescription] = useState(false);

  const showDescriptionHandler = () => {
      setShowDescription(!showDescription);
  };

    return (
      <Pressable style={styles.lessonContainer} onPress={onPress}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            <FontAwesome5 name="book" size={20} color={Colors.bgViolet} /> {title}
          </Text>

          <Pressable>
              <MaterialCommunityIcons 
                name="square-edit-outline" 
                size={24}
                color={Colors.bgYellow}
                style={styles.buttons}
              />
            </Pressable>

            <Pressable>
              <MaterialCommunityIcons 
                name="delete"
                size={24}
                color={Colors.bgYellow}
                style={styles.buttons}
              />
            </Pressable>
        </View>

          <View>            
            <Text 
              numberOfLines={showDescription ? undefined : 1}
              style={styles.lessonDescription}>
              {description}
            </Text>
          </View>

          {description.length > 50 && (
            <Pressable onPress={showDescriptionHandler}>
               <MaterialCommunityIcons 
                  name={showDescription ? "chevron-up" : "chevron-down"} 
                  size={26} 
                  color={Colors.bgViolet}
                  style={{alignSelf:'flex-end', marginRight:5 }}
               />
            </Pressable>
          )}
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
        marginTop: 20,
    },
    titleContainer: {
        flexDirection: 'row',
    },
    title:{
        color: Colors.bgViolet,
        fontSize: 20,
        fontFamily: 'PTSans-Bold',
        marginRight:5,
        flex:2,
        textAlignVertical: 'center'
    },
    buttons:{
      borderRadius:10,
      padding:7,
      backgroundColor: 'black',
      marginLeft: 10,
    },
    lessonDescription:{
        marginVertical: 5,
        fontSize: 14,
        fontFamily: 'PTSans-Regular',
        marginRight: 10,
        textAlign: 'justify',
    },
})