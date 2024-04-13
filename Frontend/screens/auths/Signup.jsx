import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { axiosPost } from '../../utils/axios';
import { AuthContext } from '../../context/AuthProvider';
import Colors from '../../constants/Colors';
import AuthButton from '../../components/auths/AuthButton';
import Title from '../../components/auths/Title';
import LinkContainer from '../../components/auths/LinkContainer';

const signupURL = "/api/user/register";
const adduserdataURL = "/api/user/data/add/";
const contentType = "application/json"

export default function Signup() {
	const authContext = useContext(AuthContext);
	const navigation = useNavigation();

	const initialtextInput = {
		name: "",
		email: "",
		password: "",
		confirmpassword: ""
	};
	const initialErrorState = {
		isTextEmpty: false,
		isPassNotMatch: false,
		isEmailInvalid: false,
		isPasswordInvalid: false
	}

	const [textInputs, setTextinputs] = useState(initialtextInput);
	const [inputValid, setInputValid] = useState(initialErrorState);
	const [passhidden, setpasshidden] = useState({
		password: true,
		confirmpass: true
	})

	const passwordhandler = (label) => {
	  setpasshidden((prevState) => {
		return(
			{
				...prevState,
				[label]: !prevState[label]
			}
		)
	  })
	}

	// Function to update the text input state when user types
	const handleInput = (textName, textValue) => {
		setTextinputs(prevState => ({
			...prevState,
			[textName]: textValue
		}))
	};

	// Function to handle form submission
	const submitForm = async () => {
		// Check if all fields are filled
		if (!textInputs.email || !textInputs.password || !textInputs.name) {
			setInputValid(prevState => ({
				...prevState,
				isTextEmpty: true
			}));
			console.log("Please fill all fields");
			return;
		}

		// Check if passwords match
		if (textInputs.password !== textInputs.confirmpassword) {
			setInputValid(prevState => ({
				...prevState,
				isPassNotMatch: true
			}));
			console.log("Password mismatch");
			return;
		}
		const emailValid = textInputs.email.includes("@")
		if (emailValid === false) {
			setInputValid(prevState => ({
				...prevState,
				isEmailInvalid: true
			}));
			console.log("email not avail");
			return;
		}
		if (textInputs.password.length <= 6 && textInputs.confirmpassword.length <= 6) {
			if (emailValid === false) {
				setInputValid(prevState => ({
					...prevState,
					isPasswordInvalid: true
				}));
				console.log("email not avail");
				return;
			}
		}

		try {
			// Make a POST request to the signup API endpoint with form data
			const user = await axiosPost(signupURL, textInputs, contentType)
			const userdata = await axiosPost(`${adduserdataURL}${user._id}`, textInputs, contentType)
			console.log(user);
			console.log(userdata); 
			authContext.authenticate(user.token)
			console.log(user.token);
		} catch (error) {
			console.error(error.status);
			console.error(error);
		}
	}

	// Update inputValid state based on text input values
	useEffect(() => {
		if (textInputs.email || textInputs.password || textInputs.name || textInputs.confirmpassword) {
			setInputValid(initialErrorState);
		}
	}, [textInputs]);


	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<View style={styles.container}>
					<Title />
					<View style={styles.bottomsheet}>
						<Text style={styles.signuptext}>Sign up</Text>
						<TextInput
							label={'Full Name'}
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
							secureTextEntry={passhidden.password}
							autoCapitalize="none"
							style={styles.textinput}
							mode='outlined'
							right={<TextInput.Icon icon="eye" style={{top:5}} onPress={()=> passwordhandler('password')} />}
							onChangeText={(textValue) => handleInput("password", textValue)}
						/>
						<TextInput
							label={'Confirm Password'}
							value={textInputs.confirmpassword}
							secureTextEntry={passhidden.confirmpass}
							autoCapitalize="none"
							style={styles.textinput}
							mode='outlined'
							right={<TextInput.Icon icon="eye" style={{top:5}} onPress={()=> passwordhandler('confirmpass')} />}
							onChangeText={(textValue) => handleInput("confirmpassword", textValue)}
						/>
						{inputValid.isTextEmpty && <Text style={styles.invalidText}>Please fill all fields</Text>}
						{inputValid.isPassNotMatch && <Text style={styles.invalidText}>Password not match</Text>}
						{inputValid.isEmailInvalid && <Text style={styles.invalidText}>invalid Email</Text>}
						{inputValid.isPasswordInvalid && <Text style={styles.invalidText}>Password must be above 6 characters</Text>}
						<AuthButton submitForm={submitForm}>Sign up</AuthButton>
						<LinkContainer Link="Log in" to="Login" navigation={navigation}>Already have an account? </LinkContainer>
					</View>

				</View>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	)
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
		paddingHorizontal: 10,
    	paddingVertical: 30,
	},
	invalidText: {
		color: Colors.bgRedInvalid,
		textAlign: "left",
	},
	textinput: {
		width: '80%',
		// height: width < 380 ? 40: 35 ,
		height: 40,
		backgroundColor: Colors.bgOffWhite,
		margin: 2,
	},
	signuptext: {
		fontWeight: 'bold',
		fontSize: 20,
		padding: 5,
	},
})
