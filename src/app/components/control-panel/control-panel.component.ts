import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { Profesor } from '../../models/Profesor';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss',
  providers: [AdminService] // Inyectamos el servicio aquí
})
export class ControlPanelComponent implements OnInit {
  public profesores: Profesor[] = []; // Almacena la lista de profesores

  constructor(private _adminService: AdminService) {}

  ngOnInit(): void {
    this.loadProfesores();
  }

  async loadProfesores() {
    const datos = await this._adminService.getProfesores();
    if (datos) {
      this.profesores = datos;
    }
  }
}
