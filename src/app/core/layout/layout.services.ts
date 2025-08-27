// src/app/core/layout/layout.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private _sidebarOpen$ = new BehaviorSubject<boolean>(true);
  sidebarOpen$ = this._sidebarOpen$.asObservable();

  toggleSidebar(): void { this._sidebarOpen$.next(!this._sidebarOpen$.value); }
  openSidebar(): void { this._sidebarOpen$.next(true); }
  closeSidebar(): void { this._sidebarOpen$.next(false); }
}
