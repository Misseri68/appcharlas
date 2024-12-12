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
    idUsuario: 1,
    nombre: "PruebaAri",
    apellidos: "prueba post",
    email: "ari@gmail.com",
    estadoUsuario: true,
    imagen: "https://i.scdn.co/image/ab6761610000e5ebcce32307d0f312e8faf01bae",
    password: "123456",
    idRole: 2
  }

  createUser(){
    this._registerService.createUser(this.usuarioPrueba).then( returned => console.log(returned));
  }

  login(){
    this._loginService.login(this.usuarioPrueba.email, this.usuarioPrueba.password).then( returned => console.log(returned));
  }

  cargarUsuario(){
    this._userService.getPerfil().then( returned => console.log(returned));
  }
}
