import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, throwError } from 'rxjs';
import { Role, User } from '../../shared/entities';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://68a28b69c5a31eb7bb1d235a.mockapi.io/Users'; //////////////cambiar
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const raw = localStorage.getItem('auth.user');
    if (raw) {
      try { this.currentUserSubject.next(JSON.parse(raw) as User); } catch {}
    }
  }

  get currentUser(): User | null { return this.currentUserSubject.value; }
  isAuthenticated(): boolean { return !!this.currentUserSubject.value?.token; }
  hasRole(role: Role): boolean { return this.currentUser?.role === role; }

  login(email: string, password: string): Observable<User> {
    // MockAPI: buscamos por email y password (guardado en el recurso)
    return this.http.get<ApiUser[]>(`${this.apiUrl}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`).pipe(
      map(list => {
        if (!list.length) throw new Error('Credenciales inválidas');
        const apiUser = list[0];
        const user: User = {
          id: Number(apiUser.id),
          name: apiUser.name,
          email: apiUser.email,
          role: (apiUser.role as Role) ?? 'user',
          token: cryptoRandom(), // token fake
        };
        localStorage.setItem('auth.user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth.user');
    this.currentUserSubject.next(null);
  }
}

/** Shape que devuelve MockAPI (id string) */
type ApiUser = {
  id: string; name: string; email: string; role: string; password?: string;
};

function cryptoRandom(): string {
  try {
    const a = new Uint8Array(16);
    crypto.getRandomValues(a);
    return Array.from(a).map(b => b.toString(16).padStart(2, '0')).join('');
  } catch {
    return Math.random().toString(36).slice(2);
  }
}
