import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProfesorService } from '../../services/profesor.service';

@Component({
  standalone: true,
  selector: 'app-alumnos-tabs',
  templateUrl: './alumnos-tabs.component.html',
  styleUrl: './alumnos-tabs.component.scss',
  imports: [CommonModule]
})
export class AlumnosTabsComponent {
  // Pestañas disponibles
  tabs = ['Alumnos curso actual', 'Historial de Alumnos', 'Todos los alumnos'];
  selectedTab = this.tabs[0]; // Pestaña seleccionada por defecto
  alumnosCursoActual: any = this.generarEstructuraBase();
  alumnosCursoHistorial: any = this.generarEstructuraBase();
  alumnosTodos: any = this.generarEstructuraBase();
  curso: string = "";
  numeroAlumnosTab: number = 0;

  constructor(private _profesorService: ProfesorService) { }

  ngOnInit(): void {
    this.cargarAlumnosCursoActual();
    this.curso = "Tus alumnos del " + this.alumnosCursoActual.curso.nombre;

  }

  cargarAlumnosCursoActual() {
    this._profesorService.getAlumnosCursoActivo().then((response: any) => {
      this.alumnosCursoActual = response[0];
      this.numeroAlumnosTab = response[0].numeroAlumnos;
      this.curso = "Tus alumnos del " + this.alumnosCursoActual.curso.nombre;
console.log(this.curso)
    })
  }

  cargarAlumnosCursoHistorial() {
    this._profesorService.getAlumnosCursoHistorial().then((response: any) => {
      this.alumnosCursoHistorial = response[0];
      this.numeroAlumnosTab = response[0].numeroAlumnos;
    })
  }

  cargarAlumnosTodos() {
    this._profesorService.getAlumnosTodos().then((response: any) => {
      this.alumnosTodos = response[0];
      this.numeroAlumnosTab = response[0].numeroAlumnos;
    })
  }

  cargarTodasListas() {
    this.cargarAlumnosCursoActual();
    this.cargarAlumnosCursoHistorial();
    this.cargarAlumnosTodos();
  }



  // Función que genera la estructura base
  generarEstructuraBase() {
    return [
      {
        numeroAlumnos: 0,
        curso: {
          idCurso: 0,
          nombre: '',
          fechaInicio: '',
          fechaFin: '',
          activo: false
        },
        alumnos: [
          {
            alumno: {
              idUsuario: 0,
              usuario: '',
              estadoUsuario: false,
              imagen: '',
              email: '',
              idRole: 0,
              role: '',
              idCurso: 0,
              curso: '',
              fechaInicioCurso: '',
              fechaFinCurso: '',
              idCursosUsuarios: 0
            },
            charlasTotales: 0,
            charlasPropuestas: 0,
            charlasAceptadas: 0,
            charlas: []
          }
        ]
      }
    ];
  }

  deshabilitarAlumno(idUsuario: number) {
    this._profesorService.deshabilitarAlumnoFetch(idUsuario).then((response: any) => {
      if (response.status == 200) {
        alert("Alumno deshabilitado")
        this.cargarTodasListas();
      }
    })
  }

  habilitarAlumno(idUsuario: number) {
    this._profesorService.habilitarAlumnoFetch(idUsuario).then((response: any) => {
      if (response.status == 200) {
        alert("Alumno habilitado")
        this.cargarTodasListas();
      }
    })
  }


  // Método para cambiar de pestaña
  selectTab(tab: string) {
    this.selectedTab = tab;
    if (tab == "Alumnos curso actual") {
      this.cargarAlumnosCursoActual();
      this.curso = "Tus alumnos del " + this.alumnosCursoActual.curso.nombre;
      this.numeroAlumnosTab = this.alumnosCursoActual.numeroAlumnos;
    }
    if (tab == "Historial de Alumnos") {
      this.cargarAlumnosCursoHistorial();
      this.curso = "Tu historial de alumnos pasados";
      this.numeroAlumnosTab = this.alumnosCursoHistorial.numeroAlumnos;
    }
    if (tab == "Todos los alumnos") {
      this.cargarAlumnosTodos();
      this.curso = "Todos tus alumnos";
    }
  }
}
