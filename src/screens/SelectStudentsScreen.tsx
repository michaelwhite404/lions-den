import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tw from "tailwind-rn";
import StudentModel from "../../types/models/studentModel";
import { getAftercareStudents } from "../api/cstoneApi";
import MultiSelectList from "../components/MultiSelectList";

export default function SelectStudentsScreen({ navigation }: any) {
  const [students, setStudents] = useState<StudentModel[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    getAftercareStudents()
      .then(setStudents)
      .catch((err) => console.error(err));
  }, []);

  const handleAnyCheckboxPress = (selectedItems: StudentModel[]) =>
    setSelectedIds(selectedItems.map((student) => student._id));

  return (
    <View style={styles.container}>
      {students.length > 0 && (
        <>
          <View style={styles.list}>
            <MultiSelectList
              data={students}
              onCheckboxPress={handleAnyCheckboxPress}
              renderItem={({ fullName }) => (
                <Text style={{ fontSize: 15, fontWeight: "500", color: "black" }}>{fullName}</Text>
              )}
            />
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity onPress={() => navigation.navigate("AddDropIns", { selectedIds })}>
              <View style={tw("bg-blue-600 w-64 py-3 items-center rounded-md")}>
                <Text style={tw("text-white font-medium")}>Add Drop Ins</Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: 10,
    flexDirection: "column",
    flex: 1,
  },
  list: {
    flex: 10,
  },
  buttons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
});
