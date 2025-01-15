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
  providers: [ServiceCharla,LoginService,RondaService]

})
export class DashboardComponent implements OnInit {
  constructor(private serviceCharla: ServiceCharla,private _loginService:LoginService ,private _rondaService: RondaService) { }
  public charlas: Charla[] = [];
  private rondas: Ronda[] = [];
  private rondaActual: Ronda | undefined;  // Objeto para almacenar la ronda activa
  private isLoading: boolean = true;

  ngOnInit(): void {
      this.loadCharlas();
      this.getRonda();
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
  private getRonda():void{
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
 private getRondaActual(fechaActual: string):any {
   
    const fechaActualDate = new Date(fechaActual);

   
    this.rondaActual = this.rondas.find(ronda => {
      const fechaPresentacion = new Date(ronda.fechaPresentacion);  
      return fechaPresentacion >= fechaActualDate;  
    });

    // Verificamos si se encontró una ronda activa
    if (this.rondaActual) {
        console.log(this.rondaActual.idRonda) 
        return this.rondaActual.idRonda
    } else {
      console.log('No se encontró ninguna ronda activa.');    
    }

    this.isLoading = false;  // Terminamos el estado de carga
  }
}
