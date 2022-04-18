import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tw from "tailwind-rn";

import { AftercareSession } from "../../types/models/aftercareTypes";
import { getAllAftercareSessions } from "../api/cstoneApi";

export default function PastScreen() {
  const [sessions, setSessions] = useState<AftercareSession[]>([]);

  useEffect(() => {
    getAllAftercareSessions().then(setSessions).catch(console.error);
  }, []);

  return (
    <View>
      <FlatList
        data={sessions}
        keyExtractor={(session) => session._id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={styles.row}>
              <View>
                <Text style={styles.date}>{new Date(item.date).toDateString()}</Text>
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
    </View>
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
