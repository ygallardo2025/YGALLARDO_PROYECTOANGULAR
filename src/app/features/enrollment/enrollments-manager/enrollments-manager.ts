import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { Course, Enrollment, EnrollmentExpanded, Student } from '../../../shared/entities';
import { EnrollmentService } from '../services/enrollment.service';
import { StudentsService } from '../../students/services/students.service';
import { CoursesService } from '../../course/services/courses.services';
import { EnrollmentTableComponent } from '../enrollment-table/enrollment-table';
import { EnrollmentFormComponent } from '../enrollment-form/enrollment-form';

@Component({
  selector: 'app-enrollments-manager',
  standalone: true,
  imports: [CommonModule, EnrollmentTableComponent, EnrollmentFormComponent],
  templateUrl: './enrollments-manager.html',
  styleUrls: ['./enrollments-manager.scss']
})
export class EnrollmentsManagerComponent implements OnInit {
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

  /** Carga alumnos y cursos, y luego recarga inscripciones (expand) */
  private async loadInitial() {
    try {
      const [students, courses] = await Promise.all([
        firstValueFrom(this.studentsService.getStudents()),
        firstValueFrom(this.coursesService.getCourses())
      ]);
      this.students = students;
      this.courses = courses;

      await this.reload(); // trae enrollments con _expand para nombres
    } finally {
      this.cdr.detectChanges(); // zoneless
    }
  }

  /** Recarga la lista de inscripciones expandida (student + course) */
  private async reload() {
    this.enrollments = await firstValueFrom(this.enrollmentService.getAll(true));
    this.cdr.detectChanges(); // zoneless
  }

  newEnrollment() {
    this.editing = { id: 0, studentId: 0, courseId: 0 };
    this.cdr.detectChanges();
  }

  editEnrollment(e: EnrollmentExpanded) {
    this.editing = { id: e.id, studentId: e.studentId, courseId: e.courseId };
    this.cdr.detectChanges();
  }

  /** Opción A: guardar y luego recargar la lista con expand */
  async saveEnrollment(enrollment: Enrollment) {
    try {
      if (enrollment.id && enrollment.id !== 0) {
        await firstValueFrom(this.enrollmentService.update(enrollment));
      } else {
        // Crear: no enviar id para que json-server lo genere
        const { id, ...payload } = enrollment as any;
        await firstValueFrom(this.enrollmentService.add(payload));
      }
      await this.reload();
    } finally {
      this.editing = null;
      this.cdr.detectChanges(); // zoneless
    }
  }

  /** Eliminar y recargar para reflejar cambios */
  async deleteEnrollment(e: EnrollmentExpanded) {
    await firstValueFrom(this.enrollmentService.delete(e.id));
    await this.reload();
  }
}
