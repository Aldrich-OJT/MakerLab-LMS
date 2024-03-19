import React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View, ImageBackground} from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const dimensions = Dimensions.get('window');   
const maxWidth = dimensions.width;
const maxHeight = dimensions.height;


export default function Login () {
  const navigation = useNavigation();
  const [text, setText] = React.useState("");

    return(
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.topsheet}>
          </View>
          <View style={styles.bottomsheet}>
            <TextInput
              style={styles.textinput}
              label="Enter Email"
              value={text}
              mode='outlined'
              onChangeText={text => setText(text)}
              />

            <TextInput
              style={styles.textinput}
              label="Enter Password"
              value={text}
              mode='outlined'
              onChangeText={text => setText(text)}
              />
                    
            <Pressable style={{width: '50%'}} onPress={() => navigation.navigate('HomePage')}>
              <Text style={styles.signupbutton}>Sign up</Text>
            </Pressable>

            <View style={{flexDirection: 'row'}}>
              <Text style={{color: '#898989'}}>Don't have an account?</Text>
              <Pressable onPress={() => navigation.replace('Signup')}>
                <Text style={{color: '#7E3290'}}> Sign Up</Text>
              </Pressable>
            </View>
            </View>
        </View>
    </PaperProvider>
);
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: maxWidth,
        height: maxHeight,
        backgroundColor: '#ffc42c',
        position: 'absolute',
    },
    topsheet:{
        flex: 1,
    },

    bottomsheet: {
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 40,
        width: maxWidth,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft: -5,
        marginRight:-5,
        marginBottom:-25,
        flex: 1.5,
    },

    textinput: {
        width: '80%',
        backgroundColor: '#EDEDED',
        margin: 7,
    },

    signupbutton: {
        backgroundColor: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        paddingTop: 15,
        paddingBottom: 15,
        marginBottom: 70,
        marginTop: 10,
        textAlign: 'center',
        borderRadius: 6,
    },
})