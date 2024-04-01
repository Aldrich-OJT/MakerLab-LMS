import React from "react";
import { StyleSheet, View, Image, ImageBackground } from "react-native";
import Colors from "../constants/Colors";
import ProgressBar from 'react-native-progress/Bar';

export default function LoadingScreen() {
  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={require('../assets/assess-background.png')} style={styles.bgimage}>

        <View style={styles.centerContainer}>
          <Image source={require('../assets/logo-dark.png')} style={styles.logo} />
          <Image source={require('../assets/splash-icon.png')} style={styles.icon} />
          <ProgressBar
            animated={true}
            progress={.1}
            width={270}
            height={10}
            borderRadius={10}
            unfilledColor={Colors.bgYellow}
            borderWidth={0}
            color={Colors.bgViolet}
            indeterminate={true}
          />
        </View>


      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bgimage: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
  },
  centerContainer: {
    backgroundColor: Colors.bgYellow,
    height: '85%',
    width: '95%',
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 3,
  },
  logo: {
    height: "9%",
    width: "52%",
    bottom: 20
  },
  icon: {
    resizeMode: "contain",
    width: "100%",
    height: "50%"
  }
})