import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, Dimensions} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AxiosInstance } from '../../api/axios';
import AuthContext from '../../context/AuthProvider';
import Colors from '../../constants/Colors';
import Title from '../../components/auths/Title';
import AuthButton from '../../components/auths/AuthButton';
import LinkContainer from '../../components/auths/LinkContainer';


const width = Dimensions.get('screen').width
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

	const [inputInvalid, setInputInvalid] = useState(null);

	const submitForm = async () => {
		if (!textInputs.email || !textInputs.password) {
			setInputInvalid(true);

			return
		} else {
			setInputInvalid(false);

			try {
				const response = await AxiosInstance.post(loginURL, textInputs,{
						headers: { "Content-Type": 'application/json' },
						withCredentials: true
					});

				setloggedin(true)
				setAuth(response.data)
				console.log(JSON.stringify(response.data));
			} catch (error) {
				console.log(error);
				console.log(error.status)
			}
		}
	}

	return (
			<KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.container}>
					<Title>Log in</Title>
					<View style={styles.bottomsheet}>
						<Text style={styles.logintext}>Log in</Text>
						<TextInput
							label={'Email'}
							value={textInputs.password}
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
							placeholderTextColor= "red"
							mode='outlined'
							onChangeText={(textValue) => handleInput("password", textValue)}
						/>
						<View>{inputInvalid && <Text style={styles.invalidText}>Invalid Email or Password</Text>}</View>
						<AuthButton submitForm={submitForm}>Log in</AuthButton>
						<LinkContainer Link="Sign up" navigation={navigation}>Don't have an account? </LinkContainer>
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
	topsheet:{
		flex: 1,
		alignItems:"flex-start"
	},
	bottomsheet: {
		backgroundColor: 'white',
		borderTopRightRadius:40,
		borderTopLeftRadius:40,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 20,
		paddingBottom: 30,
		paddingTop: 15,
	},
	signupButton: {
		width: 170,
		marginBottom: 15
	},
	signupText: {
		backgroundColor: 'black',
		borderRadius: 6,
		paddingVertical: 15,
		marginTop: 10,
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
		overflow:"hidden",
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
	},
	logintext: {
		fontWeight: 'bold',
		fontSize: 20,
		padding: 5,
	},
});
