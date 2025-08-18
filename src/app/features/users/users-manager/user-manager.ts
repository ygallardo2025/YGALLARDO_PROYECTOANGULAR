import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { User, Role } from '../../../shared/entities';
import { UsersService } from '../../users/services/users.service';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-manager',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users-manager.html',
  styleUrls: ['./users-manager.scss']
})
export class UsersManagerComponent implements OnInit {
  users: User[] = [];
  editing: User | null = null;

  form = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['user' as Role, Validators.required],
    password: [''] // solo al crear si quieres
  });

  constructor(private svc: UsersService, private cdr: ChangeDetectorRef, private fb: FormBuilder) {}

  async ngOnInit() { await this.reload(); }

  private async reload() {
    this.users = await firstValueFrom(this.svc.getAll());
    this.cdr.detectChanges();
  }

  newUser() {
    this.editing = { id: 0, name: '', email: '', role: 'user', token: '' };
    this.form.reset({ id: 0, name: '', email: '', role: 'user', password: '' });
    this.cdr.detectChanges();
  }

  editUser(u: User) {
    this.editing = { ...u };
    this.form.reset({ id: u.id, name: u.name, email: u.email, role: u.role, password: '' });
    this.cdr.detectChanges();
  }

  async save() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const v = this.form.value;
    try {
      if (v.id && v.id !== 0) {
        const updated = await firstValueFrom(this.svc.update({ id: v.id, name: v.name!, email: v.email!, role: v.role as Role, token: '' }));
        this.users = this.users.map(x => x.id === updated.id ? updated : x);
      } else {
        const created = await firstValueFrom(this.svc.add({ name: v.name!, email: v.email!, role: v.role as Role, password: v.password || undefined }));
        this.users = [...this.users, created];
      }
    } finally {
      this.editing = null;
      this.cdr.detectChanges();
    }
  }

  async remove(u: User) {
    await firstValueFrom(this.svc.delete(u.id));
    this.users = this.users.filter(x => x.id !== u.id);
    this.cdr.detectChanges();
  }
}
