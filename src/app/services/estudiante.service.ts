import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Estudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private readonly STORAGE_KEY = 'estudiantes';
  private estudiantes: Estudiante[] = [];
  private estudiantes$ = new BehaviorSubject<Estudiante[]>([]);
  private siguienteId = 1;

  constructor() {
    this.cargarDesdeStorage();
  }

  // ---- Lectura ----

  obtenerTodos(): Observable<Estudiante[]> {
    return this.estudiantes$.asObservable();
  }

  obtenerPorId(id: number): Estudiante | undefined {
    return this.estudiantes.find(e => e.id === id);
  }

  // ---- Crear ----

  crear(datos: Omit<Estudiante, 'id'>): void {
    const nuevoEstudiante: Estudiante = {
      ...datos,
      id: this.siguienteId++
    };

    this.estudiantes.push(nuevoEstudiante);
    this.actualizar();
  }

  // ---- Editar ----

  editar(estudianteActualizado: Estudiante): void {
    const index = this.estudiantes.findIndex(e => e.id === estudianteActualizado.id);

    if (index !== -1) {
      this.estudiantes[index] = estudianteActualizado;
      this.actualizar();
    }
  }

  // ---- Eliminar ----

  eliminar(id: number): void {
    this.estudiantes = this.estudiantes.filter(e => e.id !== id);
    this.actualizar();
  }

  // ---- Utilidades privadas ----

  private actualizar(): void {
    this.estudiantes$.next([...this.estudiantes]);
    this.guardarEnStorage();
  }

  private guardarEnStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.estudiantes));
    localStorage.setItem(this.STORAGE_KEY + '_id', String(this.siguienteId));
  }

  private cargarDesdeStorage(): void {
    const datos = localStorage.getItem(this.STORAGE_KEY);
    const idGuardado = localStorage.getItem(this.STORAGE_KEY + '_id');

    if (datos) {
      this.estudiantes = JSON.parse(datos);
    }

    this.siguienteId = idGuardado ? Number(idGuardado) : 1;
    this.estudiantes$.next([...this.estudiantes]);
  }
}