import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../shared/entities';
import { CoursesTableComponent } from '../courses-table/courses-table';
import { CourseFormComponent } from '../course-form/course-form';

@Component({
  selector: 'app-courses-manager',
  standalone: true,
  imports: [CommonModule, CoursesTableComponent, CourseFormComponent],
  templateUrl: './courses-manager.html',
  styleUrls: ['./courses-manager.scss']
})
export class CoursesManagerComponent {
  courses: Course[] = [];
  courseToEdit: Course | null = null;

  saveCourse(course: Course) {
    if (course.id) {
      const index = this.courses.findIndex(c => c.id === course.id);
      if (index !== -1) {
        this.courses[index] = { ...course };
        this.courses = [...this.courses];
      }
    } else {
      const newCourse = { ...course, id: this.generateNewId() };
      this.courses = [...this.courses, newCourse];
    }
    this.courseToEdit = null;
  }

  editCourse(course: Course) {
    this.courseToEdit = { ...course };
  }

  deleteCourse(course: Course) {
    this.courses = this.courses.filter(c => c.id !== course.id);
  }

  private generateNewId(): number {
    return this.courses.length > 0 ? Math.max(...this.courses.map(c => c.id)) + 1 : 1;
  }
}

