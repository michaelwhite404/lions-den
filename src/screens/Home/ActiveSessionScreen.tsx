import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CurrentSession } from "../../context/CurrentSessionContext";

export default function ActiveSessionScreen({
  navigation,
  currentSession,
}: {
  navigation: any;
  currentSession: CurrentSession;
}) {
  return (
    <View>
      <Text>In a session</Text>

      <FlatList
        data={currentSession.attendance}
        keyExtractor={(entry) => entry._id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>{item.student.fullName}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signature", { entry: item })}>
              <Text>Sign Out</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
});
