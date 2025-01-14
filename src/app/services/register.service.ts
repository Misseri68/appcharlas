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

  createAlumno (newUserJson: string, accessCode: number):  Promise<number>{
    var urlCompleta = this.url + "NewAlumno/" + accessCode;
    return axios.post(urlCompleta, newUserJson)
    .then(response => {
      console.log('Usuario creado correctamente:', response);
      return response.status;
    })
    .catch(error => {
      console.error('Error creando usuario:', error);
      return error.response?.status || 500; // Return the error status or 500 if unknown
    });
  }

  createProfe  (newUserJson: string, accessCode: number):  Promise<number>{
    var urlCompleta = this.url + "NewProfesor/" + accessCode;
    return axios.post(urlCompleta, newUserJson)
    .then(response => {
      console.log('Usuario creado correctamente:', response);
      return response.status;
    })
    .catch(error => {
      console.error('Error creando usuario: ', error);
      return error.response?.status || 500; // Return the error status or 500 if unknown
    });
  }


}
