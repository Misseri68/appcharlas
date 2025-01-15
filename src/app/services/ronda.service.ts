import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginService } from './login.service';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})

export class RondaService{
    url = environment.apiCharlas + 'api/Rondas/';

    constructor(private _loginService: LoginService){}


    getRondas()  { 
    axios.get(this.url,{headers:{
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