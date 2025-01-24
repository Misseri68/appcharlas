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
  constructor(private _charlaService: ServiceCharla,private _loginService:LoginService ,private _rondaService: RondaService) { }
  public charlas: Charla[] = [];
  private rondas: Ronda[] = [];
  private rondaActual: Ronda | undefined;  // Objeto para almacenar la ronda activa
  private isLoading: boolean = true;

  ngOnInit(): void {
      this.loadCharlas();
      this.loadCharlasActivas()

  }

  private loadCharlas(){
    this._charlaService.getCharlas().then((data) => {
      if (data) {
        this.charlas = data;
        console.log('✅Charlas cargadas:', this.charlas);
      } else {
        console.error('No se pudieron cargar las charlas');
      }
    });
  }
  private async  loadCharlasActivas(){
     const idRondaActual  = await this._rondaService.getRondaActiva()
     if(idRondaActual){
      await  this._charlaService.getCharlasPorRonda(idRondaActual )
     }

  }

}

