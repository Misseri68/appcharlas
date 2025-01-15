import { Component,OnInit } from '@angular/core';
import { RondaService } from '../../services/ronda.service';
import { LoginService } from '../../services/login.service';
import { Ronda } from '../../models/Rondas';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true

})
export class DashboardComponent implements OnInit {  
  constructor(private _loginService:LoginService ,private _rondaService: RondaService){}
  rondas: Ronda[] = [];
  rondaActual: Ronda | undefined;  // Objeto para almacenar la ronda activa
  isLoading: boolean = true;
  
  
  ngOnInit(): void {
    // Paso 1: Obtener la fecha actual
    const fechaActual: string = this._rondaService.getFechaActual();
    // Paso 2: Obtener las rondas desde el servicio
    this._rondaService.getRondas().then(
      (data: Ronda[]) => {
        this.rondas = data;  // Guardamos las rondas en el array `rondas`
        console.log('Rondas obtenidas:', this.rondas);

        // Paso 3: Buscar la ronda activa (primera ronda cuya fecha de presentación sea menor a la fecha actual)
        this.getRondaActual(fechaActual);  // Llamamos a la función de obtención de ronda actual
      }
    ).catch(error => {
      console.error('Error al obtener las rondas:', error);
      this.isLoading = false;
    });

  }


  getRondaActual(fechaActual: string): void {
   
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
