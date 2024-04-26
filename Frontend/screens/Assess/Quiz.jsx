import { View, StyleSheet, Text, Pressable, Alert } from "react-native";
import Colors from "../../constants/Colors";
import QuizItem from "../../components/QuizItem";
import LearnHeader from "../../components/LearnComponent/LearnHeader";
import QuizModal from "../../components/QuizModal";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import {  axiosGet, axiosPut } from "../../utils/axios";
import { AuthContext} from "../../context/AuthProvider";
import { ActivityIndicator, Modal, useTheme } from "react-native-paper";


const getQuizzesURL = "/api/question/"
const editScoreURL = "/api/user/data/update/"
const getposttotalcountURL = "/api/post/count"
const contentType = "application/json"


export default function Quiz({route, navigation}) {
  const { userData } = useContext(AuthContext)
  //console.log(userData)
  const [score, setScore] = useState(0)
  const [isloading, setLoading] = useState(false)
  const [errorMessage,setErrorMessage ] = useState("")
  const [numberQuestionsAnswered, setnumberQuestionsAnswered] = useState([])
  const param = route.params.item
  const [modalVisible, setModalVisible] = useState(false);
  const [submitModalVisible, setSubmitModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [singleScore, setSingleScore] = useState([])
  const [quizData, setQuizData] = useState([])
  const [totalQuizzes, setTotalQuizzes] = useState(0)
  const finishedAnswering = useRef(false)
  const theme = useTheme()
  //const [selectedNumber, setSelectedNumber] = useState(0)

  //console.log(param)
  const [selectedData, setSelectedData] =  useState()
  const [quizForm, setQuizForm] = useState({
    quizScores: {
      categoryId: param.category,
      postId: param._id,
      postName: param.title,
      score: score,
      passed: false
    },
    progress: 0
  })

  
  const setscoreinitialvalue = (data)=>{
    let newArray = data.map(() => 0);
    setnumberQuestionsAnswered(newArray);
    setSingleScore(newArray); 
  }

  useEffect(() => {
    //console.log(param)

    const fetchData = async () => {
      setLoading(true)
      //console.log("fetch rerendered")
      const data = await axiosGet(`${getQuizzesURL}${param._id}`, userData.token)
      const totalcount = await axiosGet(getposttotalcountURL, userData.token)

      setTotalQuizzes(totalcount)
      
      setscoreinitialvalue(data)
      //setSingleScore(Array.from({ length: data.length }, () => 0));
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
    } else if (userData.role === "user" && finishedAnswering.current === false) {
      const leaving = navigation.addListener('beforeRemove', (e) => {
        if (finishedAnswering.current === false) {
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
        }
      });
      return leaving;
    } else{
      return
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
      numberQuestionsAnswered={numberQuestionsAnswered}
      setnumberQuestionsAnswered={setnumberQuestionsAnswered}
      setErrorMessage={setErrorMessage}
      score={score}
      setSingleScore={setSingleScore}
      singleScore={singleScore}
      itemNumber={index}
      //selectedNumber={selectedNumber}
      //setSelectedNumber={setSelectedNumber}
      // selected={selected}
      // setSelected={setSelected}
    />
  );
  const getTotalScore = (array)=>{
    let totalScore = 0

    for (let index = 0; index < singleScore.length; index++) {
      totalScore += array[index];
      
    }
    setScore(totalScore)
  }


  const getProgress = (score, quizData, totalQuizzes) => {
    const thresholdScore = Math.round(quizData.length * 0.6);
    //console.log("safaklsljkjbfad",score,thresholdScore,totalQuizzes)
    if (score >= thresholdScore && totalQuizzes != 0) {
      return 1/totalQuizzes;
    }else{
      return 0
    }
  };

  useEffect(()=>{
    getTotalScore(singleScore)
  },[singleScore])
  useEffect(()=>{

    const passed = score > Math.round(quizData.length * .6) ? true : false
    setQuizForm(prevstate => ({
      ...prevstate,
      quizScores: {
        ...prevstate.quizScores,
        score: score,
        passed: passed,
        completedAt: new Date().toJSON()
      },
      progress: getProgress(score, quizData, totalQuizzes)
    }))
  },[score])

  const handleSubmit = useCallback(async () => {

   
      try {
        const data = await axiosPut(`${editScoreURL}${userData._id}`, quizForm, contentType, userData.token);
        console.log("updatedData",data);
      } catch (error) {
        console.error("Error in handleSubmit:", error);
      }
      setSubmitModalVisible(true);
    // } else {
    //   setErrorMessage("Answer all questions!");
    // }

    finishedAnswering.current = true

  },[quizForm])

  return (
    <View style={[styles.mainContainer, {backgroundColor: theme.colors.grayOffwhite}]}>
      {selectedData ? (<QuizModal 
        setRefresh={() => setRefresh(true)} 
        visibility={modalVisible} 
        postID={param._id}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        setModalVisible={() => setModalVisible(false)}>
        {selectedData == "upload" ? "Upload Question" : "Edit Question"}
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
          ) : quizData.length > 0 && singleScore ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={quizData}
              renderItem={renderQuizItem}
              keyExtractor={item => item._id}
              ListHeaderComponent={() => (
                <View>
                  {quizData.length > 0 && (
                    <Text style={[styles.quizDescription, {color: theme.colors.fontcolorOffwhiteBlack}]}>
                      Choose the correct answer.
                    </Text>
                  )}
                </View>
              )}
              ListFooterComponent={
                quizData.length > 0 && (
                 <View>
                   {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
                  <Pressable style={[styles.submitButton, {backgroundColor: theme.colors.darkPurpleTint}]} onPress={() => {
                    handleSubmit();
                  }}>
                    <Text style={styles.submitText}>Submit</Text>
                  </Pressable>
                 </View>
                )
              }/>
          ) : (
            <Text style={{ alignSelf: "center", fontFamily: 'PTSans-Bold', color: theme.colors.fontcolorOffwhiteBlack}}> No questions found</Text>)}
        </View>
      </View>

      {userData.role === 'admin' && (
        <Pressable style={styles.addButton} onPress={() => {setModalVisible(true), setSelectedData("upload")}}>
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
              <Text style={[{ fontSize: 20, },styles.scoreText, ]}>{quizForm.quizScores.passed ? "Good Job!" : "Better luck next time."}</Text>
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