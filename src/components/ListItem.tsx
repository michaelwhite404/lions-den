import React, { ReactChild } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ListItem({ children, last }: { children: ReactChild; last?: boolean }) {
  return (
    <View
      style={[
        styles.container,
        {
          borderBottomWidth: last ? 0 : 1,
        },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    // borderWidth: 2,
  },
});
