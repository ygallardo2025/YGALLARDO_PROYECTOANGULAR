import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./features/home/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'students',
    loadComponent: () => import('./features/students/students-manager/students-manager').then(m => m.StudentsManagerComponent)
  },
  {
    path: 'cursos',
    loadComponent: () => import('./features/course/courses/courses').then(m => m.CoursesComponent)
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];
