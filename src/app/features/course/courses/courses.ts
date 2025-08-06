import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../../shared/entities';
import { CoursesTableComponent } from '../courses-table/courses-table';
import { CourseFormComponent } from '../course-form/course-form';
import { CoursesService } from '../services/courses.services';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CoursesTableComponent, CourseFormComponent],
  templateUrl: './courses.html'
})
export class CoursesComponent implements OnInit {
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$ = this.coursesSubject.asObservable();

  courseToEdit: Course | null = null;

  constructor(private coursesService: CoursesService) {}

  async ngOnInit() {
    const courses = await firstValueFrom(this.coursesService.getCourses());
    this.coursesSubject.next(courses);
  }

  async saveCourse(course: Course) {
    if (course.id) {
      const updated = await firstValueFrom(this.coursesService.updateCourse(course));
      const current = this.coursesSubject.value.map(c =>
        c.id === updated.id ? updated : c
      );
      this.coursesSubject.next(current);
    } else {
      const added = await firstValueFrom(this.coursesService.addCourse(course));
      this.coursesSubject.next([...this.coursesSubject.value, added]);
    }

    this.courseToEdit = null;
  }

  editCourse(course: Course) {
    this.courseToEdit = { ...course };
  }

  async deleteCourse(course: Course) {
    await firstValueFrom(this.coursesService.deleteCourse(course.id));
    this.coursesSubject.next(
      this.coursesSubject.value.filter(c => c.id !== course.id)
    );

    if (this.courseToEdit?.id === course.id) {
      this.courseToEdit = null;
    }
  }
}
