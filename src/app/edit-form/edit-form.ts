import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../shared/entities';
import { StudentsTable } from "../students-table/students-table";

@Component({
  selector: 'app-edit-form',
  imports: [StudentsTable],
  templateUrl: './edit-form.html',
  styleUrl: './edit-form.scss'
})
export class EditForm {
  @Input() estudiante: Student | null = null;
  @Output() guardar = new EventEmitter<Student>();
  students: Student[] = [];
estudianteEditando: Student | null = null;;
onGuardarEditado: any;
onEditar: any;

  // Llama esto al guardar el formulario
  guardarCambios() {
    if (this.estudiante) {
      this.guardar.emit(this.estudiante);
    }
  }
}