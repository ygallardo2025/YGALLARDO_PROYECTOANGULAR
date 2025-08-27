import { Routes } from '@angular/router';
import { RoutePath } from './shared/route-path';
import { authGuard } from './core/auth/auth.guard';
import { adminGuard } from './core/auth/admin.guard';

export const routes: Routes = [
  {
    path: RoutePath.Login,
    data: { title: 'Login' },
    loadComponent: () => import('./features/auth/login/login').then(m => m.LoginComponent)
  },
  {
    path: RoutePath.Dashboard,
    data: { toolbarTitle: 'Dashboard' },
    canActivate: [authGuard],
    loadComponent: () => import('./features/home/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: RoutePath.Students,
    data: { toolbarTitle: 'Estudiantes' },
    canActivate: [authGuard],
    loadComponent: () => import('./features/students/students-manager/students-manager').then(m => m.StudentsManagerComponent)
  },
  {
    path: RoutePath.Courses,
    data: { toolbarTitle: 'Cursos' },
    canActivate: [authGuard],
    loadComponent: () => import('./features/course/courses/courses').then(m => m.CoursesComponent)
  },
  {
    path: RoutePath.Enrollments,
    data: { toolbarTitle: 'Inscripciones' },
    canActivate: [authGuard],
    loadComponent: () => import('./features/enrollment/enrollments-manager/enrollments-manager').then(m => m.EnrollmentsManagerComponent)
  },
  {
    path: RoutePath.Users,
    data: { toolbarTitle: 'Usuarios' },
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./features/users/users-manager/users-manager').then(m => m.UsersManagerComponent)
  },
  //{ path: '', redirectTo: RoutePath.Dashboard, pathMatch: 'full' },
  //{ path: '**', redirectTo: RoutePath.Dashboard }
  { path: '', redirectTo: RoutePath.Login, pathMatch: 'full' },
  { path: '**', redirectTo: RoutePath.Login }
];
