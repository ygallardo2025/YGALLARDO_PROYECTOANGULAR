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
      this.cdr.detectChanges(); // zoneless: refresca la vista
    }
  }

  newCourse() {
    this.courseToEdit = { id: 0, title: '', description: '' };
    this.cdr.detectChanges();
  }

  editCourse(course: Course) {
    this.courseToEdit = { ...course };
    this.cdr.detectChanges();
  }

  async saveCourse(course: Course) {
    try {
      if (course.id && course.id !== 0) {
        // EDITAR
        const updated = await firstValueFrom(this.coursesService.updateCourse(course));
        this.courses = this.courses.map(c => c.id === updated.id ? updated : c);
      } else {
        // CREAR → NO enviar id (MockAPI lo genera)
        const { id, ...payload } = course as any;
        const created = await firstValueFrom(this.coursesService.addCourse(payload));
        this.courses = [...this.courses, created];
      }
    } finally {
      this.courseToEdit = null;
      this.cdr.detectChanges();
    }
  }

  async deleteCourse(course: Course) {
    await firstValueFrom(this.coursesService.deleteCourse(course.id));
    this.courses = this.courses.filter(c => c.id !== course.id);
    this.cdr.detectChanges();
  }
}