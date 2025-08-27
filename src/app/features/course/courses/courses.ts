// src/app/features/course/courses/courses.ts
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, firstValueFrom, Observable } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { Course } from '../../../shared/entities';
import { CoursesTableComponent } from '../courses-table/courses-table';
import { CourseFormComponent } from '../course-form/course-form';
import { CoursesService } from '../services/courses.services';
import { AuthService } from '../../../core/auth/auth.service';

type Vm = {
  courses: Course[];
  canEdit: boolean;
};

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CoursesTableComponent, CourseFormComponent],
  templateUrl: './courses.html',
  styleUrls: ['./courses.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit {
  private refresh$ = new BehaviorSubject<void>(undefined);
  vm$!: Observable<Vm>;

  courseToEdit: Course | null = null;

  constructor(
    private coursesService: CoursesService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.vm$ = combineLatest([
      this.refresh$.pipe(switchMap(() => this.coursesService.getCourses())),
      this.auth.currentUser$
    ]).pipe(
      map(([courses, user]) => ({
        courses,
        canEdit: !!user && user.role === 'admin',
      })),
      shareReplay(1)
    );
  }

  newCourse(): void {
    this.courseToEdit = { id: 0, title: '', description: '' };
  }

  editCourse(course: Course): void {
    this.courseToEdit = { ...course };
  }

  async saveCourse(course: Course): Promise<void> {
    if (course.id === 0) {
      await firstValueFrom(this.coursesService.addCourse({ title: course.title, description: course.description }));
    } else {
      await firstValueFrom(this.coursesService.updateCourse(course));
    }
    this.courseToEdit = null;
    this.refresh$.next();
  }

  async deleteCourse(course: Course): Promise<void> {
    await firstValueFrom(this.coursesService.deleteCourse(course.id));
    this.refresh$.next();
  }
}
