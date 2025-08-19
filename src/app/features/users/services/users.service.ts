import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Role, User } from '../../../shared/entities';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private apiUrl = 'https://68a470c4c123272fb9b2b56f.mockapi.io/Users'; ///////////////////cambiar
  constructor(private http: HttpClient) {}
  
  private fromApi = (a: ApiUser): User => ({
    id: Number(a.id),
    name: a.name,
    email: a.email,
    role: (a.role as Role) ?? 'user',
    token: '' // no se usa en el ABM
  });

  // ⬇️ aceptar Omit<User, 'token'> aquí
  private toApi = (u: Omit<User, 'token'>): ApiUser => ({
    id: String(u.id),
    name: u.name,
    email: u.email,
    role: u.role
  });

  getAll(): Observable<User[]> {
    return this.http.get<ApiUser[]>(this.apiUrl).pipe(map(arr => arr.map(this.fromApi)));
  }

  add(user: Omit<User, 'id' | 'token'> & { password?: string }): Observable<User> {
    return this.http.post<ApiUser>(this.apiUrl, user).pipe(map(this.fromApi));
  }

  update(user: Omit<User, 'token'>): Observable<User> {
    // ✅ ahora encaja con toApi(...)
    return this.http.put<ApiUser>(`${this.apiUrl}/${user.id}`, this.toApi(user))
      .pipe(map(this.fromApi));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

type ApiUser = { id: string; name: string; email: string; role: string; password?: string };