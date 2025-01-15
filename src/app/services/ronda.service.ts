import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginService } from './login.service';
import axios from 'axios';
import { Ronda } from '../models/Rondas';

@Injectable({
  providedIn: 'root'
})

export class RondaService{
   private url = environment.apiCharlas + 'api/Rondas/';

    constructor(private _loginService: LoginService){}

    getFechaActual():string{
      const fecha = new Date();
      const anio = fecha.getFullYear();
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');  // Asegura que el mes tenga dos dígitos
      const dia = fecha.getDate().toString().padStart(2, '0');  // Asegura que el día tenga dos dígitos
      return `${anio}-${mes}-${dia}`;
    }
    getRondas(): Promise<Ronda[]>{ 
    return axios.get(this.url,{headers:{
      'Content-Type':'application/json',
        'Authorization':'Bearer '+this._loginService.getToken()
     }}
    ).then(response=>{
        return response.data
    }).catch(error=>{
      console.log("Error al obtener rondas" + error)
    });

    }


}