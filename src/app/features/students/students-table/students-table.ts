import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../../shared/entities';
import { MatTableModule } from '@angular/material/table';
import { FullnamePipe } from '../../../shared/pipes/fullname-pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-students-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, FullnamePipe],
  templateUrl: './students-table.html',
  styleUrls: ['./students-table.scss']
})
export class StudentsTableComponent {
  @Input() students: Student[] | null = [];
  
  @Output() eliminar = new EventEmitter<Student>();
  @Output() editar = new EventEmitter<Student>();

  displayedColumns: string[] = ['fullname', 'age', 'dni', 'average', 'actions'];

  eliminarEstudiante(estudiante: Student) {
    this.eliminar.emit(estudiante);
  }

  editarEstudiante(estudiante: Student) {
    this.editar.emit(estudiante);
  }
}
