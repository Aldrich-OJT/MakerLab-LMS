import React from 'react';
import { Dimensions, Pressable, Image, StyleSheet, Text, View, ImageBackground} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const dimensions = Dimensions.get('window');   
const imageWidth = dimensions.width;
const imageHeight = dimensions.height;

export default function Welcome() {
    const navigation = useNavigation();

  return ( 
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/background.png')} style={styles.bgimage}>
          
          <View style={styles.topcontainer}>
            <Text style={styles.text}>Let's Get Started!</Text>
            <Image source={require('../../assets/logo-dark.png')} style={styles.logo}/>
          </View>

          <View style={styles.imagecontainer}>
            <View style={styles.circle}/>
            <Image source={require('../../assets/pic.png')} style={styles.image}/>
          </View>

          <View>
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
    height: imageHeight, 
    width: imageWidth,
    resizeMode: 'cover',
  },
  container:{
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
  },

  topcontainer: {
    justifyContent: 'space-between', 
    flexDirection:'row',
  },

  imagecontainer: {
    position: 'relative'
  },

  image:{
    borderRadius: 150,
    borderWidth: 2,
    borderColor: 'black',
    height: '60%',
    width: '75%',
    alignSelf: 'center',
    top: '30%',
  },

  circle:{
    borderRadius: 150,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'black',
    height: '60%',
    width: '75%',
    position: 'absolute',
    top: '34%',
    left: '7%',
  },

  logo: {
    height: '30%',
    width: '30%',
    resizeMode: 'contain',
    right: 0,
    marginRight: '5%',
    marginTop: '7%',
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
    marginTop: '10%'
  },

  text: {
    fontWeight:'bold',
    fontSize: 30,
    marginTop: '23%',
  },
})