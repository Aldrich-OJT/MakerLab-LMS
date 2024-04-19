import { View, StyleSheet, Text, Pressable, Alert } from "react-native";
import Colors from "../../constants/Colors";
import QuizItem from "../../components/QuizItem";
import LearnHeader from "../../components/LearnComponent/LearnHeader";
import QuizModal from "../../components/QuizModal";
import { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import {  axiosGet, axiosPut } from "../../utils/axios";
import { AuthContext } from "../../context/AuthProvider";
import { ActivityIndicator, Modal } from "react-native-paper";


const getQuizzesURL = "/api/question/"
const editScoreURL = "/api/user/data/update/"
const contentType = "application/json"


export default function Quiz({route, navigation}) {
  const { userData } = useContext(AuthContext)
  //console.log(userData)
  const [score, setScore] = useState(0)
  const [isloading, setLoading] = useState(false)
  const [errorMessage,setErrorMessage ] = useState("")
  const [questionNumber, setQuestionNumber] = useState(0)
  const param = route.params.item
  const [modalVisible, setModalVisible] = useState(false);
  const [submitModalVisible, setSubmitModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [singleScore, setSingleScore] = useState(0)
  const [quizData, setQuizData] = useState([])
  const [selectedData, setSelectedData] =  useState()
  const [quizForm, setQuizForm] = useState({
    quizScores: {
      postId: param._id,
      score: score,
      passed: false
    }
  })
  useEffect(() => {
    setQuizForm(prevstate => ({
      ...prevstate,
      quizScores: {
        ...prevstate.quizScores,
        score: score,
        passed: score < Math.round(quizData.length * .6) ? false : true
      }
    }))
  }, [score])

  useEffect(() => {
    let newScore = score
    //initial value of score is zero, so this code prevents from subtracting at the inital value
    const setNewScore = ()=>{
      if (singleScore === 0 && score != 0) {
        // console.log("change")
        // console.log(props.singleScore)
  
        newScore -= 1
      } else {
        newScore += singleScore
      }
      setScore(newScore)
    }

    setNewScore()
  }, [singleScore])
  
 

  useEffect(() => {
    //console.log(param)

    const fetchData = async () => {
      setLoading(true)
      console.log("fetch rerendered")
      const data = await axiosGet(`${getQuizzesURL}${param._id}`, userData.token)
      setQuizData(data)
      //setQuizNumber(data.length)
      setRefresh(false)
      //console.log(data.length)
      setLoading(false)
    }

    if (refresh) {
      fetchData()
    }
  }, [refresh])

  // Alert user if leaving screen
  useEffect(() => {
    if (userData.role === "admin") {
      return
    } else if (userData.role === "user") {
      const leaving = navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
        Alert.alert(
          'Leave assessment?',
          'Do you want to leave the asssessment? Your progress will be lost.',
          [
            { text: "Stay", style: "cancel", onPress: () => { } },
            {
              text: "Leave",
              onPress: () => navigation.dispatch(e.data.action),
            },
          ]
        );
      });
      return leaving;
    }


  }, [navigation]);

  const renderQuizItem = ({ item, index }) => (
    <QuizItem
      ID={item._id}
      item={item}
      setModalVisible = {()=>setModalVisible(true)}
      //setScore={setScore}
      setSelectedData= {setSelectedData}
      setRefresh={()=>setRefresh(true)}
      setQuestionNumber={setQuestionNumber}
      setErrorMessage={setErrorMessage}
      score={score}
      setSingleScore={setSingleScore}
      singleScore={singleScore}
      itemNumber={index + 1}
    />
  );

  const handleSubmit = async () => {
    if (questionNumber === quizData.length) {
      try {
        const data = await axiosPut(editScoreURL + userData._id, quizForm, contentType, userData.token);
        console.log(data);
      } catch (error) {
        console.error("Error in handleSubmit:", error);
      }
      setSubmitModalVisible(true);
    } else {
      setErrorMessage("Answer all questions!");
    }
    console.log("total", questionNumber);
  };
  //console.log(quizForm)
  // console.log("number of answered question is",answeredQuestion)
  //console.log(quizData)
  //console.log(param._id)
  console.log(selectedData)
 
  //console.log("this is selected number",selectedNumber)
  return (
    <View style={styles.mainContainer}>
      {selectedData ? (<QuizModal 
        setRefresh={() => setRefresh(true)} 
        visibility={modalVisible} 
        postID={param._id}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        setModalVisible={() => setModalVisible(false)}>
        {selectedData == "true" ? "Upload Question" : "Edit Question"}
      </QuizModal>): ""}

      <LearnHeader title={param.title} navigation={navigation} />
      
      <View style={styles.quizContainer}>
        <View style={styles.flatlist}>
          {isloading ? (
            <ActivityIndicator
              animating={true}
              style={{ top: 20 }}
              size={60}
            />
          ) : quizData.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={quizData}
              renderItem={renderQuizItem}
              keyExtractor={item => item._id}
              ListHeaderComponent={() => (
                <View>
                  {quizData.length > 0 && (
                    <Text style={styles.quizDescription}>Choose the correct answer.</Text>
                  )}
                </View>
              )}
              ListFooterComponent={
                quizData.length > 0 && (
                 <View>
                   {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
                  <Pressable style={styles.submitButton} onPress={() => {
                    handleSubmit();
                  }}>
                    <Text style={styles.submitText}>Submit</Text>
                  </Pressable>
                 </View>
                )
              }/>
          ) : (
            <Text style={{ alignSelf: "center", fontFamily: 'PTSans-Bold' }}> No questions found</Text>)}
        </View>
      </View>

      {userData.role === 'admin' && (
        <Pressable style={styles.addButton} onPress={() => {setModalVisible(true), setSelectedData("true")}}>
          <Text style={styles.buttonText} >
            +
          </Text>
        </Pressable>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={submitModalVisible}
      >
        <View>
          <View style={styles.modalInnerContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.modalText}>Assessment Finished!</Text>
            </View>

            <View style={styles.scoreContainer}>
              <Text style={[styles.scoreText, { fontSize: 35 }]}>{score}/{quizData.length}</Text>
              <Text style={[styles.scoreText, { fontSize: 20 }]}>{quizForm.quizScores.passed ? "Good Job!" : "Better luck next time."}</Text>
            </View>

            <Pressable style={[styles.submitButton, { width: '90%', marginBottom: 15, }]} onPress={navigation.goBack}>
              <Text style={styles.submitText}>Back to lessons</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  quizContainer: {
    backgroundColor: Colors.bgOffWhite,
    flex: 1,
  },
  quizDescription: {
    marginVertical: 5,
    marginLeft: 20,
    fontSize: 18,
    fontFamily: 'PTSans-Bold'
  },
  submitButton: {
    backgroundColor: Colors.bgPurple,
    borderRadius: 10,
    width: '40%',
    alignSelf: 'center',
    marginBottom: 20,
    padding: 15,
  },
  submitText: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'PTSans-Bold'
  },
  flatlist: {
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
    backgroundColor: Colors.bgDarkGray,
  },
  buttonText: {
    color: Colors.bgYellow,
    fontSize: 25
  },

  modalInnerContainer:{
    gap: 10,
    backgroundColor: 'white',
    margin: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  modalText: {
    fontSize: 20,
    fontFamily: 'PTSans-Bold',
    flex: 5,
    marginTop: 10,
    textAlign: 'center',
  },
  scoreContainer: {
    backgroundColor: Colors.bgOffWhite,
    height: '40%',
    width: '90%',
    borderRadius: 10,
    justifyContent: 'center',
    gap: 15,
  },
  scoreText: {
    fontFamily: 'PTSans-Bold',
    color: Colors.bgViolet,
    textAlign: 'center',
  },
  reviewButton:{
    backgroundColor: Colors.bgLightGray,
    borderRadius:10,
    width: '90%',
    alignItems: 'center',
    height: '10%',
    justifyContent: 'center'
  },
  reviewText: {
    fontFamily: 'PTSans-Bold',
    fontSize: 16,
    textDecorationLine: 'underline'
  },
  errorMessage:{
    textAlign:"center",
    fontFamily:'PTSans-Bold',
    marginBottom:5,
    color: Colors.bgError
  }
})