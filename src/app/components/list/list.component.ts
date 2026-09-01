import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../../models/estudiante';
import { EstudianteService } from '../../services/estudiante.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {

  estudiantes: Estudiante[] = [];
  estudianteSeleccionado: Estudiante | null = null;
  mostrarFormulario = false;

  constructor(private estudianteService: EstudianteService) {}

  ngOnInit(): void {
    this.estudianteService.obtenerTodos().subscribe(lista => {
      this.estudiantes = lista;
    });
  }

  nuevoEstudiante(): void {
    this.estudianteSeleccionado = null;
    this.mostrarFormulario = true;
  }

  editarEstudiante(estudiante: Estudiante): void {
    this.estudianteSeleccionado = { ...estudiante };
    this.mostrarFormulario = true;
  }

  eliminarEstudiante(id: number): void {
    const confirmado = confirm('¿Seguro que deseas eliminar este estudiante?');
    if (confirmado) {
      this.estudianteService.eliminar(id);
    }
  }

  onGuardado(): void {
    this.mostrarFormulario = false;
    this.estudianteSeleccionado = null;
  }

  onCancelar(): void {
    this.mostrarFormulario = false;
    this.estudianteSeleccionado = null;
  }
}