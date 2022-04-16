import React, { ReactNode, useState } from "react";
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

interface SelectItemProps {
  children?: ReactNode;
  onPress?: (checked: boolean) => void;
}

export default function SelectItem({ children, onPress }: SelectItemProps) {
  const [selected, setSelected] = useState(false);

  const handlePress = () => {
    setSelected(!selected);
    if (onPress) onPress(!selected);
  };

  return (
    <View style={styles.container}>
      <BouncyCheckbox
        size={35}
        fillColor="dodgerblue"
        iconStyle={{
          borderRadius: 3,
        }}
        isChecked={selected}
        onPress={handlePress}
        disableBuiltInState
      />
      <TouchableOpacity style={styles.text} onPress={handlePress}>
        {children}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    paddingVertical: 10,
    width: "70%",
  },
});
