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
import Colors from "../../constants/Colors";
import Templearncards from "../../components/LearnComponent/templearncards";
import { axiosGet } from "../../utils/axios";
import { AuthContext } from "../../context/AuthProvider";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import ModalContent from "../../components/LearnComponent/ModalContent";
import { FontAwesome5 } from '@expo/vector-icons';

const dimensions = Dimensions.get("window");
const deviceWidth = dimensions.width;
const deviceHeight = dimensions.height;

const getVideosURL = "/api/post/videos";

export default function Templearn() {
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
    <View style={styles.maincontainer}>
      <ModalContent setRefresh= {()=> setRefresh(true)} visibility={modalVisible} onPress={() => setModalVisible(false)} >Upload Document</ModalContent>

    <View style={styles.headercontainer}>
        <View>
            <Pressable style={styles.backbutton}>
            <FontAwesome5
                style={{marginLeft: -2}}
                name="chevron-left" 
                size={20} 
                color={Colors.bgYellow} />
            </Pressable>
        </View>
        <View style={styles.titlecontainer}>
            <Text style={styles.title} numberOfLines={1}><FontAwesome5 name="book" size={24} color={Colors.bgYellow} />  Maker Lab</Text>
        </View>
    </View>

    <View style={styles.bottomsheet}>
    
    <View style={styles.FlatListContainer}>
            {contentLoading ? (<Text>Loading...</Text>)
              : (nocontent ? (<Text>No contents found</Text>) : (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  style={styles.videoFlatList}
                  keyExtractor={(item) => item._id}
                  data={videoData}
                  renderItem={({ item, index }) => (
                    <Templearncards
                      title={item.title}
                      description={item.description}
                      onPress={() => showSingleItem(item)}
                      lessoncount={index +1}
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
        height: deviceHeight * 1,
    },
    headercontainer: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        height: deviceWidth * .20,
        flexDirection: 'row',
        marginTop: deviceWidth * .10,
    },
    backbutton:{
        backgroundColor: '#292929',
        height: deviceWidth * .13,
        width: deviceWidth * .13,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: Colors.bgYellow,
        padding: 10,
        fontSize: 24,
        paddingHorizontal: 30,
        fontWeight: 'bold'
    },
    titlecontainer: {
        width: deviceWidth * .8,
        maxHeight: deviceWidth * .13,
        borderRadius: 50,
        backgroundColor: Colors.bgGray,
    },
    bottomsheet: {
        backgroundColor: Colors.bgOffWhite,
        borderRadius: 20,
        height: deviceHeight - (deviceWidth * .20),
        paddingHorizontal: 20,
    },
    addButton: {
      position: "absolute",
      right: 10,
      bottom: 70,
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
