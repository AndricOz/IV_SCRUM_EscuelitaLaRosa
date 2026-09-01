import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estudiante } from '../../models/estudiante';
import { EstudianteService } from '../../services/estudiante.service';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnChanges {

  @Input() estudianteEditar: Estudiante | null = null;
  @Output() cancelar = new EventEmitter<void>();
  @Output() guardado = new EventEmitter<void>();

  formularioEstudiante: FormGroup;
  esEdicion = false;

  carreras = [
    'Informática',
    'Administración',
    'Diseño',
    'Electrónica',
    'Contabilidad'
  ];

  jornadas = [
    'Matutina',
    'Vespertina',
    'Nocturna'
  ];

  constructor(
    private fb: FormBuilder,
    private estudianteService: EstudianteService
  ) {
    this.formularioEstudiante = this.crearFormulario();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['estudianteEditar'] && this.estudianteEditar) {
      this.esEdicion = true;
      this.formularioEstudiante.patchValue(this.estudianteEditar);
    } else if (changes['estudianteEditar'] && !this.estudianteEditar) {
      this.esEdicion = false;
      this.formularioEstudiante.reset({ aceptaReglamento: false });
    }
  }

  private crearFormulario(): FormGroup {
    return this.fb.group({
      nombreCompleto: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],

      carne: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10)
      ]],

      correo: ['', [
        Validators.required,
        Validators.email
      ]],

      edad: ['', [
        Validators.required,
        Validators.min(14),
        Validators.max(25)
      ]],

      carrera: ['', Validators.required],
      jornada: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      telefono: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{8}$/)
      ]],
      aceptaReglamento: [false, Validators.requiredTrue]
    });
  }

  guardarEstudiante(): void {
    if (this.formularioEstudiante.invalid) {
      this.formularioEstudiante.markAllAsTouched();
      return;
    }

    const datos = this.formularioEstudiante.value;

    if (this.esEdicion && this.estudianteEditar) {
      this.estudianteService.editar({
        ...datos,
        id: this.estudianteEditar.id
      });
    } else {
      this.estudianteService.crear(datos);
    }

    this.formularioEstudiante.reset({ aceptaReglamento: false });
    this.esEdicion = false;
    this.guardado.emit();
  }

  onCancelar(): void {
    this.formularioEstudiante.reset({ aceptaReglamento: false });
    this.esEdicion = false;
    this.cancelar.emit();
  }

}