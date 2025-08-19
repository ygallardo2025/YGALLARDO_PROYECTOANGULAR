// src/app/features/course/courses/courses.ts
import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { Course } from '../../../shared/entities';
import { CoursesTableComponent } from '../courses-table/courses-table';
import { CourseFormComponent } from '../course-form/course-form';
import { CoursesService } from '../../course/services/courses.services';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CoursesTableComponent, CourseFormComponent],
  templateUrl: './courses.html'
})
export class CoursesComponent implements OnInit {
  // inyecciones con `inject`
  private svc = inject(CoursesService);
  private cdr = inject(ChangeDetectorRef);
  private auth = inject(AuthService);

  get isAdmin() { return this.auth.hasRole('admin'); }

  courses: Course[] = [];
  courseToEdit: Course | null = null;
  loading = false;
  errorMsg: string | null = null;

  async ngOnInit(): Promise<void> {
    await this.load();
  }

  private async load(): Promise<void> {
    this.loading = true;
    this.errorMsg = null;
    try {
      this.courses = await firstValueFrom(this.svc.getCourses());
    } catch (e: any) { // 👈 tipar `any` evita "Object is of type 'unknown'"
      this.errorMsg = e?.message ?? 'No se pudieron cargar los cursos';
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  newCourse(): void {
    if (!this.isAdmin) return;
    this.courseToEdit = { id: 0, title: '', description: '' };
    this.cdr.detectChanges();
  }

  editCourse(course: Course): void {
    if (!this.isAdmin) return;
    this.courseToEdit = { ...course };
    this.cdr.detectChanges();
  }

  async saveCourse(course: Course): Promise<void> {
    if (!this.isAdmin) return;
    try {
      if (!course.id || course.id === 0) {
        const { id: _omit, ...payload } = course; // no enviar id al crear
        await firstValueFrom(this.svc.addCourse(payload));
      } else {
        await firstValueFrom(this.svc.updateCourse(course));
      }
      await this.load();        // refresca la tabla
      this.courseToEdit = null; // cierra el formulario
    } catch (e: any) {
      this.errorMsg = e?.message ?? 'No se pudo guardar el curso';
    }
  }

  async deleteCourse(course: Course): Promise<void> {
    if (!this.isAdmin) return;
    try {
      await firstValueFrom(this.svc.deleteCourse(course.id));
      await this.load();
    } catch (e: any) {
      this.errorMsg = e?.message ?? 'No se pudo eliminar el curso';
    }
  }
}
