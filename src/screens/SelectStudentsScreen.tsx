import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import StudentModel from "../../types/models/studentModel";
import { getAftercareStudents } from "../api/cstoneApi";

export default function SelectStudentsScreen() {
  const [students, setStudents] = useState<StudentModel[]>([]);

  useEffect(() => {
    getAftercareStudents()
      .then(setStudents)
      .catch((err) => console.error(err));
  }, []);

  return (
    <View>
      <FlatList
        data={students}
        keyExtractor={(student) => student._id}
        renderItem={({ item }) => <Text>{item.fullName}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
