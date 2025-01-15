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

  putUsuario(userFormat : Object){

    return axios.put(this.url , userFormat, {
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " +  this._loginService.getToken()
      }
    }).then(response => {
      console.log('Usuario actualizado correctamente:', response);
      return response.status;
    })
  }
}
