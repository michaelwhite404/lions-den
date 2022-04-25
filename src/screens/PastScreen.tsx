import moment from "moment";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tw from "tailwind-rn";

import { AftercareSession } from "../../types/models/aftercareTypes";
import { getAllAftercareSessions } from "../api/cstoneApi";
import RefreshFlatList from "../components/RefreshFlatList";
import showToast from "../utils/showToast";

export default function PastScreen() {
  const [sessions, setSessions] = useState<AftercareSession[]>([]);

  useEffect(() => {
    getSessions();
  }, []);

  const getSessions = () =>
    getAllAftercareSessions()
      .then(setSessions)
      .catch(() => showToast("error", "Could not fetch session", "Pull down to try again"));

  return (
    <RefreshFlatList
      onRefresh={getSessions}
      data={sessions}
      keyExtractor={(session) => session._id}
      renderItem={({ item }) => (
        <TouchableOpacity>
          <View style={styles.row}>
            <View>
              <Text style={styles.date}>{moment(item.date).format("dddd MMMM D, YYYY")}</Text>
              <Text style={styles.text}>Students Attended: {item.numAttended}</Text>
              <Text style={styles.text}>Drop Ins: {item.dropIns}</Text>
            </View>
            {item.active && (
              <View>
                <View
                  style={tw(
                    "items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 "
                  )}
                >
                  <Text>Active</Text>
                </View>
              </View>
            )}
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "white",
  },
  date: {
    fontWeight: "600",
    marginBottom: 5,
    fontSize: 16,
  },
  text: {
    fontSize: 13,
    color: "#9f9f9f",
  },
});
