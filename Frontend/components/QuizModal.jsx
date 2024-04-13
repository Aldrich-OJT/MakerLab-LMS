import * as React from 'react';
import { Text, Pressable, StyleSheet, View, Modal, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from "react-native";
import { TextInput, RadioButton } from "react-native-paper"
import Colors from "../constants/Colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function QuizModal({ visibility, onPress, children }) {
    const [checked, setChecked] = React.useState('');
    const choices = ['A', 'B', 'C', 'D'];

    const cancelForm = () => {
        onPress();
        //setFormData(formInitialData);
        //setErrorMessage("");
      }

    return (
        <KeyboardAvoidingView behavior="padding">
          <Modal
            animationType="fade"
            visible={visibility}
            onRequestClose={onPress}
            transparent={true}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.mainContainer} >
                <View style={styles.inputContainer}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.textTitle}>{children}</Text>
                    
                    <Pressable style={styles.closeButton} onPress={cancelForm}>
                    <Text><MaterialCommunityIcons name="close" size={30} color={Colors.bgRedInvalid} /></Text>
                    </Pressable>
                  </View>

                <View style={styles.inputText}>
                <TextInput
                    label="Question"
                    multiline={true}
                    mode="flat" 
                    />
                </View>   

                <Text style={{fontFamily: 'PTSans-Bold'}}>Input choices and select the correct answer.</Text>

                <View style={styles.inputChoicesContainer}>
                    {choices.map((option, index) => (
                    <View key={index} style={{flexDirection: 'row'}}>
                        <RadioButton
                            style={styles.radioButtons}
                            value={option}
                            status={checked === option ? 'checked' : 'unchecked'}
                            onPress={() => setChecked(option)}
                        />
                        <TextInput
                            style={styles.inputText}
                            multiline={true}
                            label={`Option ${option}`}
                            mode="flat"
                        />
                        </View>
                    ))}
                </View>
      

                  <View style={styles.buttonContainer}>
                    <Pressable style={[styles.submitButton]}>
                      <Text style={styles.SubmitText}>
                        Submit
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </KeyboardAvoidingView>
    
      )
    }
    
    const styles = StyleSheet.create({
      mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.4)"
      },
      inputContainer: {
        width: '90%',
        alignItems: "center",
        padding: 15,
        borderRadius: 10,
        backgroundColor: Colors.bgYellow,
        height: "fit-content",
        gap: 10,
      },
      titleContainer: {
        flexDirection: 'row',
      },
      textTitle: {
        fontSize: 20,
        fontFamily: 'PTSans-Bold',
        flex:5,
        textAlign: 'center',
        alignSelf: 'center',
        padding: 10,
      },
      closeButton: {
        position: 'absolute',
        right: 0,
        top:0,
      },
      inputChoicesContainer:{
        width: '90%',
        gap: 5,
        alignItems: 'center'
      },
      inputText:{
        width: '90%',
      },
      radioButtons:{
        marginTop:20,
      },
      buttonContainer: {
        flexDirection:"row",
        paddingBottom: 5,
      },
      submitButton: {
        backgroundColor: Colors.bgViolet,
        justifyContent: "center",
        alignItems: "center",
        width: '60%',
        borderRadius: 10,
        paddingVertical: 15,
        marginTop: 10,
      },
      SubmitText:{
        color: 'white',
        fontFamily: 'PTSans-Bold',
      }
    });
    
    
    
