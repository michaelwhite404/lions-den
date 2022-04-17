import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CurrentSession } from "../../context/CurrentSessionContext";

export default function ActiveSessionScreen({
  navigation,
  currentSession,
}: {
  navigation: any;
  currentSession: CurrentSession;
}) {
  const awaitingPickUp = currentSession.attendance.filter((entry) => !entry.signOutDate);
  const pickedUp = currentSession.attendance.filter((entry) => entry.signOutDate);

  return (
    <View>
      {awaitingPickUp.length > 0 && (
        <View>
          <Text style={styles.head}>Awaiting Pickup ({awaitingPickUp.length})</Text>
          <FlatList
            data={awaitingPickUp}
            keyExtractor={(entry) => entry._id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <View>
                  <Text style={styles.name}>{item.student.fullName}</Text>
                  <Text style={styles.email}>{item.student.schoolEmail}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("Signature", { entry: item })}>
                  <View style={styles.button}>
                    <Text style={styles.signOut}>Sign Out</Text>
                    <Ionicons name="ios-chevron-forward-outline" size={20} color="#0a84ff" />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
      {pickedUp.length > 0 && (
        <View>
          <Text style={styles.head}>Picked Up ({pickedUp.length})</Text>
          <FlatList
            data={pickedUp}
            keyExtractor={(entry) => entry._id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <View>
                  <Text style={styles.name}>{item.student.fullName}</Text>
                  <Text style={styles.email}>{item.student.schoolEmail}</Text>
                </View>
                <Image style={styles.signature} source={{ uri: item.signature }} />
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    textTransform: "uppercase",
    marginVertical: 10,
    left: 20,
    fontWeight: "600",
    color: "gray",
    fontSize: 11,
  },
  list: {
    // flex: 1,
    height: "100%",
  },
  row: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "white",
  },
  name: {
    fontWeight: "400",
    marginBottom: 3,
  },
  email: {
    fontSize: 12,
    color: "#9f9f9f",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  signOut: {
    color: "#0a84ff",
  },
  signature: {
    width: 80,
    height: 40,
    alignSelf: "center",
  },
});
