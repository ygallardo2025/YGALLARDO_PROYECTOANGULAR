import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Course } from '../../shared/entities';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './course-form.html',
  styleUrls: ['./course-form.scss']
})
export class CourseFormComponent implements OnChanges {
  @Input() course: Course | null = null;
  @Output() save = new EventEmitter<Course>();

  courseForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      id: [null],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['course'] && this.course) {
      this.courseForm.patchValue(this.course);
    }
  }

  getErrorMessage(controlName: string): string | null {
    const ctrl = this.courseForm.get(controlName);
    if (!ctrl || !ctrl.errors || !(ctrl.touched || ctrl.dirty)) return null;
    const errs = ctrl.errors;

    if (errs['required']) return 'Este campo es obligatorio.';
    return null;
  }

  onSubmit() {
    this.courseForm.markAllAsTouched();
    if (this.courseForm.valid) {
      this.save.emit(this.courseForm.value);
      this.courseForm.reset();
    }
  }

  onReset() {
    this.courseForm.reset();
  }
}

