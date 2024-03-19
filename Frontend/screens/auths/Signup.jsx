import React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import Inputs from '../../components/Inputs';

const dimensions = Dimensions.get('window');
const maxWidth = dimensions.width;
const maxHeight = dimensions.height;

export default function Signup() {
  const navigation = useNavigation();
  const [inputValid, setInputValid] = useState(false);

  const [textInputs, setTextinputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: ""
  })

  const handleInput = (textName, textValue) => {
    setTextinputs(prevState => ({
      ...prevState,
      [textName]: textValue
    }));
  }
  
  const submitForm = () => {
    if (textInputs.email === "" || textInputs.password === "") {
      setInputValid(true);
    } else {
      setInputValid(false);
      // Submit the form logic here
    }
  }

  console.log(textInputs)
  const [text, setText] = React.useState("");

  return (
    <PaperProvider>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <View style={styles.bottomsheet}>
              <Inputs
                label={'Name'}
                value={textInputs.name}
                onChangeText={(textValue) => handleInput("name", textValue)}
              />
              <Inputs
                label={'Email'}
                value={textInputs.email}
                onChangeText={(textValue) => handleInput("email", textValue)}
              />
              <Inputs
                label={'Password'}
                value={textInputs.password}
                onChangeText={(textValue) => handleInput("password", textValue)}
              />
              <Inputs
                label={'Confirm Password'}
                value={textInputs.confirmpassword}
                onChangeText={(textValue) => handleInput("confirmpassword", textValue)}
              />
              {inputValid && <Text style={styles.invalidText}>Invalid Email or Password</Text>}
              <Pressable style={styles.signup} onPress={submitForm}>
                <Text style={styles.signupbutton}>Sign up</Text>
              </Pressable>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: '#898989' }}>Already have an account?</Text>
                <Pressable onPress={() => navigation.navigate('Login')}>
                  <Text style={{ color: '#7E3290' }}> Sign In</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffc42c',
  },
  innerContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: 'center',
  },
  bottomsheet: {
    backgroundColor: 'white',
    borderTopRightRadius:40,
    borderTopLeftRadius:40,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  signupbutton: {
    backgroundColor: 'black',
    width: '100%',
    borderRadius: 6,
    paddingVertical: 15,
    marginTop: 20,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signup:{ 
    width: '50%',
    marginBottom:15
  }
});
