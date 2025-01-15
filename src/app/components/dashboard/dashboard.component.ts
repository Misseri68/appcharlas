import { Component, OnInit } from '@angular/core';
import { TarjetaCharlaComponent } from "../tarjeta-charla/tarjeta-charla.component";
import { ServiceCharla } from '../../services/charla.service';
import { Charla } from '../../models/Charla';
import { CommonModule } from '@angular/common';
import { RondaService } from '../../services/ronda.service';
import { LoginService } from '../../services/login.service';
import { Ronda } from '../../models/Rondas';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [TarjetaCharlaComponent, CommonModule],
  standalone: true,
  providers: [ServiceCharla]

})
export class DashboardComponent implements OnInit {

  public charlas: Charla[] = [];

  constructor(private serviceCharla: ServiceCharla,private _loginService:LoginService ,private _rondaService: RondaService) { }

  rondas: Ronda[] = [];
  rondaActual: Ronda | undefined;  // Objeto para almacenar la ronda activa
  isLoading: boolean = true;

  ngOnInit(): void {
      this.loadCharlas();
  }

  private loadCharlas(){
    this.serviceCharla.getCharlas().then((data) => {
      if (data) {
        this.charlas = data;
        console.log('✅Charlas cargadas:', this.charlas);
      } else {
        console.error('No se pudieron cargar las charlas');
      }
    });
  }
 private getRondaActual(fechaActual: string): void {
   
    const fechaActualDate = new Date(fechaActual);

   
    this.rondaActual = this.rondas.find(ronda => {
      const fechaPresentacion = new Date(ronda.fechaPresentacion);  
      return fechaPresentacion >= fechaActualDate;  
    });

    // Verificamos si se encontró una ronda activa
    if (this.rondaActual) {
      console.log('Ronda activa encontrada:', this.rondaActual.idRonda);
    } else {
      console.log('No se encontró ninguna ronda activa.');
    }

    this.isLoading = false;  // Terminamos el estado de carga
  }
}
