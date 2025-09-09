import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../core/auth/store/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  form!: FormGroup;                // 👈 declarar acá
  loading = false;
  errorMsg: string | null = null;

  constructor(
    private fb: FormBuilder,       // 👈 inyectado
    private store: Store
  ) {
    // 👇 inicializar aquí (ya existe this.fb)
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.errorMsg = null;
    this.loading = true;

    const { email, password } = this.form.value;
    this.store.dispatch(AuthActions.loginStart({ email, password }));
  }
}
