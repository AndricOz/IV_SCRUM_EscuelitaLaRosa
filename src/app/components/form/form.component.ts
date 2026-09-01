import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {

  formularioEstudiante: FormGroup;

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

  constructor(private fb: FormBuilder) {

    this.formularioEstudiante = this.fb.group({
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
    console.log('Estudiante registrado:', this.formularioEstudiante.value);

  }

}