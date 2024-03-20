import React, { useContext, useState } from 'react';
import { Pressable, StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Inputs from '../../components/Inputs';
import { AxiosInstance } from '../../api/axios';
import AuthContext from '../../context/AuthProvider';
const loginURL = "/api/user/login"


export default function Login() {
  const navigation = useNavigation();
  const {setAuth} = useContext(AuthContext)
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

  // const submitForm = async () => {
  //   if (textInputs.email === "" || textInputs.password === "") {
  //     setInputValid(false);
  //     return
  //   } else {
  //     setInputValid(true);

  //     try {
  //       const response = await axios.post(loginURL, textInputs,{
  //           headers: { "Content-Type": 'application/json' },
  //           withCredentials: true
  //         });

  //       const token = response.data.token;
  //       const role = response.data.role;
  //       setloggedin(true)
  //       setAuth(response.data)
  //       console.log(JSON.stringify(response.data));
  //     } catch (error) {
  //       console.log(error);
  //       console.log(error.status)
  //     }
  //   }
  // }

  return (

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
            <View>{inputValid && <Text style={styles.invalidText}>Invalid Email or Password</Text>}</View>
            <View>
              <Pressable style={{ width: '50%' }} >
                <Text style={styles.signupbutton}>Sign up</Text>
              </Pressable>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#898989' }}>Don't have an account?</Text>
              <Pressable onPress={() => navigation.replace('Signup')}>
                <Text style={{ color: '#7E3290' }}> Sign Up</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffc42c',
  },
  topsheet:{
    flex: 1,
    justifyContent:"center",
    alignItems:"center"
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
