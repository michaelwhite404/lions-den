import axios, { AxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SignoutResponse,
  StartSessionResponse,
  StudentsResponse,
  SessionTodayResponse,
  SessionsResponse,
  SignInResponse,
} from "../../types/apiResponse";
import StudentModel from "../../types/models/studentModel";
import Credentials from "../../types/credentials";

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

export const startAftercareSession = async (params: { students: string[] }) => {
  const token = await getToken();
  const res = await cstoneApi.post<StartSessionResponse>(
    "/aftercare/session",
    params,
    headers(token)
  );
  return res.data.data;
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

export const signOutStudent = async (studentId: string, body: { signature: string }) => {
  const token = await getToken();
  const res = await cstoneApi.patch<SignoutResponse>(
    `/aftercare/attendance/sign-out/${studentId}`,
    body,
    headers(token)
  );
  return res.data.data.entry;
};

export const getSessionToday = async () => {
  const token = await getToken();
  const res = await cstoneApi.get<SessionTodayResponse>("/aftercare/session/today", headers(token));
  return res.data.data;
};

export const getAllAftercareSessions = async () => {
  const token = await getToken();
  const res = await cstoneApi.get<SessionsResponse>("/aftercare/session", {
    params: { sort: "-date" },
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data.sessions;
};

export const signIn = async (credentials: Credentials) => {
  const res = await cstoneApi.post<SignInResponse>("/users/login", credentials);
  return { token: res.data.token, user: res.data.data.employee };
};

const getToken = async () => await AsyncStorage.getItem("token");

export const getSignatureURL = (key: string) =>
  `${cstoneApi.defaults.baseURL?.replace("/api/v2", "")}/images/${key}`;
