import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, StyleSheet, Dimensions,Image} from "react-native";
import ProgressBar from 'react-native-progress/Bar';
import Header from "../components/Header";

const dimensions = Dimensions.get('window');   
const maxWidth = dimensions.width;
const maxHeight = dimensions.height;

export default function Settings () {
  return (
      <View style={styles.container}>
        <Header/>
        <View style={styles.avatarcontainer}>
    
            <LinearGradient colors={['#ffc42c', '#9300FF']} style={styles.gradientborder}>
              <Image source={require('../assets/avatar.jpg')} style={styles.avatar}></Image>
            </LinearGradient>
    
        </View>
  
        <View style={styles.bottomsheet}>
          <View style={styles.progresscontainer}>
            <Text style={styles.text}>Progress: 69%</Text>
            <View style={styles.progressbar}>
              <ProgressBar 
              animated={true}
              progress={.69} 
              width={270} 
              height={15}
              borderRadius={10}
              unfilledColor={'white'}
              borderWidth={0}
              color={'#9300FF'}
              />
              </View>
          </View>
  
          <View style={styles.courses}>
            <View><Text>Finish course to unlock</Text></View>
          </View>
        </View>
      </View>    
  );
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white'
    },
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
    avatarcontainer: { 
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 150,
      backgroundColor: 'black',
      height: maxHeight * .20,
      width: maxWidth * .41,
      position: 'absolute',
      alignSelf: 'center',
      top: 5,
      zIndex: 1,
    },
    avatar: {
      height: (maxHeight * .20) - 20,
      width: (maxWidth * .40) -20,
      borderRadius: 150,
    },
    gradientborder: {
      height: (maxHeight * .20) - 10,
      width: (maxWidth * .40) - 10,
      borderRadius: 150,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomsheet: {
      height: maxHeight * 1,
      width: maxWidth * 1,
      padding: 20,
      gap: 20,
      backgroundColor: 'white',
      top: 70,
    },
    progresscontainer: {
      backgroundColor: '#ffc42c',
      padding: 20,
      borderRadius: 10,
      gap: 5,
    },
    progressbar: {
      flexDirection: 'row',
      gap: 10,
    },
    text: {
      fontWeight: 'bold',
      fontSize: 20
    },
    progresstext: {
      fontSize: 15,
      fontWeight: 'bold'
    },
    courses: {
      padding: 20,
      backgroundColor: '#ffc42c',
      borderRadius: 10,
    },
  })