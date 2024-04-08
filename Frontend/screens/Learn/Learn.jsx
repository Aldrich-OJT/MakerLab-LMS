import { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Pressable,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Searchbar, TextInput } from "react-native-paper";
import Header from "../../components/Header";
import Colors from "../../constants/Colors";
import LearnCards from "../../components/LearnComponent/LearnCards";
import { axiosGet } from "../../utils/axios";
import { AuthContext } from "../../context/AuthProvider";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import ModalContent from "../../components/LearnComponent/ModalContent";

const dimensions = Dimensions.get("window");
const deviceWidth = dimensions.width;
const deviceheight = dimensions.height;


const getVideosURL = "/api/post/videos";

export default function Learn() {
  const tabBarHeight = useBottomTabBarHeight()
  const { navigate } = useNavigation()
  const [modalVisible, setModalVisible] = useState(false);

  const authContext = useContext(AuthContext);
  const [videoData, setVideoData] = useState(null);
  const [contentLoading, setContentLoading] = useState(false)
  const [nocontent, setNoContent] = useState(false)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setContentLoading(true);
        
        const data = await axiosGet(getVideosURL, authContext.token);
        console.log("i am trying to get something")
        setVideoData(data);
        if(data){
          setNoContent(false)
        }
      } catch (error) {
        // Handle the error here, you can log it or show an error message to the user
        console.log(error.status)
        if (error.status === 404) {
          setNoContent(true)
          console.error(nocontent);
        }

      } finally {
        setRefresh(false)
        setContentLoading(false);
      }
    };
    console.log("effect")
    fetchData()
  }, [refresh])
  
  //refresh the page when focus goes back on this tab
  useFocusEffect(
    useCallback(() => {
      setRefresh(true) 
    }, [])
  );

  const showSingleItem = (item) => {
    navigate("LearnDetails", { item })
  };

  //console.log(refresh)
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainContainer}>
      <View style={styles.mainContainer}>

        <ModalContent setRefresh= {()=> setRefresh(true)} visibility={modalVisible} onPress={() => setModalVisible(false)} >Upload Document</ModalContent>

        <Header>
        </Header>
        <View style={[styles.bottomsheet, { marginBottom: tabBarHeight }]}>
          <View >
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Maker Lab</Text>

            </View>
            <View style={styles.titleShadow}></View>
          </View>

          <View style={styles.FlatListContainer}>
            {contentLoading ? (<Text>Loading...</Text>)
              : (nocontent ? (<Text>No contents found</Text>) : (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  style={styles.videoFlatList}
                  keyExtractor={(item) => item._id}
                  data={videoData}
                  renderItem={({ item }) => (
                    <LearnCards
                      title={item.title}
                      description={item.description}
                      onPress={() => showSingleItem(item)}
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
    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.bgDarkViolet,
  },

  bottomsheet: {
    flex: 1,
    backgroundColor: Colors.bgOffWhite,
    paddingHorizontal: 10,
  },
  titleContainer: {
    position: "relative",
    backgroundColor: Colors.bgYellow,
    borderRadius: 50,
    justifyContent: "center",
    height: deviceheight * 0.07,
    width: deviceWidth * 0.5,
    marginVertical: 15,
    zIndex: 2,
    alignSelf: "center"
  },
  titleTextContainer: {
    borderRadius: 50,
    backgroundColor: Colors.bgYellow,
    height: deviceheight * 0.07,
    width: deviceWidth * 0.5,
  },
  titleText: {
    fontSize: 17,
    textAlign: "center",
    color: Colors.bgViolet,
    fontWeight: 'bold'
  },
   titleShadow: {
     position: "absolute",
     backgroundColor: "#494949",
     borderRadius: 100,
     height: deviceheight * 0.07,
     width: deviceWidth * 0.5,
     bottom: 10,
     zIndex: 1,
     alignSelf: "center"
   },

  FlatListContainer: {
    flex: 1,
    alignItems: "center",
    borderRadius: 10,
    //overflow:"hidden"

  },
  videoFlatList: {

    //flex:1
    //overflow: "scroll",
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
  }
});
