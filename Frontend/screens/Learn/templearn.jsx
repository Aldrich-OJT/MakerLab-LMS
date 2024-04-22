import { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  RefreshControl 
} from "react-native";
import Colors from "../../constants/Colors";
import LearnHeader from "../../components/LearnComponent/LearnHeader";
import Templearncards from "../../components/LearnComponent/templearncards";
import { axiosGet } from "../../utils/axios";
import { AuthContext } from "../../context/AuthProvider";
import { useFocusEffect } from '@react-navigation/native';
import ModalContent from "../../components/LearnComponent/ModalContent";
import { ActivityIndicator } from 'react-native-paper';

const getPostURL = "/api/post/category/";

export default function Templearn({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { param } = route.params;
  const { userData } = useContext(AuthContext);
  const [postData, setpostData] = useState([]);
  const [contentLoading, setContentLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)


  const fetchData = useCallback(async () => {
    try {
      setContentLoading(true);
      const data = await axiosGet(`${getPostURL}${param._id}`, userData.token);
      setpostData(data);

    } catch (error) {
      console.log(error)

    } finally {
      setRefresh(false)
      setContentLoading(false);
    }
  },[])

  useEffect(() => {
    fetchData()
  }, [refresh])

  //refresh the page when focus goes back on this tab
  // useFocusEffect(
  //   useCallback(() => {
  //     setRefresh(true)
  //   }, [])
  // );

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
      <LearnHeader title={param.title} navigation={navigation} />

      <View style={styles.bottomsheet}>
        <View style={styles.FlatListContainer}>
          {contentLoading ?
            "" : (
              postData.length == 0 ? (
                <Text style={{ fontFamily: 'PTSans-Bold', textAlign: "center" }}>
                  No contents found
                </Text>
              ) : (
                <FlatList

                  // refreshControl={ }
                  refreshControl={<RefreshControl
                    refreshing={refresh}
                    onRefresh={fetchData}
                  />}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item._id}
                  data={postData}
                  renderItem={({ item, index }) => (
                    <Templearncards
                      title={item.title}
                      description={item.description}
                      pressLearn={() => showLearnDetail(item)}
                      pressQuiz={() => showQuestion(item)}
                      index={index}
                      length={postData.length}
                    />
                  )}
                />
              )
            )}
        </View>

        {userData.role === 'admin' && (
          <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText} >
              +
            </Text>
          </Pressable>
        )}
      </View>
      <ModalContent
        id={param._id}
        setRefresh={() => setRefresh(true)}
        visibility={modalVisible}
        onPress={() => setModalVisible(false)}>
        Upload Lesson
      </ModalContent>

    </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  bottomsheet: {
    backgroundColor: Colors.bgOffWhite,
    flex: 1,
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
  FlatListContainer: {
    flex: 1,
    //alignItems: "center",
    borderRadius: 10,
    //overflow:"hidden"

  },
});
