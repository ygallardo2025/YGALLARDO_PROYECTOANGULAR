import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from './toolbar/toolbar';
import { Navbar } from './navbar/navbar';
import { HttpClient } from '@angular/common/http';
import{ Student } from './shared/entities';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { StudentsTable } from './students-table/students-table';
import { AddFormComponent } from "./add-form/add-form";
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toolbar, Navbar, CommonModule, StudentsTable, AddFormComponent, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true
})
export class App {
addStudent(estudiante: Student) {
  if (estudiante.id) {
    // Modo edición
    const index = this.students.findIndex(s => s.id === estudiante.id);
    if (index !== -1) {
      this.students[index] = { ...estudiante };
      this.students = [...this.students]; // Forzar detección de cambios
    }
  } else {
    // Modo creación
    const nuevoEstudiante = { ...estudiante, id: this.generarNuevoId() };
    this.students = [...this.students, nuevoEstudiante];
  }

  this.estudianteParaEditar = null; // Limpiar después de guardar
}
  students: Student[] = [
    // tu lista inicial, por ejemplo
    { id: 1, name: 'Juan', surname: 'Pérez', age: 20, dni: '12345678', average: 8 },
    { id: 2, name: 'Ana', surname: 'Gómez', age: 21, dni: '23456789', average: 9 },
    { id: 3, name: 'Nahuel', surname: 'Suarez', age: 31, dni: '28759622', average: 8.5 },
    { id: 4, name: 'Pedro', surname: 'Soto', age: 18, dni: '34789622', average: 5.5 }
  ];

  estudianteParaEditar: Student | null = null;

  onGuardarEditado(estudiante: Student) {
  if (estudiante.id) {
    // modo edición
    const index = this.students.findIndex(s => s.id === estudiante.id);
    if (index !== -1) {
      this.students[index] = { ...estudiante };
      this.students = [...this.students]; // actualizar referencia para que Angular detecte el cambio
    }
  } else {
    // modo creación
    const nuevoEstudiante = { ...estudiante, id: this.generarNuevoId() };
    this.students = [...this.students, nuevoEstudiante];
  }

  this.estudianteParaEditar = null; // limpiar luego de guardar
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