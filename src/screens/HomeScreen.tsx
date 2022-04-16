import React from "react";
import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import tw from "tailwind-rn";
import useCurrentSession from "../hooks/useCurrentSession";

export default function HomeScreen({ navigation }: any) {
  const currentSession = useCurrentSession();

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/SleepingStudent.png")} />
      <Text style={styles.text}>There is no active session</Text>
      <View style={tw("absolute bottom-0")}>
        <TouchableOpacity onPress={() => navigation.navigate("SelectStudents")}>
          <View style={tw("bg-blue-600 w-64 py-3 items-center rounded-md mt-6")}>
            <Text style={tw("text-white font-medium")}>Start Session</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  image: {
    width: 250,
    height: 250,
  },
  text: {
    color: "gray",
    marginTop: 20,
  },
});
