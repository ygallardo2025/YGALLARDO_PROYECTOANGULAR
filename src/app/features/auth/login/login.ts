import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { RoutePath } from '../../../shared/route-path';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  RoutePath = RoutePath;

  form!: FormGroup;                // 👈 declarar acá
  loading = false;
  errorMsg: string | null = null;

  constructor(
    private fb: FormBuilder,       // 👈 inyectado
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
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
    this.auth.login(email, password).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || `/${RoutePath.Dashboard}`;
        this.router.navigateByUrl(returnUrl);
      },
      error: (e) => {
        this.errorMsg = e?.message || 'No se pudo iniciar sesión';
        this.loading = false;
      }
    });
  }
}
