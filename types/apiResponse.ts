import StudentModel from "./models/studentModel";

interface APIResponse<Data> {
  status: "success";
  requestedAt: string;
  results?: number;
  data: Data;
}

export interface StudentsResponse extends APIResponse<{ students: StudentModel[] }> {}
