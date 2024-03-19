import React from 'react';
import { Dimensions, Pressable, Image, StyleSheet, Text, View, ImageBackground} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const dimensions = Dimensions.get('window');   
const imageWidth = dimensions.width;
const imageHeight = dimensions.height;

export default function Welcome() {
    const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/background.png')} style={styles.bgimage}>
        <Text style={styles.text}>Let's Get Started!</Text>
        <Image source={require('../../assets/logo-dark.png')} style={styles.logo}/>
          <View style={styles.container}>
              <View style={styles.circle} />
              <Image source={require('../../assets/pic.png')} style={styles.image}/>
          </View>

          <View>
          <Pressable  onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.button}>Sign Up</Text>
          </Pressable>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView> 
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
  },

  image:{
    height: '45%',
    width: '70%',
    borderColor: 'black',
    borderRadius: 550,
    borderWidth: 2,
    marginTop: '68%',
  },
  circle:{
    position: 'absolute',
    height: '30%',
    width: '70%',
    borderColor: 'black',
    borderRadius: 550,
    backgroundColor: 'black',
    borderWidth: 2,
    marginTop: '75%',
  },
  logo: {
    height: '30%',
    width: '30%',
    resizeMode: 'contain',
    position: 'absolute',
    marginTop: '-12%',
    right: 0,
    marginRight: '5%',
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

  text: {
    fontWeight:'bold',
    fontSize: 30,
    marginTop: '23%',
    position: 'absolute'
  },
})
