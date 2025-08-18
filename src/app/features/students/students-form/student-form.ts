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
      id: [null], // <-- importante que exista en el form
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: [null, Validators.required],
      dni: ['', Validators.required],
      average: [null, Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['student'] && this.student) {
      // Cargar el objeto completo, incluido el id
      this.studentForm.reset(this.student);
    }
  }

  guardarCambios() {
    this.studentForm.markAllAsTouched();
    if (this.studentForm.valid) {
      // Asegurar que el id se conserve al editar; y sea 0 al crear (tu patrón actual)
      const value = this.studentForm.value as Student;
      const payload: Student = {
        ...value,
        id: this.student?.id ?? value.id ?? 0
      };

      this.save.emit(payload);
      this.studentForm.reset();
    }
  }
}