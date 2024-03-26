import { View, StyleSheet, Text, Dimensions, ImageBackground, Image, Pressable } from "react-native";
import Colors from "../constants/Colors";

const dimensions = Dimensions.get('window');   
const devicewidth = dimensions.width;
const deviceheight = dimensions.height;

export default function Assess() {
    return(
        <View style={styles.mainContainer}>
            <ImageBackground source={require('../assets/assess-background.png')} style={styles.bgimage}>
            <Image source={require('../assets/logo-light.png')} style={styles.logo}/>
            <View style={styles.quizcontainer}>
                <Text>Quiz Name</Text>
                <Text>Description</Text>
                <View style={styles.itemcontainer}>
                    <View style={styles.questioncontainer}>
                        <Text style={styles.questiontext}>1. Lorem ipsum dolor sit amet?</Text>
                    </View>

                    <View style={styles.choicescontainer}>
                        <View style={styles.choicesrow}>
                            <Pressable style={styles.choices}>
                                <Text style={styles.choicestext}>a. Nulla Vitae</Text>
                            </Pressable>

                            <Pressable style={styles.choices}>
                                <Text style={styles.choicestext}>b. Nulla Vitae</Text>
                            </Pressable>
                        </View>

                        <View style={styles.choicesrow}>
                            <Pressable style={styles.choices}>
                                <Text style={styles.choicestext}>c. Nulla Vitae</Text>
                            </Pressable>

                            <Pressable style={styles.choices}>
                                <Text style={styles.choicestext}>d. Nulla Vitae</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
            </ImageBackground>
        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    bgimage: {
        height:"100%",
        width:"100%",
        resizeMode: "contain",
        justifyContent:"center",
        alignItems:"center",
      },
      logo: {
        height: 30,
        width: 100,
        alignSelf: 'flex-end',
        margin: 10,
      },
      quizcontainer: {
        backgroundColor: Colors.bgDarkViolet,
        height: '85%',
        width: '95%',
        borderRadius: 10,
        padding: 15,
      },
      itemcontainer: {
        backgroundColor: Colors.bgYellow,
        borderWidth: 2,
        borderColor: 'black',
        height: '40%',
        width: '100%',
      },
      questioncontainer: {
        borderBottomWidth: 2,
        padding: 15,
      },
      questiontext:{
        fontSize: 20,
      },
      choicescontainer: {
        flexDirection: 'column',
        gap: 20,
        height: '60%',
        width: '100%',
        backgroundColor: 'red',
        justifyContent:"center",
        alignItems:"center",
      },
      choicesrow:{
        flexDirection: 'row',
        gap: 20,
      },
      choices: {
        backgroundColor: Colors.bgDarkYellow,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        width: '40%'
      },
      choicestext: {
        fontSize: 17,
      },
})