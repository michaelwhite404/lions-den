export interface User {
  /** Id of the user */
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  homeroomGrade?: number;
  title: string;
  role: UserRole;
  image?: string;
  googleId?: string;
  password: string;
  passwordConfirm?: string;
  passwordChangedAt?: Date;
  passwordResetToken?: String;
  passwordResetExpires?: Date;
  lastLogin?: Date;
  createdAt: Date;
  active: boolean;
  slug: string;
  timesheetEnabled: boolean;
  // employeeOf?: DepartmentModel[];
  // leaderOf?: DepartmentModel[];
  // approverOf?: DepartmentModel[];
}

type UserRole = "Super Admin" | "Admin" | "Development" | "Instructor" | "Intern" | "Maintenance";
