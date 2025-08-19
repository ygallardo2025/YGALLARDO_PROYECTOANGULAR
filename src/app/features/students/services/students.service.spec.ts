// src/app/features/students/services/students.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { StudentsService } from './students.service';
import { Student } from '../../../shared/entities';

describe('StudentsService', () => {
  let service: StudentsService;
  let httpMock: HttpTestingController;

  // Ajusta si usas json-server:
  // const API = 'http://localhost:3000/students';
  const API = 'https://68a28b69c5a31eb7bb1d235a.mockapi.io/Students';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        StudentsService
      ]
    });

    service = TestBed.inject(StudentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('debe obtener estudiantes (GET)', (done) => {
    const mock: Student[] = [
      { id: 1, name: 'Juan', surname: 'Pérez', age: 20, dni: '123', average: 8 },
      { id: 2, name: 'Ana', surname: 'Gómez', age: 21, dni: '456', average: 9 },
    ];

    service.getStudents().subscribe((res) => {
      expect(res.length).toBe(2);
      expect(res[0].name).toBe('Juan');
      done();
    });

    const req = httpMock.expectOne(API);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('debe crear estudiante (POST)', (done) => {
    const nuevo: Student = { id: 0, name: 'Nuevo', surname: 'Alumno', age: 18, dni: '999', average: 7 };
    const creado: Student = { ...nuevo, id: 3 };

    service.addStudent(nuevo).subscribe((res) => {
      expect(res.id).toBe(3);
      expect(res.name).toBe('Nuevo');
      done();
    });

    const req = httpMock.expectOne(API);
    expect(req.request.method).toBe('POST');
    // En Jasmine usamos objectContaining en lugar de toMatchObject
    expect(req.request.body).toEqual(jasmine.objectContaining({
      name: 'Nuevo',
      surname: 'Alumno',
      age: 18,
      dni: '999',
      average: 7
    }));
    req.flush(creado);
  });

  it('debe actualizar estudiante (PUT)', (done) => {
    const actualizado: Student = { id: 2, name: 'Ana María', surname: 'Gómez', age: 21, dni: '456', average: 9 };

    service.updateStudent(actualizado).subscribe((res) => {
      expect(res.name).toBe('Ana María');
      done();
    });

    const req = httpMock.expectOne(`${API}/${actualizado.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(jasmine.objectContaining({
      id: 2,
      name: 'Ana María',
      surname: 'Gómez',
      age: 21,
      dni: '456',
      average: 9
    }));
    req.flush(actualizado);
  });

  it('debe eliminar estudiante (DELETE)', (done) => {
    const id = 2;

    service.deleteStudent(id).subscribe((res) => {
      expect(res).toBeUndefined();
      done();
    });

    const req = httpMock.expectOne(`${API}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('debe propagar un error HTTP', (done) => {
    service.getStudents().subscribe({
      next: () => fail('debería fallar'),
      error: (err) => {
        expect(err.status).toBe(500);
        expect(err.statusText).toBe('Server Error');
        done();
      }
    });

    const req = httpMock.expectOne(API);
    expect(req.request.method).toBe('GET');
    req.flush({ message: 'Fallo interno' }, { status: 500, statusText: 'Server Error' });
  });
});
