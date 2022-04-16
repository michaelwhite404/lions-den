import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import SearchBar from "react-native-dynamic-search-bar";
import StudentModel from "../../types/models/studentModel";
import { getAllStudents } from "../api/cstoneApi";
import CheckItem from "../components/CheckItem";
import ListItem from "../components/ListItem";
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
        <View style={styles.list}>
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => console.log(item)}>
                <ListItem last={data.length - 1 === index}>
                  <Text>{item.fullName}</Text>
                </ListItem>
              </TouchableOpacity>
            )}
          />
        </View>
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
    top: 55,
    backgroundColor: "white",
    width: "100%",
    maxHeight: Dimensions.get("screen").height - 500,
    borderRadius: 12,
    shadowColor: "#757575",
    shadowRadius: 8,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
});

// console.log(route.params.selectedIds);
