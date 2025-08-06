import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../../shared/entities';
import { BehaviorSubject } from 'rxjs';
import { CoursesTableComponent } from '../courses-table/courses-table';
import { CourseFormComponent } from '../course-form/course-form';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CoursesTableComponent, CourseFormComponent],
  templateUrl: './courses.html'
})
export class CoursesComponent {
  private coursesSubject = new BehaviorSubject<Course[]>([
    { id: 1, title: 'Angular', description: 'Curso de Angular' },
    { id: 2, title: 'React', description: 'Curso de React' }
  ]);
  courses$ = this.coursesSubject.asObservable();

  courseToEdit: Course | null = null;

  editCourse(course: Course) {
    this.courseToEdit = { ...course };
  }

  deleteCourse(course: Course) {
    const updated = this.coursesSubject.value.filter(c => c.id !== course.id);
    this.coursesSubject.next(updated);

    if (this.courseToEdit?.id === course.id) {
      this.courseToEdit = null;
    }
  }

  saveCourse(course: Course) {
    const current = this.coursesSubject.value;
    if (course.id) {
      // Editar
      const updated = current.map(c => c.id === course.id ? course : c);
      this.coursesSubject.next(updated);
    } else {
      // Agregar
      const newId = Math.max(...current.map(c => c.id ?? 0), 0) + 1;
      this.coursesSubject.next([...current, { ...course, id: newId }]);
    }

    this.courseToEdit = null;
  }
}
