import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../../shared/entities';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-form.html',
  styleUrls: ['./student-form.scss']
})
export class StudentFormComponent implements OnChanges {
  @Input() student: Student | null = null;
  @Output() save = new EventEmitter<Student>();

  studentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: [null, Validators.required],
      dni: ['', Validators.required],
      average: [null, Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['student'] && this.student) {
      this.studentForm.patchValue(this.student);
    }
  }

  guardarCambios() {
    this.studentForm.markAllAsTouched();
    if (this.studentForm.valid) {
      this.save.emit(this.studentForm.value);
      this.studentForm.reset();
    }
  }
}
