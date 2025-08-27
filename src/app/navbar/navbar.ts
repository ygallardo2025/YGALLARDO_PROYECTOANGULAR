import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';

import { LayoutService } from '../core/layout/layout.services';
import { AuthService } from '../core/auth/auth.service';
import { RoutePath } from '../shared/route-path';

type Vm = {
  isOpen: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
};

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar implements OnInit {
  private layout = inject(LayoutService);
  private auth = inject(AuthService);

  RoutePath = RoutePath;
  vm$!: Observable<Vm>;

  ngOnInit(): void {
    this.vm$ = combineLatest([
      this.layout.sidebarOpen$,
      this.auth.currentUser$
    ]).pipe(
      map(([isOpen, user]) => ({
        isOpen,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
      }))
    );
  }
}
