import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Pressable } from "react-native";
import Header from "../../components/Header";
import Colors from "../../constants/Colors";
import LessonCards from "../../components/LearnComponent/LessonCards";
import Learn from "./Learn";
//import { useNavigation } from '@react-navigation/native';
import { axiosGet } from "../../utils/axios";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { AuthContext } from "../../context/AuthProvider";

getCategoryURL = "/api/categories/"

export default function Lessons ({ navigation }) {
  //const {navigate} = useNavigation();
  const {token} = useContext(AuthContext)
  const tabBarHeight =  useBottomTabBarHeight()
  const [lessonData, setLessonData] = useState(null)

  //const [userProgress, setUserProgress] = useState('0');
  useEffect(()=>{
    const fetch = async()=>{
      const data = await axiosGet(getCategoryURL, token)
      if(data){
        setLessonData(data)
        console.log(data)
      }
    }

    fetch()
  },[])
  const handleNavigation= (param) => {
  navigation.navigate('Learn', { param });
  };
    return (
      <View>
        <Header/>
        <View style={styles.mainContainer}>
            <View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={lessonData}
                    renderItem={({ item }) => (
                      <Pressable onPress={() => handleNavigation(item)}>
                        <LessonCards
                        title={item.title}
                        //progress={item.progress}
                        description={item.description}
                        //assessScore={item.assessScore}
                        />
                        </Pressable>
                    )}
                    keyExtractor={item => item._id}
                    /> 
            </View>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: Colors.bgOffWhite,
        gap: 20,
        height: '100%',
    },
})