import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard'; 
import { StudentsTableComponent } from './students-table/students-table';
import { StudentFormComponent } from './add-form/add-form';
import { CoursesManagerComponent } from './courses/courses-manager/courses-manager';

export const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'students', component: StudentsTableComponent },
  { path: 'add-student', component: StudentFormComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
  { path: 'cursos', component: CoursesManagerComponent }
];


