import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import { getSignatureURL } from "../../api/cstoneApi";
import SessionScreenProps from "../../../types/sessionScreenProps";
import Refresh from "../../components/Refresh";

export default function ActiveSessionScreen({ navigation, currentSession }: SessionScreenProps) {
  const awaitingPickUp = currentSession.attendance.filter((entry) => !entry.signOutDate);
  const pickedUp = currentSession.attendance.filter((entry) => entry.signOutDate);

  return (
    <Refresh onRefresh={currentSession.refreshSession}>
      {awaitingPickUp.length > 0 && (
        <View>
          <Text style={styles.head}>Awaiting Pickup ({awaitingPickUp.length})</Text>
          {awaitingPickUp.map((entry) => (
            <View key={entry._id} style={styles.row}>
              <View>
                <Text style={styles.name}>{entry.student.fullName}</Text>
                <Text style={styles.email}>{entry.student.schoolEmail}</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate("Signature", { entry })}>
                <View style={styles.button}>
                  <Text style={styles.signOut}>Sign Out</Text>
                  <Ionicons name="ios-chevron-forward-outline" size={20} color="#0a84ff" />
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
      {pickedUp.length > 0 && (
        <View>
          <Text style={styles.head}>Picked Up ({pickedUp.length})</Text>
          {pickedUp.map((entry) => (
            <View key={entry._id} style={styles.row}>
              <View>
                <Text style={styles.name}>{entry.student.fullName}</Text>
                <Text style={styles.email}>{entry.student.schoolEmail}</Text>
                <Text style={styles.email}>Time: {moment(entry.signOutDate!).format("LT")}</Text>
              </View>
              <Image style={styles.signature} source={{ uri: getSignatureURL(entry.signature!) }} />
            </View>
          ))}
        </View>
      )}
    </Refresh>
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
    marginBottom: 3,
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
