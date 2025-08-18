import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../../../shared/entities';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  // MockAPI usa colección con mayúscula
  private apiUrl = 'https://68a28b69c5a31eb7bb1d235a.mockapi.io/Courses';

  constructor(private http: HttpClient) {}

  /** Convierte el shape de la API (id:string) → tu modelo (id:number) */
  private fromApi = (a: ApiCourse): Course => ({ ...a, id: Number(a.id) });

  /** Para PUT: tu modelo (id:number) → el shape de la API (id:string) */
  private toApi   = (c: Course): ApiCourse => ({ ...c, id: String(c.id) });

  getCourses(): Observable<Course[]> {
    return this.http.get<ApiCourse[]>(this.apiUrl).pipe(
      map(arr => arr.map(this.fromApi))
    );
  }

  /** CREAR: no envíes id; MockAPI lo genera */
  addCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<ApiCourse>(this.apiUrl, course).pipe(
      map(this.fromApi)
    );
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<ApiCourse>(`${this.apiUrl}/${course.id}`, this.toApi(course)).pipe(
      map(this.fromApi)
    );
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

/** Tipo auxiliar con id:string como lo entrega MockAPI */
type ApiCourse = Omit<Course, 'id'> & { id: string };
