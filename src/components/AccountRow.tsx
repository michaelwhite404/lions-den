import React, { ReactNode } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedbackProps,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

interface AccountRowProps extends Pick<TouchableWithoutFeedbackProps, "onPress"> {
  text?: string;
  arrow?: boolean;
  icon?: ReactNode;
  color?: string;
}

export default function AccountRow({ icon, text, arrow, color, onPress }: AccountRowProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.rowLeft}>
          {icon}
          <Text style={[styles.text, { color }]}>{text}</Text>
        </View>
        {arrow && <Feather name="chevron-right" size={24} color="gray" />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomColor: "#e5e7eb",
    borderBottomWidth: 1,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 17,
    marginLeft: 20,
    fontWeight: "500",
  },
});
