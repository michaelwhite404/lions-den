import { AftercareAttendanceEntry, AftercareSession } from "./models/aftercareTypes";
import StudentModel from "./models/studentModel";

interface APIResponse<Data> {
  status: "success";
  requestedAt: string;
  results?: number;
  data: Data;
}

export interface StudentsResponse extends APIResponse<{ students: StudentModel[] }> {}

export interface StartSessionResonse
  extends APIResponse<{ session: AftercareSession; attendance: AftercareAttendanceEntry[] }> {}
