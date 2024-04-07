import { View, Text, StyleSheet} from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import Header from "../components/Header";
import Colors from "../constants/Colors";
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function HomePage() {
  //const authContext = useContext(AuthContext)

  //console.log(authContext)
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.bottomsheet}>
        <View style={styles.progresscontainer}>
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

          <View style={styles.progresstextcontainer}>
            <Text style={styles.greetingtext}>Hi User!</Text>
            <Text style={styles.progresstext}>You have finished 68% of the course. Good Job!</Text>
          </View>
        </View>

        <View style={styles.shortcutcontainer}>
          <View style={styles.shortcuts}>
            <FontAwesome5 style={styles.icons} name="book" size={60} color={Colors.bgViolet} />
            <View style={styles.shortcuttextcontainer}>
              <Text style={styles.shortcuttext}>Finished{'\n'}Lessons</Text>
              <FontAwesome5 style={{top: 10}}  name="chevron-right" size={15} color={Colors.bgViolet} />
            </View>
          </View>

          <View style={styles.shortcuts}>
            <FontAwesome5 style={styles.icons} name="file-signature" size={60} color={Colors.bgViolet}  />
            <View style={styles.shortcuttextcontainer}>
              <Text style={styles.shortcuttext}>Completed{'\n'}Assessments</Text>
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
  bottomsheet: {
    flex: 1,
    padding: 20,
    gap: 20,
    backgroundColor: Colors.bgOffWhite,
  },
  progresscontainer: {
    backgroundColor: Colors.bgYellow,
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 20,
  },
  progresstextcontainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  greetingtext: {
    flexWrap: 'wrap',
    fontSize: 20,
    fontWeight: 'bold',
  },
  progresstext: {
    flexWrap: 'wrap',
    fontSize: 16
  },
  shortcutcontainer: {
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
  shortcuttextcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})