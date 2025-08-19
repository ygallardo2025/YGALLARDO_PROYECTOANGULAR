import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../entities'; // Asegúrate de usar la ruta correcta

@Pipe({
  name: 'fullname',
  standalone: true, // para poder importarlo en componentes standalone
})
export class FullnamePipe implements PipeTransform {
  transform(student: Student | null | undefined): string {
    if (!student) return '';
    const name = student.name ?? '';
    const surname = student.surname ?? '';
    return `${name} ${surname}`.trim();
  }
}