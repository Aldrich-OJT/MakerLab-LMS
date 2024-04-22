import { View, Text, StyleSheet, Pressable, Modal, ScrollView,Dimensions} from "react-native";
import { List } from 'react-native-paper';
import Colors from "../../constants/Colors";

const dimensions = Dimensions.get('window');
const deviceWidth = dimensions.width;

export default function HomeLessonsModal({ visibility, setModalVisible }) {

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
        { title: 'Lesson 1 title', score: '4' },
        { title: 'Lesson 2 title', score: '15' },
        { title: 'Lesson 3 title', score: '34' },
    ],
    },
    {
    title: 'Physical Computing',
    lessons: [
        { title: 'Lesson 1 title', score: '10' },
        { title: 'Lesson 2 title', score: '20' },
        { title: 'Lesson 3 title', score: '15' },
    ],
    },
  ]

return (
  <Modal      
    animationType="fade"
    transparent={true}
    visible={visibility}
    onRequestClose={() => setModalVisible(false)}
  >
    <View style={styles.modalMainContainer}>
      <View style={styles.modalContentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Finished Lessons</Text>
        </View>
        <View style={styles.listHeader}>
          <Text style={styles.coursesText}>Lessons</Text>
          <Text style={styles.coursesText}>Scores</Text>
        </View>
        <ScrollView style={styles.listAccordion} showsVerticalScrollIndicator={false}>
          {courseData.map((course, index) => (
            <List.Accordion key={index} 
              title={course.title} 
              titleStyle={styles.coursesText}
              titleNumberOfLines={1}
              style={styles.purpleTint}
            >
              {course.lessons.map((lesson, lessonIndex) => (
                <List.Item
                  key={lessonIndex}
                  title={lesson.title}
                  style={styles.listItemStyle}
                  titleNumberOfLines={1}
                  titleStyle={styles.lessonsText}
                  right={() => <List.Item title={lesson.score} titleStyle={styles.coursesText} />}
                />
              ))}
            </List.Accordion>
          ))}
        </ScrollView>
        <Pressable style={styles.cancelButton} onPress={() => setModalVisible(false)}>
          <Text style={styles.cancelText}>
            Close
          </Text>
        </Pressable>
      </View>
    </View>
  </Modal>
);
}

const styles = StyleSheet.create({
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
      maxHeight: '80%',
      minHeight: '80%',
    },
    titleContainer: {
      flexDirection: 'row',
      padding: 5,
    },
    titleText:{
      fontFamily:'PTSans-Bold',
      color: Colors.bgDarkGray,
      fontSize:18
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
    coursesText:{
      color:Colors.bgPurple,
      fontFamily: 'PTSans-Bold',
      fontSize: 16,
    },
    lessonsText:{
      fontFamily: 'PTSans-Regular'
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
    },
})