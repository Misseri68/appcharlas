import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginService } from './login.service';
import axios from 'axios';
import { Comentario } from '../models/Comentario';

@Injectable({
    providedIn: 'root',
})
export class ServiceComentario {
    private url = environment.apiCharlas + 'api/comentarios';

    constructor(private _loginService: LoginService) { }

    // Método para realizar un POST de un nuevo comentario
    postComentario(comentario: Comentario) {
        const body = {
            idCharla: comentario.idCharla,
            idUsuario: comentario.idUsuario,
            contenido: comentario.contenido,
            fecha: comentario.fecha.toISOString(),
        };

        return axios
            .post(this.url, body, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this._loginService.getToken(),
                },
            })
            .then((response) => {
                console.log('Comentario enviado:', response.data);
                return response.data;
            })
            .catch((error) => {
                console.error('Error al enviar el comentario:', error);
                throw error;
            });
    }
}
