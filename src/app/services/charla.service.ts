import { Charla } from './../models/Charla';

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginService } from './login.service';
import axios from 'axios';
import { RondaService } from './ronda.service';
import { Comentario } from '../models/Comentario';


@Injectable({
    providedIn: 'root',
})
export class ServiceCharla {
    private url = environment.apiCharlas + 'api/charlas/';


    constructor(private _loginService: LoginService, private _rondaService: RondaService) { }

    // Método para agregar otras funciones relacionadas con charlas (si es necesario)
    // Método para obtener las charlas
    // Método para obtener las charlas

getCharlas() {
    return axios
        .get(this.url + "charlascurso", {
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
                        item.idCharla, // ID de la charla
                        item.titulo, // Título de la charla
                        item.descripcion, // Descripción
                        item.tiempo, // Tiempo estimado
                        new Date(item.fechaPropuesta), // Fecha propuesta
                        item.imagenCharla, // Imagen asociada
                        item.idUsuario, // ID del usuario
                        item.usuario, // Nombre del usuario
                        item.idEstadoCharla, // ID del estado
                        item.estadoCharla, // Estado textual
                        item.idRonda, // ID de la ronda
                        item.idCurso, // ID del curso
                        item.nombreCurso // Nombre del curso
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
    console.log("getCharlaPorId ", url);
    return axios
        .get(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this._loginService.getToken(),
            },
        })
        .then((response) => {
            const data = response.data.charla;

            // Crear instancia de Charla con las nuevas propiedades
            const charla = new Charla(
                data.idCharla, // ID de la charla
                data.titulo, // Título
                data.descripcion, // Descripción
                data.tiempo, // Tiempo estimado
                new Date(data.fechaPropuesta), // Fecha propuesta
                data.imagenCharla, // Imagen asociada
                data.idUsuario, // ID del usuario
                data.usuario, // Nombre del usuario
                data.idEstadoCharla, // ID del estado
                data.estadoCharla, // Estado textual
                data.idRonda, // ID de la ronda
                data.idCurso, // ID del curso
                data.nombreCurso // Nombre del curso
            );

            // Procesar los comentarios
            const comentariosData = response.data.comentarios;
            const comentarios = comentariosData.map((comentario: any) => {
                return new Comentario(
                    comentario.idComentario, // ID del comentario
                    comentario.idCharla, // ID de la charla asociada
                    comentario.idUsuario, // ID del usuario que comentó
                    comentario.usuario, // Nombre del usuario que comentó
                    comentario.contenido, // Contenido del comentario
                    new Date(comentario.fecha) // Fecha del comentario
                );
            });

            return { charla, comentarios };
        })
        .catch((error) => {
            console.error('Error al obtener la charla por ID:', error);
            return null;
        });

        
}

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
}
