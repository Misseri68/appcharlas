import { Injectable, numberAttribute } from '@angular/core';
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

    // async getNumVotosPorCharla(idCharla: number){
    //    await  axios.get(this.url+"VotosCharla/"+idCharla, {headers:{
    //         "Authorization": "Bearer "+this._loginService.getToken()
    //    }}).then(response=>{
    //         //Devuelve un number con el numero de votos
    //         return response.data.votos

    //     })
    // }
    async getNumVotosPorCharla(idCharla: number): Promise<number> {
      try {
          const response = await axios.get(`${this.url}VotosCharla/${idCharla}`, {
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

    async postVoto(votacion:Votacion): Promise<void> {
      try {
        await axios.post(this.url, votacion, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this._loginService.getToken()}`
          }
        });
        console.log("Voto registrado exitosamente: "+votacion.idRonda+","+votacion.IdCharla+","+votacion.IdUsuario+","+votacion.idRonda);
      } catch (error) {
        console.error("Error al enviar el voto:", error);
      }
    }
  }



