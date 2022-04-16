import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import StudentModel from "../../types/models/studentModel";
import { getAftercareStudents } from "../api/cstoneApi";
import MultiSelectList from "../components/MultiSelectList";

export default function SelectStudentsScreen() {
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
        <MultiSelectList data={students} onCheckboxPress={handleAnyCheckboxPress} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
});
