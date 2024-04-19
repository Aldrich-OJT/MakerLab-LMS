import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { axiosPost } from '../../utils/axios';
import Colors from '../../constants/Colors';
import Title from '../../components/auths/Title';
import AuthButton from '../../components/auths/AuthButton';
import LinkContainer from '../../components/auths/LinkContainer';
import { AuthContext } from '../../context/AuthProvider';

const loginURL = "/api/user/login"
const contentType = "application/json"

export default function Login() {
  const navigation = useNavigation()
  const authContext = useContext(AuthContext)
  const [inputInvalid, setInputInvalid] = useState(false)
  const initialtextInput = {
    email: "",
    password: ""
  };
  const [textInputs, setTextInputs] = useState(initialtextInput)
  const [passhidden, setpasshidden] = useState(true)

  const passwordhandler = () => {
    setpasshidden((prevState) => !prevState);
  }
  const handleInput = (textName, textValue) => {
    // Function to update the textInputs state when user types in the input fields
    setTextInputs(prevState => ({
      ...prevState,
      [textName]: textValue,
    }))
  }

  const submitForm = async () => {

    try {
      console.log("trying to log in")
      const data = await axiosPost(loginURL, textInputs,contentType)
      if (data) {
        console.log(data)
        authContext.authenticate(data)
       
      }
    } catch (error) {
      
      setInputInvalid(true)
      console.log(error.response.data.message)

    }
  };
  useEffect(() => {
    if (!textInputs.email || !textInputs.password) {
      setInputInvalid(false) 
		}
	}, [textInputs]);
  console.log(textInputs)
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Title />
          <View style={styles.bottomsheet}>
            <Text style={styles.logintext}>Log in</Text>
            <TextInput
              label={'Email'}
              value={textInputs.email}
              keyboardType="email-address"
              textContentType="emailAddress"
              autoCapitalize="none"
              style={styles.textinput}
              mode='outlined'
              onChangeText={(textValue) => handleInput("email", textValue)}
            />
              <TextInput
                label={'Password'}
                value={textInputs.password}
                secureTextEntry={passhidden}
                style={styles.textinput}
                autoCapitalize="none"
                mode='outlined'
                right={<TextInput.Icon icon="eye" style={{top:5}} onPress={passwordhandler} />}
                onChangeText={(textValue) => handleInput("password", textValue)}
              />
            <View>{inputInvalid && <Text style={styles.invalidText}>Invalid Email or Password</Text>}</View>
            <AuthButton submitForm={submitForm}>Log in</AuthButton>
            <LinkContainer Link="Sign up" to="Signup" navigation={navigation}>Don't have an account? </LinkContainer>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: Colors.bgOffWhite,
  },
  bottomsheet: {
    backgroundColor: 'white',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

  elevation: 5,
  },
  invalidText: {
    color: Colors.bgRedInvalid,
    textAlign: "left",
  },
  textinput: {
    width: '80%',
    //height: width < 380 ? 40: 35 ,
    justifyContent: "center",
    height: 40,
    backgroundColor: Colors.bgOffWhite,
    marginVertical: 5,
  },
  logintext: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 5,
  },
});
