import { View, Text, StyleSheet, Pressable } from "react-native";
import Colors from "../../constants/Colors";
import { FontAwesome5 } from '@expo/vector-icons';

export default function Header ({title, navigation}) {
    return(
    <View style={styles.headercontainer}>
            <View>
            <Pressable style={styles.backButtonContainer} onPress={() => (navigation.goBack())} >
                <FontAwesome5
                name="chevron-left"
                size={20}
                color={Colors.bgYellow}
                />

            </Pressable>
            </View>
            <View style={styles.titlecontainer}>
            <Text style={styles.title} numberOfLines={1}><FontAwesome5 name="book" size={24} color={Colors.bgYellow} /> {title}</Text>
            </View>
        </View>
      );
}

const styles = StyleSheet.create({
 headercontainer: {
    justifyContent: 'space-evenly',
    alignItems: "center",
    width: "100%",
    height: "10%",
    flexDirection: 'row',
    marginTop: "10%",
  },
  backButtonContainer: {
    backgroundColor: '#292929',
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    overflow: "hidden"
  },
  title: {
    color: Colors.bgYellow,
    padding: 10,
    fontSize: 20,
    paddingHorizontal: 30,
    fontFamily: 'PTSans-Bold'
  },
  titlecontainer: {
    width: "80%",
    maxHeight: "fit-content",
    borderRadius: 50,
    backgroundColor: Colors.bgGray,
    justifyContent: "center"
  },
})