import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../../../shared/entities';
import { StudentsTableComponent } from '../students-table/students-table';
import { StudentFormComponent } from '../../../features/students/students-form/student-form';

@Component({
  selector: 'app-students-manager',
  standalone: true,
  imports: [
    CommonModule,
    StudentsTableComponent,
    StudentFormComponent
  ],
  templateUrl: './students-manager.html',
  styleUrls: ['./students-manager.scss']
})
export class StudentsManagerComponent {
  estudianteEditando: Student | null = null;

  private studentsSubject = new BehaviorSubject<Student[]>([
    { id: 1, name: 'Juan', surname: 'Pérez', age: 20, dni: '12345678', average: 8 },
    { id: 2, name: 'Ana', surname: 'Gómez', age: 21, dni: '23456789', average: 9 }
  ]);
  students$ = this.studentsSubject.asObservable();

  nuevoEstudiante() {
    this.estudianteEditando = {
      id: 0,
      name: '',
      surname: '',
      dni: '',
      age: 0,
      average: 0
    };
  }

  onEditar(estudiante: Student) {
    this.estudianteEditando = { ...estudiante };
  }

  onGuardarEditado(estudiante: Student) {
    const current = this.studentsSubject.value;
    const index = current.findIndex(s => s.id === estudiante.id);
    let updated: Student[];

    if (index !== -1) {
      updated = current.map(s => s.id === estudiante.id ? { ...estudiante } : s);
    } else {
      const nuevo = { ...estudiante, id: this.generarNuevoId(current) };
      updated = [...current, nuevo];
    }

    this.studentsSubject.next(updated);
    this.estudianteEditando = null;
  }

  onEliminar(estudiante: Student) {
    const updated = this.studentsSubject.value.filter(s => s.id !== estudiante.id);
    this.studentsSubject.next(updated);
  }

  private generarNuevoId(current: Student[]): number {
    return current.length > 0
      ? Math.max(...current.map(s => s.id)) + 1
      : 1;
  }
}