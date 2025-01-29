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
  alumnosCursoActual: string[] = [];

  constructor(private _profesorService: ProfesorService) { }

  ngOnInit(): void {
    this.cargarAlumnosCursoActual();
  }


  cargarAlumnosCursoActual(){
    this._profesorService.getAlumnosCursoActivo().then((response: any) => {
      const listaAlumnos = response[0].alumnos;
      console.log("Lista alumnos: ", listaAlumnos);
      listaAlumnos.forEach((item: any) => {
        this.alumnosCursoActual.push(item.alumno.usuario);

      });
    })
   }




  historialAlumnos = [
    { nombre: 'Ana Martínez' },
    { nombre: 'Luis Rodríguez' },
    { nombre: 'Sofía Fernández' },
    { nombre: 'Pedro Gómez' },
  ];

  todosLosAlumnos = [
    { nombre: 'Juan Pérez' },
    { nombre: 'María García' },
    { nombre: 'Carlos López' },
    { nombre: 'Ana Martínez' },
    { nombre: 'Luis Rodríguez' },
    { nombre: 'Sofía Fernández' },
    { nombre: 'Pedro Gómez' },
  ];

  // Método para cambiar de pestaña
  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
