// src/app/toolbar/toolbar.ts
import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map, startWith, distinctUntilChanged, combineLatest, Observable } from 'rxjs';
import { LayoutService } from '../core/layout/layout.services';
import { AuthService } from '../core/auth/auth.service';
import { User } from '../shared/entities';

type Vm = {
  title: string;
  user: User | null;
  isAuthenticated: boolean;
};

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toolbar implements OnInit {
  private router = inject(Router);
  private layout = inject(LayoutService);
  private auth = inject(AuthService);

  vm$!: Observable<Vm>;

  ngOnInit(): void {
    const title$ = this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      startWith(null),
      map(() => {
        let r = this.router.routerState.root;
        while (r.firstChild) r = r.firstChild;
        return (r.snapshot.data?.['toolbarTitle'] as string) || 'Aplicación';
      }),
      distinctUntilChanged()
    );

    this.vm$ = combineLatest([title$, this.auth.currentUser$]).pipe(
      map(([title, user]) => ({
        title,
        user,
        isAuthenticated: !!user,
      }))
    );
  }

  toggleSidebar(): void { this.layout.toggleSidebar(); }
  login(): void { this.router.navigate(['/login']); }
  logout(): void { this.auth.logout(); this.router.navigate(['/login']); }
}
