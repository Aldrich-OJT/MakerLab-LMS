import React, { useContext, useState } from 'react';
import { Pressable, StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Inputs from '../../components/Inputs';
import {AuthContext} from '../../context/AuthProvider'




export default function Login() {
  const loginURL = "/api/user/login"
  const {setAuth} = useContext(AuthContext) 
  const navigation = useNavigation();

  const [textInputs, setTextinputs] = useState({
    email:"",
    password:""
  }) 

  const handleInput = (textName, textValue) => {
    setTextinputs(prevState => ({
      ...prevState,
      [textName]: textValue
    }));
  }

  const [inputValid, setInputValid] = useState(false);

  const submitForm = () => {
    if (textInputs.email === "" || textInputs.password === "") {
      setInputValid(true);
    } else {
      setInputValid(false);
      // Submit the form logic here
    }
  }

  return (
    <PaperProvider>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.topsheet}>
              <Text>Log In</Text>
            </View>
            <View style={styles.bottomsheet}>
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
              {inputValid && <Text style={styles.invalidText}>Invalid Email or Password</Text>}
              <Pressable style={{ width: '50%' }} onPress={submitForm}>
                <Text style={styles.signupbutton}>Sign up</Text>
              </Pressable>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: '#898989' }}>Don't have an account?</Text>
                <Pressable onPress={() => navigation.replace('Signup')}>
                  <Text style={{ color: '#7E3290' }}> Log In</Text>
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
  topsheet:{
    flex: 1,
  },
  bottomsheet: {
    backgroundColor: 'white',
    borderTopRightRadius:40,
    borderTopLeftRadius:40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  signupbutton: {
    backgroundColor: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
    borderRadius: 6,
  },
  invalidText:{
    color: '#Be254b',
    textAlign: "left",
  }
});
