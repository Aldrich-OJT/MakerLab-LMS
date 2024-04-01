import { useState, useEffect, useContext } from "react";
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
import Header from "../components/Header";
import Colors from "../constants/Colors";
import LearnCards from "../components/LearnComponent/LearnCards";
import { axiosGet } from ".././utils/axios";
import { AuthContext } from "../context/AuthProvider";
import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import ModalContent from "../components/LearnComponent/ModalContent";

const dimensions = Dimensions.get("window");
const deviceWidth = dimensions.width;
const deviceheight = dimensions.height;


const getVideosURL = "/api/video/videos";

export default function Learn() {
  const tabBarHeight = useBottomTabBarHeight()
  const { navigate } = useNavigation()
  const [modalVisible, setModalVisible] = useState(false);

  const authContext = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [contentLoading, setContentLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      //console.log(authContext.token)
      setContentLoading(true)
      const data = await axiosGet(getVideosURL, authContext.token)
      setVideoData(data.videos)
      setContentLoading(false)
    }
    fetchData()
  }, [])

  const addVideo = () => { }

  const showSingleItem = (item) => {
    navigate("LearnDetails", { item })
  };


  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainContainer}>
      <View style={styles.mainContainer}>

        <ModalContent style={{backgroundColor:"green"}} visibility={modalVisible} onPress={() => setModalVisible(false)} />

        <Header>
          <Searchbar
            style={styles.searchbar}
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </Header>
        <View style={[styles.bottomsheet, { marginBottom: tabBarHeight }]}>
          <View >
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Maker Lab</Text>

            </View>
            <View style={styles.titleShadow}></View>
          </View>

          <View style={styles.FlatListContainer}>
            {contentLoading ?
              <Text>Loading...</Text> :
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
              />}
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
    backgroundColor: Colors.bgOffWhite,
  },

  searchbar: {
    position: "absolute",
    width: deviceWidth * 0.6,
    top: 25,
    left: 20,
  },
  bottomsheet: {
    flex: 1,
    backgroundColor: Colors.bgOffWhite,

  },
  titleContainer: {
    position: "relative",
    backgroundColor: Colors.bgYellow,
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 2,
    justifyContent: "center",
    height: deviceheight * 0.07,
    width: deviceWidth * 0.5,
    marginVertical: 15,
    zIndex: 2,
    alignSelf: "center"
  },
  titleTextContainer: {
    borderRadius: 50,
    borderColor: "black",
    backgroundColor: Colors.bgYellow,
    height: deviceheight * 0.07,
    width: deviceWidth * 0.5,
  },
  titleText: {
    fontSize: 17,
    textAlign: "center",
  },
  titleShadow: {
    position: "absolute",
    backgroundColor: "black",
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
