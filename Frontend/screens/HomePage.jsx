import { View, Text, StyleSheet} from "react-native";
import { useContext } from "react";
import {AuthContext} from "../context/AuthProvider"
import ProgressBar from 'react-native-progress/Bar';
import Colors from "../constants/Colors";

export default function HomePage() {
  const authContext = useContext(AuthContext)

  //console.log(authContext)
  return (
    <View style={styles.container}>
      <View style={styles.bottomSheet}>
        <View style={styles.progressContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontFamily: 'icon', fontSize:100, color:Colors.bgGray}}></Text>

            <View style={styles.progressTextContainer}>
              <Text style={styles.greetingText}>Hi User!</Text>
              <Text style={styles.progressText}>You have finished 68% of the course. Good Job!</Text>
            </View>
          </View>

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
        </View>

        <View style={styles.shortcutContainer}>
          <View style={styles.shortcuts}>
            <Text style={{fontFamily: 'icon', fontSize:70, color:Colors.bgGray}}></Text>

            <View style={styles.shortcutTextContainer}>
              <Text style={styles.shortcutText}>Finished{'\n'}Lessons</Text>
              <Text style={{fontFamily: 'icon', fontSize:30, color:Colors.bgGray}}></Text>
            </View>

          </View>

          <View style={styles.shortcuts}>
            <Text style={{fontFamily: 'icon', fontSize:70, color:Colors.bgGray}}></Text>

              <View style={styles.shortcutTextContainer}>
                <Text style={styles.shortcutText}>Completed{'\n'}Assessments</Text>
                <Text style={{fontFamily: 'icon', fontSize:30, color:Colors.bgGray}}></Text>
              </View>
              
          </View>
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
  },
  shortcutText:{     
    fontFamily: 'PTSans-Bold',
  }
})