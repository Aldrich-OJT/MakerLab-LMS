import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AxiosInstance, login } from '../../utils/axios'; 
import Colors from '../../constants/Colors'; 
import Title from '../../components/auths/Title'; 
import AuthButton from '../../components/auths/AuthButton'; 
import LinkContainer from '../../components/auths/LinkContainer'; 
import { AuthContext } from '../../context/AuthProvider';



const width = Dimensions.get('screen').width; 
const loginURL = "/api/user/login"; 

export default function Login() {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext); 
  const [inputInvalid, setInputInvalid] = useState(null); 
  const initialtextInput = {
    name: "",
    email: ""
  };
  const [textInputs, setTextInputs] = useState(initialtextInput);

  const handleInput = (textName, textValue) => {
    // Function to update the textInputs state when user types in the input fields
    setTextInputs(prevState => ({
      ...prevState,
      [textName]: textValue,
    }));
  };

  const submitForm = async () => {
    // Function handles form submission
    if (!textInputs.email || !textInputs.password) {
      setInputInvalid(true); // Set error message if email or password is empty
      return;
    }
    setInputInvalid(false); // Clear error message if validation passes

    try {
	  const data = await login(loginURL, textInputs)
      console.log("login success"); 
      authContext.authenticate(data.token)
      console.log(data.token); 
    } catch (error) {
      console.error(error); 
      console.error(error.response.status); 
      console.error(error.response.data.message); 
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Title>Log in</Title>
          <View style={styles.bottomsheet}>
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
              secureTextEntry={true}
              style={styles.textinput}
              mode='outlined'
              onChangeText={(textValue) => handleInput("password", textValue)}
            />
            <View>{inputInvalid && <Text style={styles.invalidText}>Invalid Email or Password</Text>}</View> 
            <AuthButton submitForm={submitForm}>Log in</AuthButton> 
            <LinkContainer Link="Sign up" to="Signup" navigation={navigation}>Don't have an account?</LinkContainer> 
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
		backgroundColor: Colors.bgYellow,
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
	invalidText:{
		color: '#Be254b',
		textAlign: "left",
	},
	textinput: {
		width: '80%',
		height: width < 380 ? 40: 35 ,
		backgroundColor: Colors.bgOffWhite,
		marginVertical: 5,
},
	signInTitle:{
		marginLeft: 20,
		marginTop:100,
		fontWeight: "500",
		fontSize: 60
	}
});
