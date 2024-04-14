import { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Searchbar, TextInput } from "react-native-paper";
import Colors from "../../constants/Colors";
import Templearncards from "../../components/LearnComponent/templearncards";
import { axiosGet } from "../../utils/axios";
import { AuthContext } from "../../context/AuthProvider";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import ModalContent from "../../components/LearnComponent/ModalContent";
import { FontAwesome5 } from '@expo/vector-icons';
import { ActivityIndicator} from 'react-native-paper';

const getPostURL = "/api/post/category/";

export default function Templearn({ route, navigation }) {
  //const tabBarHeight = useBottomTabBarHeight()
  //const { navigate } = useNavigation()
  const [modalVisible, setModalVisible] = useState(false);
  const { param } = route.params;

  const {userData} = useContext(AuthContext);
  const [videoData, setVideoData] = useState(null);
  const [contentLoading, setContentLoading] = useState(false)
  const [nocontent, setNoContent] = useState(false)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      //console.log(param);
      try {
        setContentLoading(true);

        const data = await axiosGet(`${getPostURL}${param._id}`, userData.token);
        //console.log("i am trying to get something")
        setVideoData(data);

        if (data) {
          setNoContent(false)
        }
        // else {
        //   setNoContent(true)
        // }
        //console.log(videoData)
      } catch (error) {
        setNoContent(true)
        // Handle the error here, you can log it or show an error message to the user
        // console.log(error.message)
        // if (error.status === 404) {
        //   setNoContent(true)
        // }

      } finally {
        setRefresh(false)
        setContentLoading(false);
      }
    };
    fetchData()
  }, [refresh])

  //refresh the page when focus goes back on this tab
  useFocusEffect(
    useCallback(() => {
      setRefresh(true)
    }, [])
  );

  const showLearnDetail = (item) => {
    //console.log(item)
    navigation.navigate("LearnDetails", { item })
  };
  const showQuestion = (item) => {
    //console.log(item)
    navigation.navigate("Questions", { item })
  };

  //console.log(nocontent)
  //console.log(refresh)
  return (
    <View style={styles.maincontainer}>
      <ModalContent 
      id={param._id}
      setRefresh={() => setRefresh(true)} 
      visibility={modalVisible} 
      onPress={() => setModalVisible(false)} >Upload Lesson</ModalContent>

      <View style={styles.headercontainer}>
        <View>
          <Pressable style={styles.backButtonContainer} onPress={() => (navigation.goBack())} >
            <FontAwesome5
              //style={styles.backbutton}
              name="chevron-left"
              size={20}
              color={Colors.bgYellow}
            />

          </Pressable>
        </View>
        <View style={styles.titlecontainer}>
          <Text style={styles.title} numberOfLines={1}><FontAwesome5 name="book" size={24} color={Colors.bgYellow} /> {param.title}</Text>
        </View>
      </View>

      <View style={styles.bottomsheet}>

        <View style={styles.FlatListContainer}>
          {contentLoading ? (
          <ActivityIndicator 
          animating={true} 
          style={{top:20}}
          size={60}
          />)
            : (nocontent ? (<Text style={{fontFamily: 'PTSans-Bold'}}>No contents found</Text>) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item._id}
                data={videoData}
                renderItem={({ item, index }) => (
                  <Templearncards
                    title={item.title}
                    description={item.description}
                    pressLearn={() => showLearnDetail(item)}
                    pressQuiz={() => showQuestion(item)}
                    lessoncount={index + 1}
                  />
                )}
              />
            )
            )}
        </View>

        <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText} >
            +
          </Text>
        </Pressable>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  headercontainer: {
    justifyContent: 'space-evenly',
    alignItems: "center",
    width: "100%",
    height: "10%",
    flexDirection: 'row',
    marginTop: "10%",
  },
  backButtonContainer: {
    backgroundColor: '#292929',
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    overflow: "hidden"
  },
  backbutton: {

    height: "100%",
    width: "100%",
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    color: Colors.bgYellow,
    padding: 10,
    fontSize: 20,
    paddingHorizontal: 30,
    fontWeight: 'bold'
  },
  titlecontainer: {
    width: "80%",
    maxHeight: "fit-content",
    borderRadius: 50,
    backgroundColor: Colors.bgGray,
    justifyContent: "center"
  },
  bottomsheet: {
    backgroundColor: Colors.bgOffWhite,
    //borderRadius: 20,
    flex: 1,
    //paddingHorizontal: 20,
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
  FlatListContainer: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
    borderRadius: 10,
    //overflow:"hidden"

  },
});
