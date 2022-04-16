import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import SearchBar from "react-native-dynamic-search-bar";
import StudentModel from "../../types/models/studentModel";
import { getAllStudents } from "../api/cstoneApi";
import CheckItem from "../components/CheckItem";
import useFilter from "../hooks/useFilter";

export default function AddDropInsScreen({ navigation, route }: any) {
  const [students, setStudents] = useState<StudentModel[]>([]);
  const { data, filter, setFilter } = useFilter(students, "fullName");

  useEffect(() => {
    // console.log(route.params.selectedIds);
    getAllStudents({ status: "Active", aftercare: false }).then(setStudents).catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar value={filter} placeholder="Search for students..." onChangeText={setFilter} />
      <View style={styles.inner}>
        <Text style={styles.text}>Lions Den Drop Ins</Text>
        {/* <CheckItem />
        <CheckItem />
        <CheckItem />
        <CheckItem />
        <CheckItem /> */}
        <FlatList data={data} renderItem={({ item }) => <Text>{item.fullName}</Text>} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
  },
  inner: {
    margin: 20,
  },
  text: {
    fontWeight: "600",
    marginBottom: 15,
  },
});
