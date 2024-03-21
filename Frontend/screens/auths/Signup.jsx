import React, { useState, useContext, useEffect } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import {  TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import Inputs from '../../components/Inputs';
import axiosInstance from '../../api/axios';
import AuthContext from '../../context/AuthProvider';
import Colors from '../../constants/Colors';
import AuthButton from '../../components/auths/AuthButton';
import Title from '../../components/auths/Title';
import LinkContainer from '../../components/auths/LinkContainer';




const width = Dimensions.get("window").width

const signupURL = "/api/user/register";


export default function Signup() {
	const {auth,setAuth} = useContext(AuthContext)
	const navigation = useNavigation();
	const [inputValid, setInputValid] = useState({
		isTextEmpty: false,
		isPassNotMatch: false
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
		if (!textInputs.email|| !textInputs.password || !textInputs.name) {
			setInputValid((prevState) => ({
				...prevState,
				isTextEmpty: true
			}));
			console.log("add inputs")
			return
		}
		if (textInputs.password !== textInputs.confirmpassword) {
			setInputValid((prevState) => ({
				...prevState,
				isPassNotMatch: true
			}));
			console.log("pass mismatch")
			return
		}
		try {
			const response = await axiosInstance.post(signupURL, textInputs,{
					headers: { "Content-Type": 'application/json' },
					withCredentials: true
				});

			setAuth(response.data)
			//navigation.navigate("HomePage")
		} catch (error) {
			console.log(error);
			console.log(error.status)
		}
		return
	};
	useEffect(()=>{
		if (textInputs.email || textInputs.password || textInputs.name || textInputs.confirmpassword) {
			setInputValid((prevState) => ({
				...prevState,
				isTextEmpty: false
			}));
		}

	},[textInputs])

	console.log(auth)
	return (
		
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<View style={styles.container}>
					<Title>Sign In</Title>
					<View style={styles.bottomsheet}>
						<TextInput
							label={'Email'}
							value={textInputs.name}
							style={styles.textinput}
							mode='outlined'
							onChangeText={(textValue) => handleInput("name", textValue)}
						/>
						<TextInput
							label={'Email'}
							value={textInputs.email}
							keyboardType="email-address" // Set keyboard type for email suggestions
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
						<TextInput
							label={'Confirm Password'}
							value={textInputs.confirmpassword}
							secureTextEntry={true}
							style={styles.textinput}
							mode='outlined'
							onChangeText={(textValue) => handleInput("confirmpassword", textValue)}
						/>
						{inputValid.isTextEmpty && <Text style={styles.invalidText}>Please fill all fields</Text>}
						{inputValid.isPassNotMatch && <Text style={styles.invalidText}>Password not match</Text>}
						<AuthButton submitForm={submitForm}>Signup</AuthButton>
						<LinkContainer Link="Log in" navigation={navigation}>Already have an account?</LinkContainer>
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
		backgroundColor: Colors.bgYellow,
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
	bottomsheetTitle:{
		marginVertical: 10,
		fontWeight:"500",
		fontSize: 20,
	},
	invalidText:{
		color: '#Be254b',
		textAlign: "left",
	},
	textinput: {
		width: '80%',
		height: width < 380 ? 40: 35 ,
		backgroundColor: Colors.bgOffWhite,
		margin: 2,
	},

});
