import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Course } from '../../../shared/entities';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  private apiUrl = 'https://68a28b69c5a31eb7bb1d235a.mockapi.io/Courses';

  constructor(private http: HttpClient) {}

  private fromApi = (a: ApiCourse): Course => ({
    id: Number(a.id),
    title: a.title,
    description: a.description
  });

  private toApi = (c: Omit<Course, 'id'> | Course): ApiCourse => ({
    id: (c as Course).id != null ? String((c as Course).id) : undefined,
    title: c.title,
    description: c.description
  });

  getCourses(): Observable<Course[]> {
    return this.http.get<ApiCourse[]>(this.apiUrl).pipe(map(list => list.map(this.fromApi)));
  }

  addCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<ApiCourse>(this.apiUrl, this.toApi(course)).pipe(map(this.fromApi));
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<ApiCourse>(`${this.apiUrl}/${course.id}`, this.toApi(course))
      .pipe(map(this.fromApi));
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

type ApiCourse = { id?: string; title: string; description: string };