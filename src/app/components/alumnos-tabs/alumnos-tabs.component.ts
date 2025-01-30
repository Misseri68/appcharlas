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
  }



  cargarAlumnosCursoActual() {
    this._profesorService.getAlumnosCursoActivo().then((response: any) => {
      this.alumnosCursoActual = response[0];
      this.curso = "Tus alumnos del " + this.alumnosCursoActual.curso.nombre;
      this.numeroAlumnosTab = this.alumnosCursoActual.numeroAlumnos;
    })
  }

  cargarAlumnosCursoHistorial(){
    this._profesorService.getAlumnosCursoHistorial().then((response: any) => {
      this.alumnosCursoHistorial = response[0];

    })
  }

  cargarAlumnosTodos(){
    this._profesorService.getAlumnosTodos().then((response: any) => {
      this.alumnosTodos = response[0];
      console.log("Curso actual metodo",
        this.alumnosCursoActual.alumnos
      )
    })
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



  // Método para cambiar de pestaña
  selectTab(tab: string) {
    this.selectedTab = tab;
    if(tab == "Alumnos curso actual"){
      this.curso = "Tus alumnos del " + this.alumnosCursoActual.curso.nombre;
      this.numeroAlumnosTab = this.alumnosCursoActual.numeroAlumnos;
    }
    if(tab == "Historial de Alumnos"){
      if(this.alumnosCursoHistorial.numeroAlumnos == 0){
        this.cargarAlumnosCursoHistorial();
      }
      this.curso = "Tu historial de alumnos pasados";
      this.numeroAlumnosTab = this.alumnosCursoHistorial.numeroAlumnos;
      let num : number = this.alumnosCursoHistorial.numeroAlumnos;
      if(num == 0){
        this.numeroAlumnosTab = 0
      }

    }
    if(tab == "Todos los alumnos"){
      if(this.alumnosTodos.numeroAlumnos == 0){
        this.cargarAlumnosTodos();
      }
      this.curso = "Todos tus alumnos";
      let num : number = this.alumnosTodos.numeroAlumnos;
      if(num == 0){
        this.numeroAlumnosTab = 0
      }
    }
  }

}
