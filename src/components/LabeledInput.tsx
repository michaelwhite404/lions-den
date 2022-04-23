import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface LabeledInputProps {
  name: string;
  label?: string;
  value?: string;
  onChangeText?: (name: string, text: string) => void;
}

export default function LabeledInput(props: LabeledInputProps) {
  const [focused, setFocused] = useState(false);
  return (
    <View>
      <Text style={styles.label}>{props.label}</Text>
      <View
        style={[
          styles.input,
          { borderColor: focused ? "dodgerblue" : "transparent", borderWidth: 2 },
        ]}
      >
        <TextInput
          autoCapitalize="none"
          value={props.value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChangeText={(text) => props.onChangeText?.(props.name, text)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: "600",
  },
  input: {
    borderRadius: 6,
    paddingVertical: 10,
    paddingLeft: 15,
    shadowColor: "#757575",
    shadowRadius: 8,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    // borderColor: "red",
    // borderWidth: 1,
    backgroundColor: "white",
    marginTop: 10,
    borderWidth: 2,
  },
});
