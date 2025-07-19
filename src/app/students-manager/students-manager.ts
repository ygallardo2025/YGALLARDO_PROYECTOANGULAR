import { Component } from '@angular/core';
import { StudentsTable } from '../students-table/students-table';
import { EditForm } from '../edit-form/edit-form';
import { CommonModule } from '@angular/common';
import { Student } from '../shared/entities';  // importa la entidad Student

@Component({
  selector: 'app-students-manager',
  templateUrl: './students-manager.html',
  imports: [CommonModule, StudentsTable, EditForm],
  standalone: true
})
export class StudentsManagerComponent {
  students: Student[] = [
    // aquí pones tu lista de estudiantes inicial
  ];

  estudianteEditando: Student | null = null;

  onEditar(estudiante: Student) {
    this.estudianteEditando = { ...estudiante }; // clonar para editar sin mutar original
  }

  onGuardarEditado(estudianteActualizado: Student) {
    const index = this.students.findIndex(s => s.id === estudianteActualizado.id);
    if (index !== -1) {
      this.students[index] = { ...estudianteActualizado };
    }
    this.estudianteEditando = null; // cerrar formulario edición
  }
}
