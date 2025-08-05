import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from './toolbar/toolbar';
import { Navbar } from './navbar/navbar';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { StudentsTable } from '../feature/student/students-table/students-table';
import { StudentFormComponent } from "./add-form/add-form"; // corregido path
import { Student } from './shared/entities';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Toolbar,
    Navbar,
    CommonModule,
    StudentsTable,
    StudentFormComponent,
    HttpClientModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'] // corregido aquí
})
export class App {
  students: Student[] = [
    { id: 1, name: 'Juan', surname: 'Pérez', age: 20, dni: '12345678', average: 8 },
    { id: 2, name: 'Ana', surname: 'Gómez', age: 21, dni: '23456789', average: 9 },
    { id: 3, name: 'Nahuel', surname: 'Suarez', age: 31, dni: '28759622', average: 8.5 },
    { id: 4, name: 'Pedro', surname: 'Soto', age: 18, dni: '34789622', average: 5.5 }
  ];

  estudianteParaEditar: Student | null = null;

  addStudent(estudiante: Student) {
    if (estudiante.id) {
      const index = this.students.findIndex(s => s.id === estudiante.id);
      if (index !== -1) {
        this.students[index] = { ...estudiante };
        this.students = [...this.students];
      }
    } else {
      const nuevoEstudiante = { ...estudiante, id: this.generarNuevoId() };
      this.students = [...this.students, nuevoEstudiante];
    }
    this.estudianteParaEditar = null;
  }

  onGuardarEditado(estudiante: Student) {
    this.addStudent(estudiante);
  }

  editarEstudiante(estudiante: Student) {
    this.estudianteParaEditar = { ...estudiante };
  }

  generarNuevoId(): number {
    return this.students.length > 0
      ? Math.max(...this.students.map(s => s.id)) + 1
      : 1;
  }

  eliminarEstudiante(estudiante: Student) {
    this.students = this.students.filter(s => s.id !== estudiante.id);
  }
}
