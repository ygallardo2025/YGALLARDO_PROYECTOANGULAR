import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import * as AuthActions from './auth.actions';
import { AuthService } from '../auth.service';
import { RoutePath } from '../../../shared/route-path';

export const login$ = createEffect(
  (
    actions$ = inject(Actions) as Actions,
    auth = inject(AuthService)
  ) =>
    actions$.pipe(
      ofType(AuthActions.loginStart),
      exhaustMap(({ email, password }) =>
        auth.login(email, password).pipe(
          map(user =>
            AuthActions.login({
              email: user.email,
              name: user.name,
              admin: user.role === 'admin',
            })
          ),
          catchError(err =>
            of(AuthActions.loginFailure({ error: err?.message || 'Login failed' }))
          )
        )
      )
    ),
  { functional: true } // 👈 IMPORTANTE
);

export const loginSuccess$ = createEffect(
  (
    actions$ = inject(Actions) as Actions,
    router = inject(Router)
  ) =>
    actions$.pipe(
      ofType(AuthActions.login),
      tap(() => router.navigate(['/', RoutePath.Dashboard]))
    ),
  { functional: true, dispatch: false } // 👈 IMPORTANTE
);

export const logout$ = createEffect(
  (
    actions$ = inject(Actions) as Actions,
    auth = inject(AuthService),
    router = inject(Router)
  ) =>
    actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        auth.logout();
        router.navigate(['/', RoutePath.Login]);
      })
    ),
  { functional: true, dispatch: false } // 👈 IMPORTANTE
);

// 👇 Exporta un OBJETO con tus efectos funcionales
export const authEffects = { login$, loginSuccess$, logout$ };
