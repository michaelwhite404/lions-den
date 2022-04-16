import StudentModel from "./studentModel";

export interface AftercareAttendanceEntryModel {
  _id: any;
  student: StudentModel;
  session: any;
  signOutDate?: Date;
  signature?: string;
  lateSignOut?: boolean;
  dropIn: boolean;
}
export interface AftercareSessionModel {
  /** Id of the aftercare session */
  _id: any;
  date: Date;
  active: boolean;
  numAttended: number;
  dropIns: number;
}
