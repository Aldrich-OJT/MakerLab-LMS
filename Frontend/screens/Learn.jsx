import { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList, Pressable, Modal, KeyboardAvoidingView, Platform } from "react-native";
import { Searchbar, TextInput } from "react-native-paper";
import Header from "../components/Header";
import Colors from "../constants/Colors";
import LearnCards from "../components/LearnComponent/LearnCards";
import { axiosGet } from ".././utils/axios"
import { AuthContext } from "../context/AuthProvider";



const dimensions = Dimensions.get('window');
const maxWidth = dimensions.width;
const maxHeight = dimensions.height;



const getVideosURL = "/api/video/videos"

export default function Learn() {
  const [modalVisible, setModalVisible] = useState(false)

  const authContext = useContext(AuthContext)
  const [searchQuery, setSearchQuery] = useState('');
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      //console.log(authContext.token)
      const data = await axiosGet(getVideosURL, authContext.token)
      setVideoData(data.videos)
    }
    fetchData()
  }, [])

  const addVideo = () => {

  }

  const showSingleItem = (item) => {
    console.log(item)
  }
  const modal = () => {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View>
          <View>
            <TextInput
              label="Title"
              style
              onChangeText
              mode="flat"
            />

            <TextInput
              label="Title"
              style
              onChangeText
              mode="flat"
            />
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>

          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {modal()}
      </Modal>
      <Header>
        <Searchbar
          style={styles.searchbar}
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </Header>
      <View style={styles.bottomsheet}>
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Maker Lab</Text>
          </View>
          <View style={styles.titleShadow}></View>
        </View>

        <FlatList
          style={styles.videoFlatList}
          keyExtractor={item => item._id}
          data={videoData}
          renderItem={({ item }) => <LearnCards title={item.title} description={item.description} onPress={() => showSingleItem(item)} />}
        />

        <Pressable onPress={() => setModalVisible(true)}>
          <Text style={{ fontSize: 20, borderWidth: 2, padding: 10, textAlign: "center", borderRadius: 10 }}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  bgimage: {
    height: maxHeight * .25,
    width: maxWidth * 1,
    position: 'relative'
  },
  logo: {
    position: 'absolute',
    right: 10,
    top: 20,
    height: 30,
    width: 100,
  },
  searchbar: {
    position: 'absolute',
    width: maxWidth * .6,
    top: 25,
    left: 20
  },
  bottomsheet: {
    flex: 1,
    alignItems: 'center',
    padding: 25,
    backgroundColor: Colors.bgOffWhite,
    gap: 20,
  },
  titleContainer: {
    position: 'relative',
    backgroundColor: Colors.bgYellow,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 2,
    justifyContent: "center",
    height: maxHeight * 0.07,
    width: maxWidth * 0.5,
    zIndex: 2
  },
  titleTextContainer: {
    borderRadius: 50,
    borderColor: 'black',
    backgroundColor: Colors.bgYellow,
    height: maxHeight * 0.07,
    width: maxWidth * 0.5,
  },
  titleText: {
    fontSize: 17,
    textAlign: 'center',
  },
  titleShadow: {
    position: "absolute",
    backgroundColor: 'black',
    borderRadius: 100,
    height: maxHeight * 0.07,
    width: maxWidth * 0.5,
    top: 2,
    zIndex: 1
  },

  lesson: {
    backgroundColor: '#ffc42c',
    position: 'absolute',
    width: '100%',
    height: '90%',
  },
  videoFlatList: {
    width: "100%",
    borderRadius: 10
  }

})