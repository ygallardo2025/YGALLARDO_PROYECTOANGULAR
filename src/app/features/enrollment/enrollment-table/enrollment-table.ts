import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { EnrollmentExpanded } from '../../../shared/entities';

@Component({
  selector: 'app-enrollment-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './enrollment-table.html',
  styleUrls: ['./enrollment-table.scss']
})
export class EnrollmentTableComponent {
  @Input() enrollments: EnrollmentExpanded[] = [];
  @Output() editar = new EventEmitter<EnrollmentExpanded>();
  @Output() eliminar = new EventEmitter<EnrollmentExpanded>();

  displayedColumns: string[] = ['student', 'course', 'actions'];

  onEdit(e: EnrollmentExpanded) { this.editar.emit(e); }
  onDelete(e: EnrollmentExpanded) { this.eliminar.emit(e); }
}
