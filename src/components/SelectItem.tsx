import React, { ReactNode, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

interface SelectItemProps {
  children?: ReactNode;
  onPress?: (checked: boolean) => void;
}

export default function SelectItem({ children, onPress }: SelectItemProps) {
  const [selected, setSelected] = useState(false);

  const handlePress = (checked: boolean) => {
    setSelected(checked);
    if (onPress) onPress(checked);
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
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
