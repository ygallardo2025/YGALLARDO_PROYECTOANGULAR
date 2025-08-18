import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../../shared/entities';
import { CoursesTableComponent } from '../courses-table/courses-table';
import { CourseFormComponent } from '../course-form/course-form';
import { CoursesService } from '../services/courses.services';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CoursesTableComponent, CourseFormComponent],
  templateUrl: './courses.html'
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  courseToEdit: Course | null = null;

  constructor(
    private coursesService: CoursesService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.load();
  }

  private async load() {
    try {
      this.courses = await firstValueFrom(this.coursesService.getCourses());
    } finally {
      this.cdr.detectChanges(); // ← zoneless: refrescar vista
    }
  }

  // Abrir formulario para crear
  newCourse() {
    this.courseToEdit = { id: 0, title: '', description: '' };
    this.cdr.detectChanges();
  }

  // Abrir formulario para editar
  editCourse(course: Course) {
    this.courseToEdit = { ...course };
    this.cdr.detectChanges();
  }

  // Guardar (crear o editar)
  async saveCourse(course: Course) {
    try {
      if (course.id && course.id !== 0) {
        // EDITAR
        const updated = await firstValueFrom(this.coursesService.updateCourse(course));
        this.courses = this.courses.map(c => c.id === updated.id ? updated : c);
      } else {
        // CREAR → NO enviar id para que json-server lo genere
        const { id, ...payload } = course as any;
        const created = await firstValueFrom(this.coursesService.addCourse(payload));
        this.courses = [...this.courses, created];
      }
    } finally {
      this.courseToEdit = null;
      this.cdr.detectChanges();
    }
  }

  // Eliminar
  async deleteCourse(course: Course) {
    await firstValueFrom(this.coursesService.deleteCourse(course.id));
    this.courses = this.courses.filter(c => c.id !== course.id);
    if (this.courseToEdit?.id === course.id) this.courseToEdit = null;
    this.cdr.detectChanges();
  }
}