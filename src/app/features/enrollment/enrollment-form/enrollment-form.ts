import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule, NgIf, NgForOf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course, Student, Enrollment } from '../../../shared/entities';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf, NgForOf],
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
      studentId: [null, [Validators.required]],
      courseId:  [null, [Validators.required]],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['enrollment'] && this.enrollment) {
      this.form.reset(this.enrollment);
    }
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;

    const value = this.form.value as Enrollment;
    const payload: Enrollment = {
      ...value,
      id: this.enrollment?.id ?? value.id ?? 0,
    };
    this.save.emit(payload);
    this.form.reset();
  }
}
