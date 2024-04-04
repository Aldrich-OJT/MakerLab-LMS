import { View, Text, StyleSheet} from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import Header from "../components/Header";
import Colors from "../constants/Colors";

export default function HomePage() {
  //const authContext = useContext(AuthContext)

  //console.log(authContext)
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.bottomsheet}>
        <View style={styles.progresscontainer}>
          <CircularProgress
            value={69}
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
            <Text style={styles.progresstext}>You have finished 69% of the course. Good Job!</Text>
          </View>
        </View>

        <View style={styles.coursecontainer}>
          <View style={styles.courses}><Text>option 1</Text></View>
          <View style={styles.courses}><Text>option 2</Text></View>
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
    padding: 25,
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
  coursecontainer: {
    flexDirection: 'row',
    borderRadius: 10,
    gap: 20,
  },
  courses: {
    flex: 1,
    backgroundColor: Colors.bgYellow,
    padding: 20,
    borderRadius: 10,

  },
})