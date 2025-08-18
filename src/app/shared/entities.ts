export type Role = 'admin' | 'user';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  token: string;
}

export interface Student {
  id: number;
  name: string;
  surname: string;
  age: number;
  dni: string;
  average: number;
}

export interface Course {
  id: number;
  title: string;
  description: string;
}

export interface Enrollment {
  id: number;
  studentId: number;
  courseId: number;
}

// Para listar con nombres expandidos desde json-server:
export interface EnrollmentExpanded extends Enrollment {
  student?: Student;
  course?: Course;
}
