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
    getAllStudents({ status: "Active", aftercare: false }).then(setStudents).catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <SearchBar
          style={styles.searchBar}
          value={filter}
          placeholder="Search for students..."
          onChangeText={setFilter}
          onClearPress={() => setFilter("")}
        />
        <FlatList
          style={styles.list}
          data={data}
          renderItem={({ item }) => <Text>{item.fullName}</Text>}
        />
      </View>
      <View style={styles.inner}>
        <Text style={styles.text}>Lions Den Drop Ins</Text>
        {/* <CheckItem />
        <CheckItem />
        <CheckItem />
        <CheckItem />
        <CheckItem /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
  },
  search: {
    zIndex: 3,
    width: "90%",
    alignSelf: "center",
  },
  searchBar: {
    marginLeft: 0,
    width: "100%",
  },
  inner: {
    width: "90%",
    alignSelf: "center",
    marginVertical: 20,
    zIndex: 2,
  },
  text: {
    fontWeight: "600",
    marginBottom: 15,
  },
  list: {
    position: "absolute",
    top: 50,
    backgroundColor: "white",
    width: "100%",
  },
});

// console.log(route.params.selectedIds);
