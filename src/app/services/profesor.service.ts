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
    return axios.get(this.apiUrl + 'api/Profesor/AlumnosCursoActivoProfesor', {
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " +  this._loginService.getToken()
      }
    }).then(response => {
      return response.data;
    })
  }

  getAlumnosCursoHistorial() :any {
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

  getAlumnosTodos() :any {
    return axios.get(this.apiUrl + 'api/Profesor/AlumnosCursoProfesor', {
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " +  this._loginService.getToken()
      }
    }).then(response => {
      return response.data;
    })
  }

  habilitarAlumnoFetch(idUsuario: number){
    let url = this.apiUrl + 'api/Profesor/UpdateEstadoAlumno/' + idUsuario + '/true'
    let token = this._loginService.getToken();

    return fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })
  }


  deshabilitarAlumnoFetch(idUsuario: number) {
    let token = this._loginService.getToken();
    let url = this.apiUrl + 'api/Profesor/UpdateEstadoAlumno/' + idUsuario + '/false'


    return fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })

  }

}
