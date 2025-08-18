import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course, Student, Enrollment } from '../../../shared/entities';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './enrollment-form.html'
})
export class EnrollmentFormComponent implements OnChanges {
  @Input() enrollment: Enrollment | null = null;
  @Input() students: Student[] = [];
  @Input() courses: Course[] = [];
  @Output() save = new EventEmitter<Enrollment>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [null],
      // usamos null + required; así evitamos problemas de tipo string/number
      studentId: [null, [Validators.required]],
      courseId:  [null, [Validators.required]],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['enrollment'] && this.enrollment) {
      this.form.reset(this.enrollment); // incluye id, studentId, courseId
    }
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;

    const value = this.form.value as Enrollment;
    const payload: Enrollment = {
      ...value,
      id: this.enrollment?.id ?? value.id ?? 0, // conserva id al editar; 0 para crear
    };

    this.save.emit(payload);
    this.form.reset();
  }
}
