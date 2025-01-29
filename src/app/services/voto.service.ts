import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginService } from './login.service';
import axios from 'axios';
import { Votacion } from '../models/Votacion';


@Injectable({
    providedIn: 'root'
  })

export class ServiceVoto {
    constructor(private _loginService: LoginService){}
    private url = environment.apiCharlas + 'api/Votos/';

    async getNumVotosPorCharla(idCharla: number): Promise<number> {
        try {
            const response = await axios.get(this.url+"VotosCharla/"+idCharla, {
                headers: {
                    "Authorization": "Bearer " + this._loginService.getToken()
                }
            });
            return response.data.votos;  // Retorna el número de votos
        } catch (error) {
            console.error("Error al obtener los votos:", error);
            throw error;  // Lanza el error para que sea capturado donde se llama
        }
    }

    async getVotosPorRonda(idRonda:number){
        await axios.get(this.url+"VotosRonda/"+idRonda,{
            headers:{
                "Authorization": "Bearer "+this._loginService.getToken()
           }
        }).then(response=>{
            response.data
        })
    }

    postVoto(votacion: Votacion): void {
        axios.post(this.url, votacion, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this._loginService.getToken()
            }
        })
        .then(response => {
            console.log("Voto enviado correctamente:", response.data); // Opcional: Log para éxito
        })
        .catch(error => {
            console.error("Error al enviar el voto:", error); // Captura cualquier error
        });
    }

}

