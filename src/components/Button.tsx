import React, { ReactChild } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedbackProps,
  View,
} from "react-native";
import tw from "tailwind-rn";

interface ButtonProps extends Pick<TouchableWithoutFeedbackProps, "onPress" | "disabled"> {
  children?: ReactChild;
}

export default function Button(props: ButtonProps) {
  return (
    <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
      <View style={tw("bg-blue-600 w-64 py-3 items-center rounded-md mt-6")}>
        <Text style={tw("text-white font-medium")}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
}

// const styles = StyleSheet.create({});
