import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private tokenKey = 'authToken';

  url = environment.apiCharlas + "api/Auth/Login";

  constructor() { }


  //Devuelve "200" si se ha logueado correctamente.

  login(email: string, password: string){
    return axios.post(this.url, {
      userName: email, //Por algún motivo se llama userName cuando hay que poner el email realmente.
      password: password
    }).then(response => {
      let token = response.data.response;
      this.setToken(token);
      return response.status;
    }).catch(error => {
      console.log("ha habido un error");
      console.log(error);
      return "error";
    });
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
