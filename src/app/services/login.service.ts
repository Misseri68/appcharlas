import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private tokenKey = 'authToken';

  apiUrl = environment.apiCharlas

  constructor() { }


  //Devuelve "200" si se ha logueado correctamente, devuelve -1 si ha habido algún error.

  login(email: string, password: string){
    let url = this.apiUrl + "api/Auth/Login";
    return axios.post(url, {
      userName: email, //Por algún motivo se llama userName cuando hay que poner el email realmente.
      password: password
    }).then(response => {
      let token = response.data.response;
      this.setToken(token);
      return response.status;
    }).catch(error => {
      console.log(error);
      return -1
    });
  }

  cambiarContraseña(newPwd: string){
    let url = this.apiUrl + 'api/usuarios/updatepasswordusuario'
    const pwdBody = {
      "newPassword" : newPwd
    }
    return axios.put(url,  pwdBody, {
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " +  this.getToken()
      }
    }).then(response => {
      return response.status;
    })
  }


  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  clearToken() {
    localStorage.removeItem(this.tokenKey);
  }

}
