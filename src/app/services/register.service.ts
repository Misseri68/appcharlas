import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { environment } from '../../environments/environment.development';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url = environment.apiCharlas + 'api/usuarios/';

  constructor() { }

  /*Método que devuelve el código 200 si se ha creado el usuaroi de forma correcta.
    @return promesa con el status code de la petición.*/

  createUser (usuario: Usuario):  Promise<number>{
    return axios.post(this.url, usuario)
    .then(response => {
      console.log(response);
      return response.status
    })
    .catch(error => {
      console.log(error);
      return 500;
    });
  }
}
