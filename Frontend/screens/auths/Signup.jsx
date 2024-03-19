  import React, { useState } from 'react';
  import { Dimensions, Pressable, StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native';
  import { PaperProvider } from 'react-native-paper';
  import { TextInput } from 'react-native-paper';
  import { useNavigation } from '@react-navigation/native';
  import { TouchableWithoutFeedback, Keyboard } from 'react-native';
  import Inputs from '../../components/Inputs';
  import axiosInstance from '../../api/axios';
  import axios from "axios"

  const signupURL = "/api/user/register";

  export default function Signup(islogin) {

    const navigation = useNavigation();
    const [inputValid, setInputValid] = useState({
      isTextNotEmpty: false,
      isPassMatch: false
    });
    const initialtextInput = {
      name: "",
      email: "",
      password: "",
      confirmpassword: ""
    }
    const [textInputs, setTextinputs] = useState(initialtextInput)

    const handleInput = (textName, textValue) => {
      setTextinputs(prevState => ({
        ...prevState,
        [textName]: textValue
      }));

    }

    const submitForm = async () => {
      if (textInputs.email === "" || textInputs.password === "" || textInputs.name === "") {
        setInputValid((prevState) => ({
          ...prevState,
          isTextNotEmpty: false
        }));
        console.log("pls add all fields")
        return
      }
      if (textInputs.password !== textInputs.confirmpassword) {
        setInputValid((prevState) => ({
          ...prevState,
          isPassMatch: false
        }));
        console.log("password mismatch")
        return
      }

     
      try {
        const response = await axios.post('http://localhost:5000/api/user/register', textInputs,{
            headers: { "Content-Type": 'application/json' },
            withCredentials: true
          });

        const token = response.data.token;
        const role = response.data.role;
        console.log(JSON.stringify(response.data));
      } catch (error) {
        console.log(error);
        console.log(error.status)
      }
    };

    console.log(textInputs);

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
                {inputValid.textIsEmpty && <Text style={styles.invalidText}>Please fill all fields</Text>}
                {inputValid.isPassNotMatch && <Text style={styles.invalidText}>Password not match</Text>}
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
      borderTopRightRadius: 40,
      borderTopLeftRadius: 40,
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
    signup: {
      width: '50%',
      marginBottom: 15
    }
  });
