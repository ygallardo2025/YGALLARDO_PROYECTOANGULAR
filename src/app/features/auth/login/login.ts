import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
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
  loading = false;
  errorMsg: string | null = null;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.errorMsg = null;
    this.loading = true;

    const email = this.form.value.email!;
    const password = this.form.value.password!;
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
