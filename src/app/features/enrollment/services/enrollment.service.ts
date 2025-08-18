import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Enrollment, EnrollmentExpanded } from '../../../shared/entities';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private apiUrl = 'http://localhost:3000/enrollments';

  constructor(private http: HttpClient) {}

  getAll(expanded = true): Observable<EnrollmentExpanded[]> {
    const url = expanded
      ? `${this.apiUrl}?_expand=student&_expand=course`
      : this.apiUrl;
    return this.http.get<EnrollmentExpanded[]>(url);
  }

  add(enrollment: Omit<Enrollment, 'id'>): Observable<EnrollmentExpanded> {
    return this.http.post<EnrollmentExpanded>(this.apiUrl, enrollment);
  }

  update(enrollment: Enrollment): Observable<EnrollmentExpanded> {
    return this.http.put<EnrollmentExpanded>(`${this.apiUrl}/${enrollment.id}`, enrollment);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
