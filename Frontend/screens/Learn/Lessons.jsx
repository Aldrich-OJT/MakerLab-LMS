import React, { useState } from "react";
import { StyleSheet, View, FlatList, Pressable } from "react-native";
import Header from "../../components/Header";
import Colors from "../../constants/Colors";
import LessonCards from "../../components/LearnComponent/LessonCards";
import Learn from "./Learn";
import { useNavigation } from '@react-navigation/native';

export default function Lessons () {
  const navigation = useNavigation();
  //const [userProgress, setUserProgress] = useState('0');
  const handleNavigation= (lessonId) => {
    if (lessonId === '1') {
      navigation.navigate(Learn);
    }
  };

  const lessons = [
      {
        id: '1',
        title: 'MakerLab',
        progress: '100%',
        description: 'Learn about the makerlab through this learning material.',
        assessScore: '20'
      },
      {
        id: '2',
        title: 'Subject 2',
        progress: '57%',
        description: 'Learn about the fundamentals of ---- through this learning material.',
        assessScore: '14'
      },
      {
        id: '3',
        title: 'Subject 3',
        progress: '0%',
        description: 'Learn about the basics of ---- through this learning material.',
        assessScore: '6'
      },
    ];
    return (
      <View>
        <Header/>
        <View style={styles.mainContainer}>
            <View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={lessons}
                    renderItem={({ item }) => (
                      <Pressable onPress={() => handleNavigation(item.id)}>
                        <LessonCards
                        title={item.title}
                        progress={item.progress}
                        description={item.description}
                        assessScore={item.assessScore}
                        />
                        </Pressable>
                    )}
                    keyExtractor={item => item.id}
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