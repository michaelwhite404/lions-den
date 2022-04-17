import StudentModel from "./studentModel";

export interface AftercareAttendanceEntry {
  _id: string;
  student: {
    _id: StudentModel["_id"];
    fullName: StudentModel["fullName"];
    schoolEmail: StudentModel["schoolEmail"];
  };
  session: any;
  signOutDate?: Date;
  signature?: string;
  lateSignOut?: boolean;
  dropIn: boolean;
}
export interface AftercareSession {
  /** Id of the aftercare session */
  _id: string;
  date: Date;
  active: boolean;
  numAttended: number;
  dropIns: number;
}
