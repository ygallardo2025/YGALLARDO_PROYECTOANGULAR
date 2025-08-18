// src/app/features/students/services/students.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../../../shared/entities';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StudentsService {
  // OJO: MockAPI usa 'Students' con S mayúscula
  private apiUrl = 'https://68a28b69c5a31eb7bb1d235a.mockapi.io/Students';

  constructor(private http: HttpClient) {}

  /** El shape que devuelve la API: id como string */
  private fromApi = (a: ApiStudent): Student => ({ ...a, id: Number(a.id) });
  /** Para PUT: convertimos número -> string */
  private toApi   = (s: Student): ApiStudent => ({ ...s, id: String(s.id) });

  getStudents(): Observable<Student[]> {
    return this.http.get<ApiStudent[]>(this.apiUrl).pipe(
      map(arr => arr.map(this.fromApi))
    );
  }

  /** CREAR: no enviar id (MockAPI lo genera) */
  addStudent(student: Omit<Student, 'id'>): Observable<Student> {
    return this.http.post<ApiStudent>(this.apiUrl, student).pipe(
      map(this.fromApi)
    );
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http.put<ApiStudent>(`${this.apiUrl}/${student.id}`, this.toApi(student)).pipe(
      map(this.fromApi)
    );
  }

  deleteStudent(id: number): Observable<void> {
    // MockAPI acepta el id como segmento string; `${id}` está bien
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

/** Tipo auxiliar con id string como lo entrega MockAPI */
type ApiStudent = Omit<Student, 'id'> & { id: string };
