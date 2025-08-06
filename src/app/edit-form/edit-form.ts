import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../shared/entities';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-form.html',
  styleUrl: './edit-form.scss'
})
export class EditForm {
  @Input() estudiante: Student | null = null;
  @Output() guardar = new EventEmitter<Student>();

  guardarCambios() {
    if (this.estudiante) {
      this.guardar.emit(this.estudiante);
    }
  }
}
