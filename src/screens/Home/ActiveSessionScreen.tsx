import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
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
        renderItem={({ item }) => <Row text={item.student.fullName} />}
      />
    </View>
  );
}

const Row = ({ text }: { text: string }) => (
  <View style={styles.row}>
    <Text>{text}</Text>
    <Text>Sign Out</Text>
  </View>
);

const styles = StyleSheet.create({
  row: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
});
