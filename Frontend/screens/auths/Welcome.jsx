import React from 'react';
import { Dimensions, Pressable, Image, StyleSheet, Text, View, ImageBackground} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/Colors';

const dimensions = Dimensions.get('window');   
const devicewidth = dimensions.width;
const deviceheight = dimensions.height;

const containerSize = Math.min(deviceheight, devicewidth);
const containerRadius = containerSize / 2;

export default function Welcome() {
  const navigation = useNavigation()

  return ( 
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/background.png')} style={styles.bgimage}>
          
          <View style={styles.topcontainer}>
            <Image source={require('../../assets/logo-dark.png')} style={styles.logo}/>
            <Text style={styles.text}>Let's Get Started!</Text>
          </View>

          <View style={styles.imagecontainer}>
            {/* <View style={styles.circle}></View> */}
            <Image source={require('../../assets/pic.png')} style={styles.image}/>
          </View>

          <View style={styles.bottomcontainer}>
          <Pressable  onPress={() => navigation.replace('Signup')}>
            <Text style={styles.button}>Sign Up</Text>
          </Pressable>
          </View>
        </ImageBackground>
      </View>

  )
}

const styles = StyleSheet.create({
  bgimage: {
    height:"100%",
    width:"100%",
    resizeMode: "contain",
  },
  container:{
    flex: 1,
    backgrounColor: Colors.bgYellow
  },
  topcontainer: {
    flex: 1,
  },
  logo: {
    height: '30%',
    width: '30%',
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    margin: 20,
  },
  text: {
    textAlign:"center",
    fontWeight:'bold',
    fontSize: 35,
    margin: 5
  },
  imagecontainer: {
    width: devicewidth > 380 ? 300 : 250,
    alignSelf:"center",
    justifyContent: 'center',
    flex: 2,
  },
  image:{
    resizeMode:"contain",
    width: "100%",
    height: "100%",
   
  },
  bottomcontainer: {
    flex: .5
  },
  button: {
    borderColor: 'black',
    color: Colors.bgYellow,
    overflow:"hidden",
    backgroundColor: "black",
    padding: 15,
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 10,
    width: '60%',
    alignSelf: 'center',
    elevation: 10,
    shadowColor: '#52006A',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
})