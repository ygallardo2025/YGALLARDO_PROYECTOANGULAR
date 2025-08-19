import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Course } from '../../../shared/entities';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './courses-table.html',
  styleUrls: ['./courses-table.scss']
})
export class CoursesTableComponent {
  @Input() courses: Course[] = [];
  @Input() canEdit = false;

  @Output() eliminar = new EventEmitter<Course>();
  @Output() editar = new EventEmitter<Course>();

  private readonly baseColumns = ['title', 'description'];
  get displayedColumns(): string[] {
    return this.canEdit ? [...this.baseColumns, 'actions'] : this.baseColumns;
  }

  eliminarCurso(curso: Course) { this.eliminar.emit(curso); }
  editarCurso(curso: Course) { this.editar.emit(curso); }
}