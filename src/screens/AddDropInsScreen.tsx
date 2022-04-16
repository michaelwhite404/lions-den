import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import SearchBar from "react-native-dynamic-search-bar";
import StudentModel from "../../types/models/studentModel";
import { getAllStudents } from "../api/cstoneApi";

export default function AddDropInsScreen({ navigation, route }: any) {
  const [students, setStudents] = useState<StudentModel[]>([]);

  useEffect(() => {
    // console.log(route.params.selectedIds);
    getAllStudents({ status: "Active", aftercare: false }).then(setStudents).catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar />
      <FlatList data={students} renderItem={({ item }) => <Text>{item.fullName}</Text>} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // borderWidth: 5,
    // borderColor: "red",
    paddingTop: 10,
    flex: 1,
  },
});
