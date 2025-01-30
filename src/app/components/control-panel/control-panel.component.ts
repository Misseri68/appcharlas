import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { Profesor } from '../../models/Profesor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss',
  providers: [AdminService]
})
export class ControlPanelComponent implements OnInit {
  public profesores: Profesor[] = [];
  public profesorSeleccionado: Profesor = {

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
  };


  public mostrarModal: boolean = false;


  constructor(private _adminService: AdminService) { }

  ngOnInit(): void {
    this.loadProfesores();
  }

  async loadProfesores() {
    const datos = await this._adminService.getProfesores();
    if (datos) {
      this.profesores = datos;
    }
  }

  // Método para seleccionar un profesor y abrir el modal
  seleccionarProfesor(profesor: Profesor) {
    this.profesorSeleccionado = { ...profesor };

    this.mostrarModal = true;
    console.log("✅ Seleccionar profesor:", this.profesorSeleccionado);
  }


  // Método para cerrar el modal
  cerrarModal() {
    this.mostrarModal = false;
  }


  actualizarProfesor() {
    if (this.profesorSeleccionado) {


    }
  }

  // Método para eliminar un profesor
  eliminarProfesor() {
    console.log("❌ Eliminar profesor:", this.profesorSeleccionado?.idUsuario);


  }
}
