import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { Student } from '../../../shared/entities';
import { StudentsTableComponent } from '../students-table/students-table';
import { StudentFormComponent } from '../students-form/student-form';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-students-manager',
  standalone: true,
  imports: [CommonModule, StudentsTableComponent, StudentFormComponent],
  templateUrl: './students-manager.html',
  styleUrls: ['./students-manager.scss']
})
export class StudentsManagerComponent implements OnInit {
  students: Student[] = [];
  estudianteEditando: Student | null = null;

  constructor(
    private studentsService: StudentsService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.cargar();
  }

  private async cargar() {
    try {
      this.students = await firstValueFrom(this.studentsService.getStudents());
    } finally {
      this.cdr.detectChanges();      // 👈 refresca la vista
    }
  }

  nuevoEstudiante() {
    this.estudianteEditando = { id: 0, name: '', surname: '', dni: '', age: 0, average: 0 };
    this.cdr.detectChanges();        // 👈 muestra el form de inmediato
  }

  onEditar(estudiante: Student) {
    this.estudianteEditando = { ...estudiante };
    this.cdr.detectChanges();
  }

  async onGuardarEditado(estudiante: Student) {
  if (estudiante.id === 0) {
    // CREAR → no enviar id, que lo genere json-server
    const { id, ...payload } = estudiante as any;
    const creado = await firstValueFrom(this.studentsService.addStudent(payload));
    this.students = [...this.students, creado];
  } else {
    // EDITAR
    const actualizado = await firstValueFrom(this.studentsService.updateStudent(estudiante));
    this.students = this.students.map(s => s.id === actualizado.id ? actualizado : s);
  }

  this.estudianteEditando = null;
  this.cdr.detectChanges();
  }

  async onEliminar(estudiante: Student) {
  // (Opcional) Confirmación
  // if (!confirm(`¿Eliminar a ${estudiante.name} ${estudiante.surname}?`)) return;

  try {
    await firstValueFrom(this.studentsService.deleteStudent(estudiante.id));
    this.students = this.students.filter(s => s.id !== estudiante.id);
  } catch (e) {
    console.error('Error eliminando estudiante', e);
  } finally {
    this.cdr.detectChanges(); // ← necesario con provideZonelessChangeDetection
  }
}
}