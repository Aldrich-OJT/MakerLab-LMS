import React from 'react';
import { Dimensions, Pressable, Image, StyleSheet, Text, View, ImageBackground} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/Colors';

const dimensions = Dimensions.get('window');   
const maxWidth = dimensions.width;
const maxHeight = dimensions.height;

const containerSize = Math.min(maxHeight, maxWidth);
const containerRadius = containerSize / 2;

export default function Welcome() {
    const navigation = useNavigation();

  return ( 
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/background.png')} style={styles.bgimage}>
          
          <View style={styles.topcontainer}>
            <Image source={require('../../assets/logo-dark.png')} style={styles.logo}/>
            <Text style={styles.text}>Let's Get Started!</Text>
          </View>

          <View style={styles.imagecontainer}>
            <View style={styles.circle}/>
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
    height: '100%', 
    width: '100%',
    resizeMode: 'cover',
  },
  container:{
    height: maxHeight, 
    width: maxWidth,
    backgrounColor: Colors.bgYellow
  },
  topcontainer: {
    flexDirection:'column',
    flex: 1,
  },
  logo: {
    height: '30%',
    width: '30%',
    resizeMode: 'contain',
    alignSelf: 'stretch',
    alignSelf: 'flex-end',
    right: 10,
    margin: 5,
  },
  text: {
    fontWeight:'bold',
    fontSize: 30,
    margin: 5
  },
  imagecontainer: {
    position: 'relative',
    justifyContent: 'center',
    flex: 2,
  },
  image:{
    borderRadius: containerRadius,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'black',
    height: maxHeight * .35,
    width: maxWidth * .7,
  },
  circle:{
    borderRadius: containerRadius,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'black',
    height: maxHeight * .35,
    width: maxWidth * .7,
    position: 'absolute',
    left: '11%',
    bottom: '16%',
  },
  bottomcontainer: {
    flex: .5
  },
  button: {
    borderColor: 'black',
    backgroundColor: '#ffc42c',
    padding: 15,
    borderWidth: 2,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 10,
    width: '60%',
    alignSelf: 'center',
    elevation: 10,
    shadowColor: '#52006A',
  },
})