import { Component } from '@angular/core';
import { Student } from '../../app/shared/entities';

@Component({
  selector: 'app-students-manager',
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
    this.estudianteEditando = { ...estudiante }; // clonamos para no modificar original directo
  }

  onGuardarEditado(estudianteActualizado: Student) {
    const index = this.students.findIndex(s => s.id === estudianteActualizado.id);
    if (index !== -1) {
      this.students[index] = { ...estudianteActualizado };
    }
    this.estudianteEditando = null;
  }
}
