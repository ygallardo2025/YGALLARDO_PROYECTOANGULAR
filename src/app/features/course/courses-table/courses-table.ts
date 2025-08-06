import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Course } from '../../../shared/entities';

@Component({
  selector: 'app-courses-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './courses-table.html',
  styleUrls: ['./courses-table.scss']
})
export class CoursesTableComponent {
  @Input() courses: Course[] = [];

  displayedColumns: string[] = ['title', 'description', 'actions'];

  @Output() eliminar = new EventEmitter<Course>();
  @Output() editar = new EventEmitter<Course>();

  eliminarCurso(curso: Course) {
    this.eliminar.emit(curso);
  }

  editarCurso(curso: Course) {
    this.editar.emit(curso);
  }
}

