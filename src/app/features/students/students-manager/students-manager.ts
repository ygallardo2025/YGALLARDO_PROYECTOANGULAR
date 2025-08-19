import { Component, OnInit ,ChangeDetectorRef,inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { Student } from '../../../shared/entities';
import { StudentsTableComponent } from '../students-table/students-table';
import { StudentFormComponent } from '../students-form/student-form';
import { StudentsService } from '../services/students.service';
import { AuthService } from '../../../core/auth/auth.service';


@Component({
  selector: 'app-students-manager',
  standalone: true,
  imports: [CommonModule, StudentsTableComponent, StudentFormComponent],
  templateUrl: './students-manager.html',
  styleUrls: ['./students-manager.scss']
})
export class StudentsManagerComponent implements OnInit {
  private auth = inject(AuthService);

  students: Student[] = [];
  estudianteEditando: Student | null = null;

  constructor(
    private studentsService: StudentsService,
    private cdr: ChangeDetectorRef
  ) {}

  get isAdmin(): boolean { return this.auth.hasRole('admin'); } // 👈

  async ngOnInit() {
    await this.cargar();
  }
  private async cargar() {
    this.students = await firstValueFrom(this.studentsService.getStudents());
    this.cdr.detectChanges();
  }

  nuevoEstudiante() {
    if (!this.isAdmin) return; // defensa extra
    this.estudianteEditando = { id: 0, name: '', surname: '', dni: '', age: 0, average: 0 };
    this.cdr.detectChanges();
  }

  onEditar(estudiante: Student) {
    if (!this.isAdmin) return;
    this.estudianteEditando = { ...estudiante };
    this.cdr.detectChanges();
  }

  async onGuardarEditado(estudiante: Student) {
    if (!this.isAdmin) return;
    if (estudiante.id === 0) {
      const creado = await firstValueFrom(this.studentsService.addStudent(estudiante));
      this.students = [...this.students, creado];
    } else {
      const actualizado = await firstValueFrom(this.studentsService.updateStudent(estudiante));
      this.students = this.students.map(s => s.id === actualizado.id ? actualizado : s);
    }
    this.estudianteEditando = null;
    this.cdr.detectChanges();
  }

  async onEliminar(estudiante: Student) {
    if (!this.isAdmin) return;
    await firstValueFrom(this.studentsService.deleteStudent(estudiante.id));
    this.students = this.students.filter(s => s.id !== estudiante.id);
    this.cdr.detectChanges();
  }
}