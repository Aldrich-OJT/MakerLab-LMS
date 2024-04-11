import { Text, Pressable, StyleSheet, View, Image, Dimensions } from "react-native";
import Colors from "../constants/Colors";
import { useState } from "react";

const dimensions = Dimensions.get('window');

export default function QuizItem(props) {
  const [selected, setSelected] = useState(null);

  const handleChoiceSelection = (choice) => {
    setSelected(choice === selected ? null : choice);
  };

  return (
    <View style={styles.itemcontainer}>
      <View style={styles.questioncontainer}>
        <Text style={styles.questiontext}>{props.question}</Text>
      </View>

      <View style={styles.choicescontainer}>
        <View style={styles.choicesrow}>
          {props.options.map((option, index) => (
            <Pressable
              key={index}
              style={[
                styles.choices,
                selected === index && styles.selectedchoices
              ]}
              onPress={() => handleChoiceSelection(index)}
            >
              <Text
                style={[
                  styles.choicestext,
                  selected === index && { color: Colors.bgOffWhite }
                ]}
              >
                {String.fromCharCode(97 + index)}. {option}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({

  itemcontainer: {
    backgroundColor: Colors.bgYellow,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10

  },
  questioncontainer: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.bgDarkYellow,
    padding: 15,
    width: '90%'
  },
  questiontext: {
    fontSize: 16,
  },
  choicescontainer: {
    flexDirection: 'column',
    gap: 20,
    height: 'fit-content',
    paddingBottom: 20,
    paddingTop: 20,
    width: '90%',
    justifyContent: "center",
    alignItems: "flex-start",
  },
  choicesrow: {
    flexDirection: 'column',
    gap: 20,
  },
  choices: {
    backgroundColor: Colors.bgDarkYellow,
    borderRadius: 100,
    minWidth: '100%',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  choicestext: {
    fontSize: 15,
  },
  selectedchoices: {
    backgroundColor: Colors.bgDarkViolet,
    borderColor: 'black',
  }
})