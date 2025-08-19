// src/app/features/enrollment/enrollment-table/enrollment-table.ts
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
  @Input() canEdit = false;

  @Output() editar = new EventEmitter<EnrollmentExpanded>();
  @Output() eliminar = new EventEmitter<EnrollmentExpanded>();

  private readonly baseColumns = ['student', 'course'];
  get displayedColumns(): string[] {
    return this.canEdit ? [...this.baseColumns, 'actions'] : this.baseColumns;
  }

  onEdit(e: EnrollmentExpanded) { this.editar.emit(e); }
  onDelete(e: EnrollmentExpanded) { this.eliminar.emit(e); }
}
