import { Component, OnInit, ChangeDetectorRef,inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { Course, Enrollment, EnrollmentExpanded, Student } from '../../../shared/entities';
import { EnrollmentService } from '../services/enrollment.service';
import { StudentsService } from '../../students/services/students.service';
import { CoursesService } from '../../course/services/courses.services';
import { EnrollmentTableComponent } from '../enrollment-table/enrollment-table';
import { EnrollmentFormComponent } from '../enrollment-form/enrollment-form';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-enrollments-manager',
  standalone: true,
  imports: [CommonModule, EnrollmentTableComponent, EnrollmentFormComponent],
  templateUrl: './enrollments-manager.html',
  styleUrls: ['./enrollments-manager.scss']
})
export class EnrollmentsManagerComponent implements OnInit {
  private auth = inject(AuthService);
  get isAdmin() { return this.auth.hasRole('admin'); }
  enrollments: EnrollmentExpanded[] = [];
  students: Student[] = [];
  courses: Course[] = [];
  editing: Enrollment | null = null;

  constructor(
    private enrollmentService: EnrollmentService,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.loadInitial();
  }

  private async loadInitial() {
    try {
      const [students, courses] = await Promise.all([
        firstValueFrom(this.studentsService.getStudents()),
        firstValueFrom(this.coursesService.getCourses())
      ]);
      this.students = students;
      this.courses = courses;
      await this.reload();
    } finally {
      this.cdr.detectChanges();
    }
  }

  private async reload() {
    const raw = await firstValueFrom(this.enrollmentService.getAll());
    this.enrollments = this.decorate(raw);   // join en cliente
    this.cdr.detectChanges();
  }

  private decorate(list: Enrollment[]): EnrollmentExpanded[] {
    return list.map(e => ({
      ...e,
      student: this.students.find(s => s.id === e.studentId),
      course:  this.courses.find(c => c.id === e.courseId),
    }));
  }

  newEnrollment() {
    this.editing = { id: 0, studentId: null as any, courseId: null as any };
    this.cdr.detectChanges();
  }

  editEnrollment(e: EnrollmentExpanded) {
    this.editing = { id: e.id, studentId: e.studentId, courseId: e.courseId };
    this.cdr.detectChanges();
  }

  async saveEnrollment(enrollment: Enrollment) {
    try {
      if (enrollment.id && enrollment.id !== 0) {
        await firstValueFrom(this.enrollmentService.update(enrollment));
      } else {
        const { id, ...payload } = enrollment as any; // no enviar id
        await firstValueFrom(this.enrollmentService.add(payload));
      }
      await this.reload(); // refresca tabla
    } finally {
      this.editing = null;
      this.cdr.detectChanges();
    }
  }

  async deleteEnrollment(e: EnrollmentExpanded) {
    await firstValueFrom(this.enrollmentService.delete(e.id));
    await this.reload();
  }
}