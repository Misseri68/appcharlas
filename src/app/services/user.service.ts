import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { environment } from '../../environments/environment.development';
import { LoginService } from './login.service';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.apiCharlas + 'api/usuarios/';

  constructor(private _loginService: LoginService) { }


  getPerfil(){
    return axios.get(this.url + 'perfil', {
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " +  this._loginService.getToken()
      }
    }).then(response=> {
      console.log(response);
      let datosUsuario = response.data.usuario;
      let usuario = new Usuario(
        datosUsuario.idUsuario,
        datosUsuario.nombre,
        datosUsuario.apellidos,
        datosUsuario.email,
        datosUsuario.estadoUsuario,
        datosUsuario.imagen,
        datosUsuario.password,
        datosUsuario.idRole
      );
      return usuario;
    }).catch(error => {
      console.log(error);
      return null;
    })
  }

  getUsuarioPorId(idUsuario: number) {
    return axios
      .get(this.url + idUsuario, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this._loginService.getToken(),
        },
      })
      .then((response) => {
        const datosUsuario = response.data.usuario;
        return new Usuario(
          datosUsuario.idUsuario,
          datosUsuario.nombre,
          datosUsuario.apellidos,
          datosUsuario.email,
          datosUsuario.estadoUsuario,
          datosUsuario.imagen,
          datosUsuario.password,
          datosUsuario.idRole
        );
      })
      .catch((error) => {
        console.error('Error al obtener el usuario:', error);
        return null;
      });
  }
  

  putUsuario(userFormat : Object){
    console.log(this._loginService.getToken());
    console.log( this.url );
    console.log(userFormat);
    let headers = {
			'Authorization': 'Bearer ' + this._loginService.getToken(),
			'Content-Type': 'application/json'
		}
    return axios.put(this.url , userFormat, {headers
    }).then(response => {
      return response.status;
    })
  }
}
