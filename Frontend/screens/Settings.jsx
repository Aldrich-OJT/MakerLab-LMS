import React from "react";
import { View, Text, StyleSheet, Dimensions,Image} from "react-native";
import ProgressBar from 'react-native-progress/Bar';

const dimensions = Dimensions.get('window');   
const maxWidth = dimensions.width;
const maxHeight = dimensions.height;

export default function Settings () {
  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../assets/top-home.png')} style={styles.bgimage}></Image>
        <Image source={require('../assets/logo-light.png')} style={styles.logo}></Image>
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