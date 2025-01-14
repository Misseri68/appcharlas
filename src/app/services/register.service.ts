import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { environment } from '../../environments/environment.development';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  constructor() { }

  /*
    Método que devuelve el código 200 si se ha creado el usuario de forma correcta.

    -    Si es alumno, usará la url del usuario, si no, usará la url del profesor.

    @return promesa con el status code de la petición.
  */

  createUsuario (userJson: string, accessCode: number, esAlumno: boolean):  Promise<number>{
    var url = ''

    if(esAlumno) url = environment.apiCharlas + 'api/usuarios/NewAlumno/' + accessCode;
    else url = environment.apiCharlas + 'api/profesor/NewProfesor/' + accessCode;

    return axios.post(url, userJson)
    .then(response => {
      console.log('Usuario creado correctamente:', response);
      return response.status;
    })
    .catch(error => {
      console.error('Error creando usuario:', error);
      return error.response?.status || 500; // Devuelve el status del error o 500 si no se conoce
    });
  }


}
