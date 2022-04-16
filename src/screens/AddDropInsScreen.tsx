import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import SearchBar from "react-native-dynamic-search-bar";
import tw from "tailwind-rn";
import StudentModel from "../../types/models/studentModel";
import { getAllStudents } from "../api/cstoneApi";
import CheckItem from "../components/CheckItem";
import ListItem from "../components/ListItem";
import useFilter from "../hooks/useFilter";

export default function AddDropInsScreen({ navigation, route }: any) {
  const [students, setStudents] = useState<StudentModel[]>([]);
  const { data, filter, setFilter } = useFilter(students, "fullName");
  const [selectedStudents, setSelectedStudents] = useState<StudentModel[]>([]);

  useEffect(() => {
    getAllStudents({ status: "Active", aftercare: false }).then(setStudents).catch(console.error);
  }, []);

  const addStudent = (studentToAdd: StudentModel) => {
    setSelectedStudents([...selectedStudents, studentToAdd]);
    setStudents(students.filter((student) => student._id !== studentToAdd._id));
    setFilter("");
  };

  const removeStudent = (removedStudent: StudentModel) => {
    setSelectedStudents(selectedStudents.filter((stu) => stu._id !== removedStudent._id));
    setStudents([...students, removedStudent]);
  };

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
            keyExtractor={(student) => student._id}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => addStudent(item)}>
                <ListItem last={data.length - 1 === index}>
                  <Text>{item.fullName}</Text>
                </ListItem>
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps="always"
          />
        </View>
      </View>
      <View style={styles.inner}>
        <Text style={styles.text}>Lions Den Drop Ins ({selectedStudents.length})</Text>
        <FlatList
          data={selectedStudents}
          keyExtractor={(student) => student._id}
          renderItem={({ item }) => (
            <CheckItem text={item.fullName} onButtonPress={() => removeStudent(item)} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.submit}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <View style={tw("bg-blue-600 w-64 py-3 items-center rounded-md")}>
            <Text style={tw("text-white font-medium")}>Begin Session</Text>
          </View>
        </TouchableOpacity>
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
    flex: 2,
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 5,
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
  submit: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    // borderWidth: 1,
  },
});

// console.log(route.params.selectedIds);
