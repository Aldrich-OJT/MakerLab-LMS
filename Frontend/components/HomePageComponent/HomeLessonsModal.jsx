import { View, Text, StyleSheet, Pressable, Modal, ScrollView, Dimensions } from "react-native";
import { List } from 'react-native-paper';
import Colors from "../../constants/Colors";

const dimensions = Dimensions.get('window');
const deviceWidth = dimensions.width;

export default function HomeLessonsModal({ visibility, setModalVisible, data }) {

  // if(data.length < 1){console.log("nothing")}
   //console.log(data)
  const coursekeys = Object.keys(data)
  //console.log(data[coursekeys[0]])
  //console.log(data[coursekeys[0]][0].postName)
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
            <Text style={styles.coursesText}>Remarks</Text>
          </View>
          <ScrollView style={styles.listAccordion} showsVerticalScrollIndicator={false}>
            {data ? coursekeys.map((course, index) => (
              <List.Accordion key={index}
                title={course}
                titleStyle={styles.accordionheader}
                titleNumberOfLines={1}
                style={styles.purpleTint}
              >
                {data[coursekeys[index]].map((lesson, lessonIndex) => (
                  <List.Item
                    key={lessonIndex}
                    title={lesson.score}
                    //style={styles.listItemStyle}
                    titleNumberOfLines={1}
                    titleStyle={styles.coursesText}
                    right={() => <List.Item title={lesson.passed ? "passed" : "failed"} style={{ width: 100, padding: 10, }} titleStyle={[styles.coursesText, { color: !lesson.passed ? Colors.bgError : Colors.bgPurple }]} />}
                    left={() => <List.Item title={lesson.postName} style={{ width: 100, padding: 10 }} titleStyle={styles.coursesText} />}
                  />
                ))}

              </List.Accordion>
            )): "Answer Quizzes to get scores"}
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
      backgroundColor: Colors.bgPurpleTint
    },
})