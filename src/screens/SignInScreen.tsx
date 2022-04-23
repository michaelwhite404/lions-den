import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LabeledInput from "../components/LabeledInput";

export default function SignInScreen() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const changeText = (name: string, text: string) =>
    setCredentials({ ...credentials, [name]: text });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/Lion.png")}
          resizeMode="contain"
        />
        <Text>Sign In to Lions Den</Text>
        <LabeledInput
          name="email"
          label="Email Address"
          value={credentials.email}
          onChangeText={changeText}
        />
        <View style={{ marginTop: 30 }} />
        <LabeledInput
          name="password"
          label="Password"
          value={credentials.password}
          onChangeText={changeText}
        />
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
    alignSelf: "center",
    // backgroundColor: "yellow",
  },
});
