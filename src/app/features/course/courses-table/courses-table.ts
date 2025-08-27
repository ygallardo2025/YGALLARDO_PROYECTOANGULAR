import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Course } from '../../../shared/entities';

@Component({
  selector: 'app-courses-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './courses-table.html',
  styleUrls: ['./courses-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesTableComponent {
  @Input() courses: Course[] = [];
  @Input() canEdit = false;

  @Output() eliminar = new EventEmitter<Course>();
  @Output() editar = new EventEmitter<Course>();

  displayedColumns: string[] = ['title', 'description', 'actions'];

  eliminarCurso(curso: Course) { this.eliminar.emit(curso); }
  editarCurso(curso: Course) { this.editar.emit(curso); }
}
