import { View, StyleSheet, Text, Pressable } from "react-native";
import Colors from "../../constants/Colors";
import QuizItem from "../../components/QuizItem";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from "../../components/Header";
import { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { axiosGet } from "../../utils/axios";
import { useRoute } from '@react-navigation/native';
import { AuthContext } from "../../context/AuthProvider";

const getQuizzesURL = "/api/question/"

export default function Assess() {
  const { token } = useContext(AuthContext)
  const [score, setScore] = useState(0)
  const route = useRoute()
  const param = route.params.item


  const [quizData, setQuizData] = useState([])

  useEffect(() => {
    //console.log(param)

    const fetchData = async () => {
      const data = await axiosGet(`${getQuizzesURL}${param._id}`, token)
      setQuizData(data)
      //console.log("QUIZDATA", data)
    }

    fetchData()
  }, [])
  const renderQuizItem = ({ item }) => (
    <QuizItem
      key={item._id}
      question={item.question}
      options={item.options}
      answer = {item.answer}
      setScore ={setScore}
      score ={score}
    />
  );
  console.log(score)
  return (
    <View style={styles.mainContainer}>
      <Header />
      <View style={styles.quizContainer}>
        <View style={styles.quizEditContainer}>
          <Text style={styles.quizName}>{param.title}:</Text>
          <Text style={styles.quizDescription}>Choose the correct answer.</Text>
        </View>

        <View style={styles.flatlist}>
          {quizData.length>0 ? (<FlatList

            showsVerticalScrollIndicator={false}
            data={quizData}
            renderItem={renderQuizItem}
            keyExtractor={item => item._id}
            ListFooterComponent={
              <Pressable style={styles.submitbutton}>
                <Text style={styles.submittext}>Submit</Text>
              </Pressable>
            }
          />) : <Text style={{alignSelf:"center"}}> No questions found</Text>}

        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.bgOffWhite,
  },
  quizContainer: {
    backgroundColor: Colors.bgOffWhite,
    flex: 1,
    // width:"100%"
  },
  quizName: {
    fontSize: 50,
    fontFamily: 'Dongle-Regular',
  },
  quizDescription: {
    marginTop: -10,
    marginLeft: 6,
    fontSize: 16,
  },
  quizEditContainer: {
    backgroundColor: Colors.bgOffWhite,
    marginHorizontal: 10,
    marginBottom: 5,
    gap: 5

  },
  submitbutton: {
    //alignSelf: 'center',
    backgroundColor: Colors.bgYellow,
    borderRadius: 6,
    margin: 10,
    padding: 15,

  },
  submittext: {
    fontSize: 20,
    color: 'black',
    alignSelf: 'center',
  },
  flatlist: {
    justifyContent:"center",
    //alignItems:"center",
    flex: 1
  }
})