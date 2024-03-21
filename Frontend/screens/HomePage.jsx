import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";

const dimensions = Dimensions.get('window');   
const maxWidth = dimensions.width;
const maxHeight = dimensions.height;

export default function HomePage() {
  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../assets/top-home.png')} style={styles.bgimage}></Image>
        <Image source={require('../assets/logo-light.png')} style={styles.logo}></Image>
      </View>

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
    bgimage: {
      height: maxHeight * .25,
      width: maxWidth * 1,
      position: 'relative'
    },
    logo: {
      position: 'absolute',
      right: 10,
      top: 20,
      height: 30,
      width: 100,
    },
    container: {
      width: maxWidth * 1,
      height: maxHeight * 1,
    },
    bottomsheet: {
      height: maxHeight * 1,
      width: maxWidth * 1,
      padding: 25,
      gap: 20,
      backgroundColor: 'white',
    },
    progresscontainer: {
      backgroundColor: '#ffc42c',
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
      height: maxHeight * .2,
      flexDirection: 'row',
      borderRadius: 10,
      gap: 20,
    },
    courses: {
      width: maxWidth * 1,
      height: maxHeight * .2,
      backgroundColor: '#ffc42c',
      padding: 20,
      borderRadius: 10,
      flex: 1,
    },
})