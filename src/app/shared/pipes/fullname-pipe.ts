import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../entities'; // Asegúrate de usar la ruta correcta

@Pipe({
  name: 'fullname',
  standalone: true // ← importante si estás usando standalone components
})
export class FullnamePipe implements PipeTransform {

  transform(student: Student): string {
    return `${student.name} ${student.surname}`;
  }

}
