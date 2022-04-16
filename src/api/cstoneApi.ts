import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetAftercareStudents } from "../../types/apiResponse";

const cstoneApi = axios.create({
  baseURL: "http://afb3-108-31-65-13.ngrok.io/api/v2",
});

export const getAftercareStudents = async () => {
  const token = await getToken();
  const res = await cstoneApi.get<GetAftercareStudents>("/aftercare/students", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data.students;
};

const getToken = async () => await AsyncStorage.getItem("token");
