import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import axios from 'axios';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  apiUrl = environment.apiCharlas;

  constructor(private _loginService: LoginService) { }

  getAlumnosCursoActivo() :any {
    console.log("Url:" , this.apiUrl + 'api/Profesor/AlumnosCursoActivoProfesor')
    return axios.get(this.apiUrl + 'api/Profesor/AlumnosCursoActivoProfesor', {
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " +  this._loginService.getToken()
      }
    }).then(response => {
      console.log(response.data);
      return response.data;
    })
  }

}
