import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import LabeledInput from "../components/LabeledInput";
import Credentials from "../../types/credentials";
import useAuth from "../hooks/useAuth";
import showToast from "../utils/showToast";
import { Err } from "../../types/apiResponse";

export default function SignInScreen({ navigation }: any) {
  const [credentials, setCredentials] = useState<Credentials>({ email: "", password: "" });
  const { signIn } = useAuth();

  const changeText = (name: string, text: string) =>
    setCredentials({ ...credentials, [name]: text });

  const signInUser = async () => {
    signIn(credentials)
      .then(({ user }) =>
        showToast("success", "Log in successful", `👋 Welcome back, ${user.firstName}`)
      )
      .catch((err: Err) => showToast("error", err.response!.data.message));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/Lion.png")}
          resizeMode="contain"
        />
        <Text style={styles.text}>Welcome Back!</Text>
        <Text style={styles.subText}>Sign In to Lions Den</Text>
        <LabeledInput
          name="email"
          label="Email Address"
          value={credentials.email}
          onChangeText={changeText}
        />
        <View style={{ marginTop: 30 }} />
        <LabeledInput
          secureTextEntry
          name="password"
          label="Password"
          value={credentials.password}
          onChangeText={changeText}
        />
      </View>
      <Button onPress={signInUser}>Sign In</Button>
      <Text style={styles.values}>Love. Integrity. Opportunity. Nobility. Strength</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 75,
    alignItems: "center",
  },
  text: {
    fontWeight: "700",
    fontSize: 18,
  },
  subText: {
    marginTop: 3,
    marginBottom: 40,
    color: "#757575",
  },
  innerContainer: {
    width: "75%",
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 35,
  },
  values: {
    position: "absolute",
    bottom: 35,
    fontSize: 9,
  },
});
