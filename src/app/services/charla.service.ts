import { Charla } from './../models/Charla';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginService } from './login.service';
import axios from 'axios';

@Injectable({
    providedIn: 'root',
})
export class ServiceCharla {
    private url = environment.apiCharlas + 'api/charlas';

    constructor(private _loginService: LoginService) { }

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

    getCharlaPorId(id: number) {
        const url = `${this.url}/${id}`;
        console.log("getCharlasPorId ", url);
        return axios
            .get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this._loginService.getToken(),
                },
            })
            .then((response) => {
                console.log("response ", response.data.charla);
                const data = response.data.charla;
                const charla = new Charla(
                    data.idCharla,
                    data.titulo,
                    data.descripcion,
                    data.tiempo,
                    new Date(data.fechaPropuesta),
                    data.idUsuario,
                    data.idEstadoCharla,
                    data.idRonda,
                    data.imagenCharla
                );
                
                return charla;
            })
            .catch((error) => {
                console.error('Error al obtener la charla por ID:', error);
                return null;
            });
    }

}
