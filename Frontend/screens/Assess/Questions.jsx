import { View, StyleSheet, Text, Pressable, Alert } from "react-native";
import Colors from "../../constants/Colors";
import QuizItem from "../../components/QuizItem";
import LearnHeader from "../../components/LearnComponent/LearnHeader";
import QuizModal from "../../components/QuizModal";
import { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { axiosGet } from "../../utils/axios";
import { useRoute } from '@react-navigation/native';
import { AuthContext } from "../../context/AuthProvider";
import { useNavigation } from '@react-navigation/native';

const getQuizzesURL = "/api/question/"

export default function Assess() {
  const { token } = useContext(AuthContext)
  const [score, setScore] = useState(0)
  const route = useRoute()
  const param = route.params.item
  const navigation = useNavigation();

  const [quizData, setQuizData] = useState([])
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    //console.log(param)

    const fetchData = async () => {
      const data = await axiosGet(`${getQuizzesURL}${param._id}`, token)
      setQuizData(data)
      //console.log("QUIZDATA", data)
    }

    fetchData()
  }, [])

  // Alert user if leaving screen
  useEffect(() => {
    const leaving = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      Alert.alert(
        'Leave assessment?',
        'Do you want to leave the asssessment? Your progress will be lost.',
        [
          { text: "Stay", style: "cancel", onPress: () => {} },
          {
            text: "Leave",
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    });

    return leaving;
  }, [navigation]);

  const renderQuizItem = ({ item, index}) => (
    <QuizItem
      key={item._id}
      question={item.question}
      options={item.options}
      answer = {item.answer}
      setScore ={setScore}
      score ={score}
      itemNumber={index + 1}
    />
  );
  console.log(score)
  return (
    <View style={styles.mainContainer}>
      {modalVisible && (
        <QuizModal visibility={modalVisible} onPress={() => setModalVisible(false)}>
          Enter question
        </QuizModal>
      )}
      <LearnHeader title={param.title} navigation={navigation}/>
      <View style={styles.quizContainer}>
        <View style={styles.quizDescriptionContainer}>
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
          />) : <Text style={{alignSelf:"center", fontFamily: 'PTSans-Bold'}}> No questions found</Text>}

        </View>
      </View>

      <Pressable style={styles.addButton} //</View>onPress={() => setModalVisible(true)}
      >
          <Text style={styles.buttonText} onPress={() => setModalVisible(true)}>
            +
          </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  quizContainer: {
    backgroundColor: Colors.bgOffWhite,
    flex: 1,
    // width:"100%"
  },
  quizDescription: {
    marginVertical: 5,
    marginLeft: 6,
    fontSize: 16,
    fontFamily: 'PTSans-Regular'
  },
  quizDescriptionContainer: {
    backgroundColor: Colors.bgOffWhite,
    marginHorizontal: 10,
    marginBottom: 5,
    gap: 5

  },
  submitbutton: {
    backgroundColor: Colors.bgViolet,
    borderRadius: 10,
    width: '40%',
    alignSelf: 'center',
    marginBottom: 20,
    padding: 15,
  },
  submittext: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'PTSans-Bold'
  },
  flatlist: {
    justifyContent:"center",
    //alignItems:"center",
    flex: 1
  },
  addButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "black",
  },
  buttonText: {
    color: Colors.bgYellow,
    fontSize: 25
  },
})