import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Course } from '../../../shared/entities';
import { CoursesTableComponent } from '../courses-table/courses-table';
import { CourseFormComponent } from '../course-form/course-form';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CoursesTableComponent, CourseFormComponent],
  templateUrl: './courses.html',
  styleUrls: ['./courses.scss']
})
export class CoursesComponent {
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$ = this.coursesSubject.asObservable();
  courseToEdit: Course | null = null;

  saveCourse(course: Course) {
    const current = this.coursesSubject.value;
    let updated: Course[];
    if (course.id) {
      const index = current.findIndex(c => c.id === course.id);
      if (index !== -1) {
        updated = current.map(c => (c.id === course.id ? { ...course } : c));
      } else {
        updated = current;
      }
    } else {
      const newCourse = { ...course, id: this.generateNewId(current) };
      updated = [...current, newCourse];
    }
    this.coursesSubject.next(updated);
    this.courseToEdit = null;
  }

  editCourse(course: Course) {
    this.courseToEdit = { ...course };
  }

  deleteCourse(course: Course) {
    const updated = this.coursesSubject.value.filter(c => c.id !== course.id);
    this.coursesSubject.next(updated);
  }

  private generateNewId(current: Course[]): number {
    return current.length > 0 ? Math.max(...current.map(c => c.id)) + 1 : 1;
  }
}

