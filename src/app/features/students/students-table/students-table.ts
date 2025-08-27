import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { Student } from '../../../shared/entities';
import { FullnamePipe } from '../../../shared/pipes/fullname-pipe';

@Component({
  selector: 'app-students-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, FullnamePipe],
  templateUrl: './students-table.html',
  styleUrls: ['./students-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsTableComponent {
  @Input() students: Student[] = [];
  @Input() canEdit = false;

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
