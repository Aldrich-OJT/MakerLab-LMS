import { View, Text, StyleSheet, Pressable, Modal, ScrollView, Dimensions} from "react-native";
import { useContext, useState, useEffect} from "react";
import {AuthContext} from "../context/AuthProvider";
import { List, DataTable } from 'react-native-paper';
import ProgressBar from 'react-native-progress/Bar';
import Colors from "../constants/Colors";
import {  axiosGet } from "../utils/axios";

const dimensions = Dimensions.get('window');
const deviceWidth = dimensions.width;

export default function HomePage(navigation) {
  const { authContext, userData } = useContext(AuthContext);
  const [ gradeModalVisible, setGradeModalVisible] = useState(false)
  const [ userListModalVisible, setUserListModalVisible] = useState(false)
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(true)
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      console.log("effect")
        const data = await axiosGet('/api/user')
        console.log(data) 
        setUsers(data)
        setRefresh(false)
    }

    if (refresh) {
        fetchData()
    }
}, [refresh])


  const courseData = [
    {
      title: 'Makerlab',
      lessons: [
        { title: 'Lesson 1 title', score: '10' },
        { title: 'Lesson 2 title', score: '6' },
        { title: 'Lesson 3 title', score: '3' },
      ],
    },
    {
      title: 'World of Coding',
      lessons: [
        { title: 'Lesson 1', score: '4' },
        { title: 'Lesson 2', score: '15' },
        { title: 'Lesson 3', score: '34' },
      ],
    },
    {
      title: 'Physical Computing',
      lessons: [
        { title: 'Lesson 1', score: '10' },
        { title: 'Lesson 2', score: '20' },
        { title: 'Lesson 3', score: '15' },
      ],
    },
  ];


  const itemsPerPage = 5;
  const numberOfPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = page * itemsPerPage;
  const endIndex = Math.min((page + 1) * itemsPerPage, users.length);
  const visibleItems = users.slice(startIndex, endIndex);

  return (
    <View style={styles.container}>

      
      <Modal      
        animationType="fade"
        transparent={true}
        visible={gradeModalVisible}
        onRequestClose={() => setGradeModalVisible(false)}>

        <View style={styles.modalMainContainer}>
          <View style={styles.modalContentContainer}>
            <View style={styles.titleContainer}>
              <Text style={[styles.modalText, {color: Colors.bgDarkGray, fontSize:18}]}>Finished Lessons</Text>
            </View>

            <View style={styles.listHeader}>
              <Text style={styles.modalText}>Lessons</Text>
              <Text style={styles.modalText}>Scores</Text>
            </View>
            <ScrollView style={styles.listAccordion} showsVerticalScrollIndicator={false}>
              {courseData.map((course, index) => (
                <List.Accordion key={index} 
                  title={course.title} 
                  titleStyle={styles.modalText}
                  titleNumberOfLines={1}
                  style={styles.purpleTint}
                >
                  {course.lessons.map((lesson, lessonIndex) => (
                    <List.Item
                      key={lessonIndex}
                      title={lesson.title}
                      style={styles.listItemStyle}
                      titleNumberOfLines={1}
                      titleStyle={{fontFamily:'PTSans-Regular',}}
                      right={() => <List.Item title={lesson.score} titleStyle={styles.modalText} />}
                    />
                  ))}
                </List.Accordion>
              ))}
            </ScrollView>
            <Pressable style={styles.cancelButton} onPress={() => setGradeModalVisible(false)}>
                <Text style={styles.cancelText}>
                  Close
                </Text>
              </Pressable>
          </View>
        </View>
      </Modal>



      <Modal      
        animationType="fade"
        transparent={true}
        visible={userListModalVisible}
        onRequestClose={() => setUserListModalVisible(false)}>

        <View style={styles.modalMainContainer}>
          <View style={[styles.modalContentContainer, {height:'63%'}]}>
            <View style={styles.titleContainer}>
              <Text style={[styles.modalText, {color: Colors.bgDarkGray, fontSize:18}]}>List of Users</Text>
            </View>
            
            <DataTable style={[styles.listAccordion, {height:340}]}>
              <DataTable.Header style={styles.purpleTint}>
                <DataTable.Title style={{flex:.5}}><Text style={styles.modalText}>ID</Text></DataTable.Title>
                <DataTable.Title style={{flex:2}}><Text style={styles.modalText}>Name</Text></DataTable.Title>
                <DataTable.Title style={{flex:2}}><Text style={styles.modalText}>Email</Text></DataTable.Title>
              </DataTable.Header>

              {visibleItems.map((user, index) => (
                <DataTable.Row style={styles.tableRows} key={index}>
                  <DataTable.Cell style={{ flex: 0.5 }}><Text style={{fontFamily:'PTSans-Regular'}}>{startIndex + (index+1)}</Text></DataTable.Cell>
                  <DataTable.Cell style={{ flex: 2 }}><Text style={{fontFamily:'PTSans-Regular'}}>{user.name}</Text></DataTable.Cell>
                  <DataTable.Cell style={{ flex: 2 }}><Text style={{fontFamily:'PTSans-Regular'}}>{user.email}</Text></DataTable.Cell>
                </DataTable.Row>
              ))}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={numberOfPages}
                    onPageChange={(newPage) => setPage(newPage)}
                    showFastPaginationControls
                    label = {`${page+1} of ${numberOfPages}`}
                />
            </DataTable>

            <Pressable style={styles.cancelButton} onPress={() => setUserListModalVisible(false)}>
                <Text style={styles.cancelText}>
                  Close
                </Text>
              </Pressable>
          </View>
        </View>
      </Modal>


      <View style={styles.bottomSheet}>
        <View style={styles.progressContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontFamily: 'icon', fontSize:100, color:Colors.bgGray}}></Text>

            <View style={styles.progressTextContainer}>
              <Text style={styles.greetingText}>Hi {userData.name},</Text>
              <Text style={styles.progressText}>
                {userData.role === 'user' ? "You have finished 68% of the course. Good Job!" : "Welcome back!"}
              </Text>
              </View>
          </View>
          {userData.role === 'user' && (
          <ProgressBar 
            animated={true}
            progress={.68} 
            width={300} 
            height={10}
            borderRadius={10}
            unfilledColor={Colors.bgLightGray}
            borderWidth={0}
            color={Colors.bgPurple}
          />
          )}
        </View>

        <View style={styles.shortcutContainer}>

          {userData.role === 'admin' && (
             <Pressable style={styles.shortcuts} onPress={() => setUserListModalVisible(true)}> 
              {/* onPress={() => navigation.navigate('ListofUsers')}> */}
              <Text style={{fontFamily: 'icon', fontSize:70, color:Colors.bgGray}}></Text>

              <View style={styles.shortcutTextContainer}>
                <Text style={styles.shortcutText}>List of Users</Text>
                <Text style={{fontFamily: 'icon', fontSize:30, color:Colors.bgGray}}></Text>
              </View>
            </Pressable>
            )}

          {userData.role === 'user' && (
            <Pressable style={styles.shortcuts}  onPress={() => setGradeModalVisible(true)}> 
              <Text style={{fontFamily: 'icon', fontSize:70, color:Colors.bgGray}}></Text>

              <View style={styles.shortcutTextContainer}>
                <Text style={styles.shortcutText}>Finished{'\n'}Lessons</Text>
                <Text style={{fontFamily: 'icon', fontSize:30, color:Colors.bgGray}}></Text>
              </View>
            </Pressable>
            )}

          {userData.role === 'admin' && (
            <Pressable style={styles.shortcuts}>
              <Text style={{fontFamily: 'icon', fontSize:70, color:Colors.bgGray}}></Text>

                <Pressable style={styles.shortcutTextContainer}>
                  <Text style={styles.shortcutText}>Placeholder{'\n'}Text</Text>
                  <Text style={{fontFamily: 'icon', fontSize:30, color:Colors.bgGray}}></Text>
                </Pressable>
            </Pressable>
          )}

          {userData.role === 'user' && (
            <Pressable style={styles.shortcuts}>
              <Text style={{fontFamily: 'icon', fontSize:70, color:Colors.bgGray}}></Text>

                <Pressable style={styles.shortcutTextContainer}>
                  <Text style={styles.shortcutText}>Placeholder{'\n'}Text</Text>
                  <Text style={{fontFamily: 'icon', fontSize:30, color:Colors.bgGray}}></Text>
                </Pressable>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSheet: {
    flex: 1,
    padding: 20,
    gap: 20,
    backgroundColor: Colors.bgOffWhite,
  },
  progressContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'column',
    gap: 20,
    alignItems:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 5,
  },
  progressTextContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  greetingText: {
    flexWrap: 'wrap',
    fontSize: 20,
    fontFamily: 'PTSans-Bold'
  },
  progressText: {
    flexWrap: 'wrap',
    fontSize: 16,
    fontFamily: 'PTSans-Regular'
  },
  shortcutContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    gap: 20,
  },
  shortcuts: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    gap: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 5,
  },
  shortcutTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight:40,
  },
  shortcutText:{     
    fontFamily: 'PTSans-Bold',
  },

  
  modalMainContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
  },
  modalContentContainer: {
    gap: 10,
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    height: '80%',
  },
  titleContainer: {
    flexDirection: 'row',
    padding: 5,
  },
  listAccordion:{
    width:'90%',
    borderRadius:10,
    overflow:'hidden'
  },
  listHeader:{
    flexDirection:'row',
    width:'70%',
    justifyContent:'space-between',
  },
  listItemStyle:{
    borderBottomWidth:1, 
    borderColor: Colors.bgLightGray,
  },
  modalText:{
    color:Colors.bgPurple,
    fontFamily: 'PTSans-Bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center",
    height: deviceWidth * .13,
    width: deviceWidth * .34,
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 10,
    borderColor: Colors.bgPurple,
    borderWidth: 2,
  },
  cancelText: {
    color: Colors.bgPurple,
    fontSize: 16,
    fontFamily: 'PTSans-Bold',
  },
  purpleTint:{
    backgroundColor: 'rgba(238, 227, 255, 0.90)'
  }
})