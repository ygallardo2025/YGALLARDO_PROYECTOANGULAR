import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { Student } from '../../../shared/entities';
import { StudentsTableComponent } from '../students-table/students-table';
import { StudentFormComponent } from '../../../features/students/students-form/student-form';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-students-manager',
  standalone: true,
  imports: [
    CommonModule,
    StudentsTableComponent,
    StudentFormComponent
  ],
  templateUrl: './students-manager.html',
  styleUrls: ['./students-manager.scss']
})
export class StudentsManagerComponent implements OnInit {
  estudianteEditando: Student | null = null;
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  students$ = this.studentsSubject.asObservable();

  constructor(private studentsService: StudentsService) {}

  async ngOnInit() {
    const students = await firstValueFrom(this.studentsService.getStudents());
    this.studentsSubject.next(students);
  }

  nuevoEstudiante() {
    this.estudianteEditando = {
      id: 0,
      name: '',
      surname: '',
      dni: '',
      age: 0,
      average: 0
    };
  }

  onEditar(estudiante: Student) {
    this.estudianteEditando = { ...estudiante };
  }

  async onGuardarEditado(estudiante: Student) {
    const current = this.studentsSubject.value;
    let updated: Student[];

    if (estudiante.id === 0) {
      const nuevo = await firstValueFrom(this.studentsService.addStudent(estudiante));
      updated = [...current, nuevo];
    } else {
      const actualizado = await firstValueFrom(this.studentsService.updateStudent(estudiante));
      updated = current.map(s => s.id === actualizado.id ? actualizado : s);
    }

    this.studentsSubject.next(updated);
    this.estudianteEditando = null;
  }

  async onEliminar(estudiante: Student) {
    await firstValueFrom(this.studentsService.deleteStudent(estudiante.id));
    const updated = this.studentsSubject.value.filter(s => s.id !== estudiante.id);
    this.studentsSubject.next(updated);
  }
}
