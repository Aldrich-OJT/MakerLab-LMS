import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, Pressable, SafeAreaView} from "react-native";
import { Searchbar } from "react-native-paper";
import Header from "../components/auths/Header";

const dimensions = Dimensions.get('window');   
const maxWidth = dimensions.width;
const maxHeight = dimensions.height;

export default function Learn() {
    const [searchQuery, setSearchQuery] = React.useState('');

    return (
      <SafeAreaView>
        <View>
            <Header/>
            <Searchbar
                style={styles.searchbar}
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
                />
            <View style={styles.bottomsheet}>
                <View>
                    <Text style={styles.coursenameshadow}></Text>
                    <Pressable style={styles.coursename}>
                        <Text style={styles.coursenametext}>COURSE NAME</Text>
                    </Pressable>
                </View>
          
                <View style={styles.lessonshadow}>
                  <Text style={styles.lesson}></Text>
                  <Image source={require('../assets/video.png')} style={styles.video}></Image>
                  <View style={styles.textcontainer}>
                    <Text style={styles.text1}>Section 1</Text>
                    <Text style={styles.text2}>Sollicitudin massa pellentesque bibendum id felis ut commodo. </Text>
                  </View>
                </View>

                <View style={styles.lessonshadow}>
                  <Text style={styles.lesson}></Text>
                  <Image source={require('../assets/video.png')} style={styles.video}></Image>
                  <View style={styles.textcontainer}>
                    <Text style={styles.text1}>Section 2</Text>
                    <Text style={styles.text2}>Sollicitudin massa pellentesque bibendum id felis ut commodo. </Text>
                  </View>
                </View>
            </View>
          </View>
      </SafeAreaView>
    );
  };

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
    searchbar: {
        position: 'absolute',
        alignSelf: 'center',
        width: maxWidth * .8,
        top: 90,
    },
    bottomsheet: {
        alignItems: 'center',
        padding: 25,
        backgroundColor: 'white',
        gap: 20,
        height: '100%',
        width:'100%',
    },
    coursename: {
        justifyContent: 'center',
        backgroundColor: '#ffc42c',
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 2,
        height: maxHeight * .07,
        width: maxWidth * .50,
    },
    coursenametext: {
        fontSize: 17,
        textAlign: 'center',
    },
    coursenameshadow:{
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: 'black',
        borderRadius: 50,
        height: maxHeight * .07,
        width: maxWidth * .50,
        top:5,
        left: 2,
    },
    lessonshadow: {
      backgroundColor: '#9300FF',
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
      height: '15%',
    },
    video: {
      width: '45%',
      height: '70%',
      margin: 20,
    },  
    lesson: {
      backgroundColor: '#ffc42c',
      position: 'absolute',
      width: '100%',
      height: '90%',
    },
    textcontainer: {
      flex: 1, 
      flexDirection: 'column',
      gap: 20
    },
    text1: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    text2: {
      fontSize: 12,
    }
})