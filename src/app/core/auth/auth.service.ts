import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Role, User } from '../../shared/entities';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://68a470c4c123272fb9b2b56f.mockapi.io/users';

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // 👉 storage seguro (localStorage si existe, si no: en memoria)
  private storage: StorageLike = this.isBrowser && typeof window !== 'undefined' && 'localStorage' in window
    ? window.localStorage
    : createMemoryStorage();

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const raw = this.safeGetItem('auth.user');
    if (raw) {
      try { this.currentUserSubject.next(JSON.parse(raw) as User); } catch {}
    }
  }

  get currentUser(): User | null { return this.currentUserSubject.value; }
  isAuthenticated(): boolean { return !!this.currentUserSubject.value?.token; }
  hasRole(role: Role): boolean { return this.currentUser?.role === role; }

  login(email: string, password: string): Observable<User> {
    return this.http
      .get<ApiUser[]>(`${this.apiUrl}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`)
      .pipe(
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
          this.safeSetItem('auth.user', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout(): void {
    this.safeRemoveItem('auth.user');
    this.currentUserSubject.next(null);
  }

  // ---- helpers de storage (no revientan fuera del browser) ----
  private safeGetItem(key: string): string | null {
    try { return this.storage.getItem(key); } catch { return null; }
  }
  private safeSetItem(key: string, value: string): void {
    try { this.storage.setItem(key, value); } catch {}
  }
  private safeRemoveItem(key: string): void {
    try { this.storage.removeItem(key); } catch {}
  }
}

// ===== tipos/utilidades =====
type ApiUser = { id: string; name: string; email: string; role: string; password?: string };

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

function createMemoryStorage(): StorageLike {
  const m = new Map<string, string>();
  return {
    getItem: (k) => (m.has(k) ? m.get(k)! : null),
    setItem: (k, v) => { m.set(k, v); },
    removeItem: (k) => { m.delete(k); },
  };
}

function cryptoRandom(): string {
  try {
    const a = new Uint8Array(16);
    // @ts-ignore
    (globalThis.crypto || (globalThis as any).msCrypto).getRandomValues(a);
    return Array.from(a).map(b => b.toString(16).padStart(2, '0')).join('');
  } catch {
    return Math.random().toString(36).slice(2);
  }
}
