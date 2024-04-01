import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import Header from "../components/Header";
import Colors from "../constants/Colors";



const dimensions = Dimensions.get('window')
const deviceWidth = dimensions.width
const deviceHeight = dimensions.height

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
            activeStrokeSecondaryColor={'#B63FE9'}
            activeStrokeColor={'#4E1D63'}
            inActiveStrokeOpacity={0.2}
            valueSuffix={'%'}
          // onAnimationComplete={()=>}
          >
          </CircularProgress>

          <View style={styles.progresstext}>
            <Text style={styles.text1}>Hi User!</Text>
            <Text style={styles.text2}>You have finished 69% of the course. Good Job!</Text>
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
    backgroundColor: 'white',
  },
  progresscontainer: {
    backgroundColor: Colors.bgYellow,
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 20,
  },
  progresstext: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  text1: {
    flexWrap: 'wrap',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text2: {
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