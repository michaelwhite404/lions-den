import React from "react";
import { Image, TextInput, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/Lion.png")}
          resizeMode="contain"
        />
        <Text>Sign In to Lions Den</Text>
        <Text>Email Address</Text>
        <View style={styles.input}>
          <TextInput />
        </View>
        {/* <Text>Password</Text> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 75,
    alignItems: "center",
    borderWidth: 5,
    borderColor: "red",
  },
  innerContainer: {
    width: "70%",
    // borderWidth: 2,
  },
  image: {
    width: 100,
    height: 100,
    // backgroundColor: "yellow",
  },
  input: {
    borderRadius: 6,
    height: 25,
    shadowColor: "#757575",
    shadowRadius: 8,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    // borderColor: "red",
    // borderWidth: 1,
    backgroundColor: "white",
  },
});
