import { AxiosError } from "axios";
import { AftercareAttendanceEntry, AftercareSession } from "./models/aftercareTypes";
import StudentModel from "./models/studentModel";
import { User } from "./models/userModel";

interface APIResponse<Data> {
  status: "success";
  requestedAt: string;
  results?: number;
  data: Data;
}

export interface StudentsResponse extends APIResponse<{ students: StudentModel[] }> {}

export interface StartSessionResponse
  extends APIResponse<{ session: AftercareSession; attendance: AftercareAttendanceEntry[] }> {}

export interface SignoutResponse
  extends APIResponse<{ entry: Required<AftercareAttendanceEntry> }> {}

export interface SessionTodayResponse
  extends APIResponse<{
    session: AftercareSession | null;
    attendance: AftercareAttendanceEntry[];
  }> {}

export interface SessionsResponse extends APIResponse<{ sessions: AftercareSession[] }> {}

export interface SignInResponse extends Omit<APIResponse<{ employee: User }>, "requestedAt"> {
  token: string;
}

export interface GetMeResponse extends APIResponse<{ user: User }> {}

export interface EntriesResponse extends APIResponse<{ entries: AftercareAttendanceEntry[] }> {}

interface APIError {
  status: "fail" | "error";
  message: string;
}

export type Err = AxiosError<APIError>;
