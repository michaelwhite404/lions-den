import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function CheckItem() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <AntDesign name="closesquare" size={30} color="#ef4444" />
      </TouchableOpacity>
      <Text style={styles.text}>Michael White</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    marginBottom: 25,
    // borderWidth: 2,
  },
  text: {
    paddingLeft: 15,
  },
});
