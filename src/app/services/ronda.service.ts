import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginService } from './login.service';
import axios from 'axios';
import { Ronda } from '../models/Rondas';

@Injectable({
  providedIn: 'root'
})

export class RondaService{
   private url = environment.apiCharlas + 'api/Rondas/RondasCurso';

    constructor(private _loginService: LoginService){}

    getFechaActual(): string {
      const fecha = new Date();
      return fecha.toISOString().split('T')[0];
    }

    async getRondas(): Promise<Ronda[]> {
      try {
        let response = await axios.get(this.url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this._loginService.getToken()
          },
        });
        console.log(response.data)
        return response.data;
      } catch (error) {
        console.error("Error al obtener rondas:", error);
        throw new Error("No se pudieron cargar las rondas");
      }
    }

    async getRondaActiva(): Promise<number | null > {
      try {
        // Obtener todas las rondas sin filtrar por clase
        const response = await axios.get(this.url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this._loginService.getToken()
          }
        });

        const rondas: Ronda[] = response.data;
        const fechaActual = this.getFechaActual();

        // Buscar la primera ronda activa según fechas
        const rondaActiva = rondas.find(ronda =>
          ronda.fechaPresentacion >= fechaActual
        );

        return rondaActiva?.idRonda || null ;

      } catch (error) {
        console.error("Error al obtener ronda activa:", error);
        return null
      }
    }

}
