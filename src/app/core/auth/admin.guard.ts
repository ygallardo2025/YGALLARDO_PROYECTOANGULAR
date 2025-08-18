import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { RoutePath } from '../../shared/route-path';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isAuthenticated() && auth.hasRole('admin')) return true;
  router.navigate(['/', RoutePath.Dashboard]);
  return false;
};
