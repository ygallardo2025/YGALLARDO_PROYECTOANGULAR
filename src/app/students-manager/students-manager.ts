import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student } from '../../app/shared/entities';
import { StudentFormComponent } from '../add-form/add-form';
import { StudentsTableComponent } from "../students-table/students-table";
import { EditForm } from "../edit-form/edit-form"; 
@Component({
  selector: 'app-students-manager',
  standalone: true,
  imports: [
    CommonModule,
    //StudentFormComponent,
    StudentsTableComponent,
    EditForm
],
  templateUrl: './students-manager.html',
  styleUrls: ['./students-manager.scss']
})
export class StudentsManagerComponent {
  students: Student[] = [
    { id: 1, name: 'Juan', surname: 'Pérez', age: 20, dni: '12345678', average: 8 },
    { id: 2, name: 'Ana', surname: 'Gómez', age: 21, dni: '23456789', average: 9 }
  ];

  estudianteEditando: Student | null = null;

  onEditar(estudiante: Student) {
    this.estudianteEditando = { ...estudiante };
  }

  onGuardarEditado(estudiante: Student) {
    const index = this.students.findIndex(s => s.id === estudiante.id);
    if (index !== -1) {
      this.students[index] = { ...estudiante };
    } else {
      const nuevo = { ...estudiante, id: this.generarNuevoId() };
      this.students.push(nuevo);
    }
    this.estudianteEditando = null;
  }

  onEliminar(estudiante: Student) {
    this.students = this.students.filter(s => s.id !== estudiante.id);
  }

  onCancelar() {
    this.estudianteEditando = null;
  }

  generarNuevoId(): number {
    return this.students.length > 0
      ? Math.max(...this.students.map(s => s.id)) + 1
      : 1;
  }
}
