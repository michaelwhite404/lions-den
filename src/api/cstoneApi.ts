import axios, { AxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StudentsResponse } from "../../types/apiResponse";
import StudentModel from "../../types/models/studentModel";

const cstoneApi = axios.create({
  baseURL: "https://fc92-108-31-65-13.ngrok.io/api/v2",
});

const headers = (token: string | null): AxiosRequestConfig => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getAftercareStudents = async () => {
  const token = await getToken();
  const res = await cstoneApi.get<StudentsResponse>("/aftercare/students", headers(token));
  return res.data.data.students;
};

export const startAftercareSession = async ({ students }: { students: string[] }) => {
  const token = await getToken();
  const res = await cstoneApi.post("/aftercare/session", {}, headers(token));
};

interface GetAllStudentParams extends Partial<StudentModel> {
  limit?: number;
  page?: number;
  sort?: string;
}

export const getAllStudents = async (params: GetAllStudentParams = {}) => {
  const token = await getToken();
  const { limit, page } = params;
  const res = await cstoneApi.get<StudentsResponse>("/students", {
    params: { limit: params?.limit || 1000, page: params?.page || 1, ...params },
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data.students;
};

const getToken = async () => await AsyncStorage.getItem("token");
