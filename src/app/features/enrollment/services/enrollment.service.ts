import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Enrollment } from '../../../shared/entities';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private apiUrl = 'https://68a470c4c123272fb9b2b56f.mockapi.io/enrollment';

  constructor(private http: HttpClient) {}

  // API (string ids) → App (number ids)
  private fromApi = (a: ApiEnrollment): Enrollment => ({
    ...a,
    id: Number(a.id),
    studentId: Number(a.studentId),
    courseId: Number(a.courseId),
  });

  // App → API (PUT)
  private toApi = (e: Enrollment): ApiEnrollment => ({
    ...e,
    id: String(e.id),
    studentId: String(e.studentId),
    courseId: String(e.courseId),
  });

  getAll(): Observable<Enrollment[]> {
    return this.http.get<ApiEnrollment[]>(this.apiUrl).pipe(
      map(arr => arr.map(this.fromApi))
    );
  }

  // Crear → NO enviar id
  add(enrollment: Omit<Enrollment, 'id'>): Observable<Enrollment> {
    const payload: Omit<ApiEnrollment, 'id'> = {
      studentId: String(enrollment.studentId),
      courseId: String(enrollment.courseId),
    };
    return this.http.post<ApiEnrollment>(this.apiUrl, payload).pipe(map(this.fromApi));
  }

  update(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.put<ApiEnrollment>(`${this.apiUrl}/${enrollment.id}`, this.toApi(enrollment))
      .pipe(map(this.fromApi));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

type ApiEnrollment = {
  id: string;
  studentId: string;
  courseId: string;
};
