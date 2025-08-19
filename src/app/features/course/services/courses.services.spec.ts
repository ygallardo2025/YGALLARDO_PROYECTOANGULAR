import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { CoursesService } from './courses.services';
import { Course } from '../../../shared/entities';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpMock: HttpTestingController;

  const API = 'https://68a28b69c5a31eb7bb1d235a.mockapi.io/Courses';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        CoursesService
      ]
    });

    service = TestBed.inject(CoursesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('debe obtener cursos (GET)', (done) => {
    const apiResp = [{ id: '1', title: 'Angular', description: 'desc' }]; // id como string

    service.getCourses().subscribe((res) => {
      expect(res.length).toBe(1);
      expect(res[0].id).toBe(1);         // mapeado a number por fromApi
      expect(res[0].title).toBe('Angular');
      done();
    });

    const req = httpMock.expectOne(API);
    expect(req.request.method).toBe('GET');
    req.flush(apiResp);
  });

  it('debe crear curso (POST)', (done) => {
    const nuevo: Omit<Course, 'id'> = { title: 'Nuevo', description: 'Curso nuevo' };
    const creadoApi = { id: '3', title: 'Nuevo', description: 'Curso nuevo' }; // API devuelve string

    service.addCourse(nuevo).subscribe((res) => {
      expect(res.id).toBe(3);            // mapeado a number
      expect(res.title).toBe('Nuevo');
      done();
    });

    const req = httpMock.expectOne(API);
    expect(req.request.method).toBe('POST');
    // En Jasmine usamos objectContaining
    expect(req.request.body).toEqual(jasmine.objectContaining({
      title: 'Nuevo',
      description: 'Curso nuevo'
      // sin id al crear
    }));
    req.flush(creadoApi);
  });

  it('debe actualizar curso (PUT)', (done) => {
    const actualizado: Course = { id: 2, title: 'React Avanzado', description: 'desc2' };
    const actualizadoApi = { id: '2', title: 'React Avanzado', description: 'desc2' };

    service.updateCourse(actualizado).subscribe((res) => {
      expect(res.id).toBe(2);
      expect(res.title).toBe('React Avanzado');
      done();
    });

    const req = httpMock.expectOne(`${API}/2`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(jasmine.objectContaining({
      id: '2', // nuestro servicio manda id como string en toApi
      title: 'React Avanzado',
      description: 'desc2'
    }));
    req.flush(actualizadoApi);
  });

  it('debe eliminar curso (DELETE)', (done) => {
    service.deleteCourse(2).subscribe((res) => {
      expect(res).toBeUndefined(); // void
      done();
    });

    const req = httpMock.expectOne(`${API}/2`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('debe propagar error HTTP', (done) => {
    service.getCourses().subscribe({
      next: () => fail('debería fallar'),
      error: (err) => {
        expect(err.status).toBe(500);
        expect(err.statusText).toBe('Server Error');
        done();
      }
    });

    const req = httpMock.expectOne(API);
    expect(req.request.method).toBe('GET');
    req.flush({ message: 'Fallo' }, { status: 500, statusText: 'Server Error' });
  });
});
