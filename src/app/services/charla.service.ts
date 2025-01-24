import { Injectable } from '@angular/core';
import { Charla } from '../models/Charla';
import { environment } from '../../environments/environment.development';
import { LoginService } from './login.service';
import axios from 'axios';
import { RondaService } from './ronda.service';

@Injectable({
    providedIn: 'root',
})
export class ServiceCharla {
    private url = environment.apiCharlas + 'api/charlas';

    constructor(private _loginService: LoginService, private _rondaService: RondaService) { }

    // Método para obtener las charlas
    getCharlas() {
        return axios
            .get(this.url, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this._loginService.getToken(),
                },
            })
            .then((response) => {
                console.log(response);
                const datosCharlas = response.data;
                const charlas: Charla[] = datosCharlas.map(
                    (item: any) =>
                        new Charla(
                            item.idCharla,
                            item.titulo,
                            item.descripcion,
                            item.tiempo,
                            new Date(item.fechaPropuesta),
                            item.idUsuario,
                            item.idEstadoCharla,
                            item.idRonda,
                            item.imagenCharla
                        )
                );
                return charlas;
            })
            .catch((error) => {
                console.error('Error al obtener las charlas:', error);
                return null;
            });
    }
    //Funcion se utiliza para obtener las charlas de la ronda activa
    async getCharlasPorRonda(idRonda: number): Promise<Charla[]> {
      try {
        const response = await axios.get(this.url+"/CharlasRonda/"+idRonda, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer "+ this._loginService.getToken()
          }
        });
        console.log(response.data)
        return response.data;
      } catch (error) {
        console.error('Error obteniendo exposiciones:', error);
        throw new Error('Error al cargar las exposiciones');
      }
    }

    // Método para agregar otras funciones relacionadas con charlas (si es necesario)
}
