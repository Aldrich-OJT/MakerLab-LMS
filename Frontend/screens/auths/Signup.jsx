  import React, { useState, useContext } from 'react';
  import { Dimensions, Pressable, StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native';
  import { PaperProvider } from 'react-native-paper';
  import { TextInput } from 'react-native-paper';
  import { useNavigation } from '@react-navigation/native';
  import { TouchableWithoutFeedback, Keyboard } from 'react-native';
  import Inputs from '../../components/Inputs';
  import axiosInstance from '../../api/axios';
  import AuthContext from '../../context/AuthProvider';
  


  const width = Dimensions.get("window").width

  const signupURL = "/api/user/register";

  export default function Signup({navigation}) {
    const {auth,setAuth} = useContext(AuthContext)
    const nav = useNavigation();
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

    const navigatetoHome = ()=>{
      setAuth(true)
      if(auth){
        navigation.navigate("HomePage")
      }
      
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
        const response = await axiosInstance.post(signupURL, textInputs,{
            headers: { "Content-Type": 'application/json' },
            withCredentials: true
          });

        setAuth(response.data)
        navigation.navigate("HomePage")
      } catch (error) {
        console.log(error);
        console.log(error.status)
      }
      return
    };

    console.log(textInputs);
    console.log(auth)
    return (
      
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.container}>
            
            <View style={styles.topsheet}>
              <Text style={styles.signInTitle}>Sign In</Text>
            </View>

            <View style={styles.bottomsheet}>
              <Text style={styles.bottomsheetTitle}>Input details</Text>
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
                  <Pressable onPress={() => navigation.replace('Login')}>
                    <Text style={{ color: '#7E3290' }}> Log In</Text>
                  </Pressable>
                </View>
            </View>

          </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>


    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: '#ffc42c',
    },
    topsheet: {
      flex:1,
      alignItems:"flex-start"
    },
    bottomsheet: {
      backgroundColor: 'white',
      borderTopRightRadius: 40,
      borderTopLeftRadius: 40,
      width: "100%",
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingBottom: 30,
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
    },
    signInTitle:{
      marginTop:100,
      fontSize: 20,
      fontWeight: "500",
      fontSize: 40
    },
    bottomsheetTitle:{
      marginVertical: 10,
      fontWeight:"500",
      fontSize: 20,
    }
  });
