import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Pipe({
  name: 'errorMessage',
  pure: false // importante para que se actualice al cambiar el estado del formulario
})
export class ErrorMessagePipe implements PipeTransform {
  transform(form: FormGroup, controlName: string): string {
    const control = form.get(controlName);
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (control.hasError('minlength')) {
      return `El texto es demasiado corto (mínimo ${control.getError('minlength').requiredLength} caracteres)`;
    }
    if (control.hasError('maxlength')) {
      return `El texto es demasiado largo (máximo ${control.getError('maxlength').requiredLength} caracteres)`;
    }
    if (control.hasError('email')) {
      return 'Debe ser un correo electrónico válido';
    }

    return '';
  }
}
