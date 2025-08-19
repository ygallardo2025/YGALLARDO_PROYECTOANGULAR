import { FullnamePipe } from './fullname-pipe';
import { Student } from '../entities';

describe('FullnamePipe', () => {
  it('debe concatenar name + surname cuando recibe un Student', () => {
    const pipe = new FullnamePipe();
    const s: Student = {
      id: 1,
      name: 'Ana',
      surname: 'Gómez',
      age: 20,
      dni: '123',
      average: 8,
    };

    expect(pipe.transform(s)).toBe('Ana Gómez');
  });

  it('debe manejar null/undefined devolviendo string vacío', () => {
    const pipe = new FullnamePipe();
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
  });
});
