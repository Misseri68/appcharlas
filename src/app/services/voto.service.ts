import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginService } from './login.service';
import axios from 'axios';


@Injectable({
    providedIn: 'root'
  })

export class ServiceVoto {
    constructor(private _loginService: LoginService){}
    private url = environment.apiCharlas + 'api/Votos/';

    async getNumVotosPorCharla(idCharla: number){
       await  axios.get(this.url+"VotosCharla/"+idCharla, {headers:{
            "Authorization": "Bearer "+this._loginService.getToken()
       }}).then(response=>{
            //Devuelve un number con el numero de votos
            return response.data.votos
            
        })
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

    postVoto(idCharla:number,idUsuario:number, idRonda:number){
        const data = {
            idCharla , 
            idUsuario,
            idRonda,
        }
        const json = JSON.stringify(data)
            axios.post(this.url,json,{
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+this._loginService.getToken()
                }
            }).then(response=>{
                console.log(response.data)
                    return response.data
            })
    }

}

