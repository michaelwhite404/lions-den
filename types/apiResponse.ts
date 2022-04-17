import { AftercareAttendanceEntry, AftercareSession } from "./models/aftercareTypes";
import StudentModel from "./models/studentModel";

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
