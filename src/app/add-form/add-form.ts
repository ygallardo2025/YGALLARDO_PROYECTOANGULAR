import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Student } from '../shared/entities';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-form.html',
  styleUrls: ['./add-form.scss']
})
export class StudentFormComponent implements OnChanges {
  @Input() estudiante: Student | null = null;
  @Output() formSubmitted = new EventEmitter<Student>();
  @Output() cancel = new EventEmitter<void>();  // Opcional para cancelar edición

  studentForm: FormGroup;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.studentForm = this.fb.group({
      id: [null],
      dni: ['', [Validators.required, Validators.minLength(5)]],
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
      surname: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
      age: [null, [Validators.required, Validators.min(0), Validators.max(99)]],
      average: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['estudiante'] && this.estudiante) {
      this.studentForm.patchValue(this.estudiante);
    } else if (!this.estudiante) {
      this.studentForm.reset(); // Resetea si cambia el estudiante a null (modo añadir)
    }
  }

  getErrorMessage(controlName: string): string | null {
    const ctrl = this.studentForm.get(controlName);
    if (!ctrl || !ctrl.errors || !(ctrl.touched || ctrl.dirty)) return null;
    const errs = ctrl.errors;

    if (errs['required']) return 'Este campo es obligatorio.';
    if (errs['minlength']) return `Mínimo ${errs['minlength'].requiredLength} caracteres.`;
    if (errs['min']) return `El valor mínimo es ${errs['min'].min}.`;
    if (errs['max']) return `El valor máximo es ${errs['max'].max}.`;
    if (errs['pattern']) return 'Formato inválido.';
    return null;
  }

  onSubmit() {
    this.studentForm.markAllAsTouched();
    if (this.studentForm.valid) {
      this.formSubmitted.emit(this.studentForm.value);
      this.snackBar.open('Estudiante agregado correctamente', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top'
      });
      this.studentForm.reset();
    }
  }

  onReset() {
    this.studentForm.reset();
  }

  onCancelEdit() {
    this.cancel.emit();
    this.studentForm.reset();
  }
}
