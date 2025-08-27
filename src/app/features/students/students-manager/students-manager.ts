// src/app/features/students/students-manager/students-manager.ts
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, firstValueFrom, Observable } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { Student } from '../../../shared/entities';
import { StudentsTableComponent } from '../students-table/students-table';
import { StudentFormComponent } from '../students-form/student-form';
import { StudentsService } from '../services/students.service';
import { AuthService } from '../../../core/auth/auth.service';

type Vm = {
  students: Student[];
  canEdit: boolean;
};

@Component({
  selector: 'app-students-manager',
  standalone: true,
  imports: [CommonModule, StudentsTableComponent, StudentFormComponent],
  templateUrl: './students-manager.html',
  styleUrls: ['./students-manager.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsManagerComponent implements OnInit {
  private refresh$ = new BehaviorSubject<void>(undefined);
  vm$!: Observable<Vm>;

  estudianteEditando: Student | null = null;

  constructor(
    private studentsService: StudentsService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.vm$ = combineLatest([
      this.refresh$.pipe(switchMap(() => this.studentsService.getStudents())),
      this.auth.currentUser$
    ]).pipe(
      map(([students, user]) => ({
        students,
        canEdit: !!user && user.role === 'admin',
      })),
      shareReplay(1)
    );
  }

  nuevoEstudiante(): void {
    this.estudianteEditando = { id: 0, name: '', surname: '', dni: '', age: 0, average: 0 };
  }

  onEditar(estudiante: Student): void {
    this.estudianteEditando = { ...estudiante };
  }

  async onGuardarEditado(estudiante: Student): Promise<void> {
    if (estudiante.id === 0) {
      await firstValueFrom(this.studentsService.addStudent(estudiante));
    } else {
      await firstValueFrom(this.studentsService.updateStudent(estudiante));
    }
    this.estudianteEditando = null;
    this.refresh$.next();
  }

  async onEliminar(estudiante: Student): Promise<void> {
    await firstValueFrom(this.studentsService.deleteStudent(estudiante.id));
    this.refresh$.next();
  }
}
