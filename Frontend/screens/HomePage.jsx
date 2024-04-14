import { View, Text, StyleSheet} from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import Colors from "../constants/Colors";
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useContext } from "react";
import {AuthContext} from "../context/AuthProvider"

export default function HomePage() {
  const authContext = useContext(AuthContext)

  //console.log(authContext)
  return (
    <View style={styles.container}>
      <View style={styles.bottomSheet}>
        <View style={styles.progressContainer}>
          <CircularProgress
            value={68}
            progressValueFontSize={30}
            activeStrokeWidth={20}
            inActiveStrokeWidth={20}
            progressValueColor={'black'}
            maxValue={100}
            activeStrokeSecondaryColor={Colors.bgDarkViolet}
            activeStrokeColor={Colors.bgViolet}
            inActiveStrokeOpacity={0.3}
            valueSuffix={'%'}
          // onAnimationComplete={()=>}
          >
          </CircularProgress>

          <View style={styles.progressTextContainer}>
            <Text style={styles.greetingText}>Hi User!</Text>
            <Text style={styles.progressText}>You have finished 68% of the course. Good Job!</Text>
          </View>
        </View>

        <View style={styles.shortcutContainer}>
          <View style={styles.shortcuts}>
            <FontAwesome5 style={styles.icons} name="book" size={60} color={Colors.bgViolet} />
            <View style={styles.shortcutTextContainer}>
              <Text style={styles.shortcutText}>Finished{'\n'}Lessons</Text>
              <FontAwesome5 style={{top: 10}}  name="chevron-right" size={15} color={Colors.bgViolet} />
            </View>
          </View>

          <View style={styles.shortcuts}>
            <FontAwesome5 style={styles.icons} name="file-signature" size={60} color={Colors.bgViolet}  />
            <View style={styles.shortcutTextContainer}>
              <Text style={styles.shortcutText}>Completed{'\n'}Assessments</Text>
              <FontAwesome5 style={{top: 10}} name="chevron-right" size={15} color={Colors.bgViolet} />
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
    backgroundColor: Colors.bgOffWhite,
  },
  bottomSheet: {
    flex: 1,
    padding: 20,
    gap: 20,
    backgroundColor: Colors.bgOffWhite,
  },
  progressContainer: {
    backgroundColor: Colors.bgYellow,
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 20,
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
    backgroundColor: Colors.bgYellow,
    padding: 20,
    borderRadius: 10,
    gap: 5,
  },
  shortcutTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shortcutText:{
    fontFamily: 'PTSans-Bold',
  }
})