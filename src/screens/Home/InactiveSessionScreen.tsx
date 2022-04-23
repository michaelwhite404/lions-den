import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tw from "tailwind-rn";
import SessionScreenProps from "../../../types/sessionScreenProps";
import RefreshScrollView from "../../components/RefreshScrollView";

export default function InactiveSessionScreen({ navigation, currentSession }: SessionScreenProps) {
  return (
    <RefreshScrollView onRefresh={currentSession.refreshSession}>
      <View style={styles.container}>
        <Image style={styles.image} source={require("../../../assets/SleepingStudent.png")} />
        <Text style={styles.text}>There is no active session</Text>
        <View style={tw("absolute bottom-0")}>
          <TouchableOpacity onPress={() => navigation.navigate("SelectStudents")}>
            <View style={tw("bg-blue-600 w-64 py-3 items-center rounded-md mt-6")}>
              <Text style={tw("text-white font-medium")}>Start Session</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </RefreshScrollView>
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
