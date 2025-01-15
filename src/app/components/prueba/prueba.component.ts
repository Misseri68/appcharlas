import { Component } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { RegisterService } from '../../services/register.service';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
})
export class PruebaComponent {

  constructor(private _registerService: RegisterService, private _loginService: LoginService, private _userService: UserService) { }

  usuarioPrueba: Usuario = {
    "idUsuario": 93,
    "nombre": "string",
    "apellidos": "string",
    "email": "string123456@tajamar365.com",
    "estadoUsuario": true,
    "password" : "string",
    "imagen": "string",
    "idRole": 2
}


  login(){
    this._loginService.login(this.usuarioPrueba.email, this.usuarioPrueba.password).then( returned => console.log(returned));
  }

  cargarUsuario(){
    this._userService.getPerfil().then( returned => console.log(returned));
  }
}
