import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../models/Usuario';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
  imports: [RouterModule, FormsModule]

})
export class PerfilComponent {

  @ViewChild('cajanombre') cajaNombre!: ElementRef;
  @ViewChild('cajaapellidos') cajaApellidos!: ElementRef;
  @ViewChild('cajaemail') cajaEmail!: ElementRef;

  usuario: Usuario | null = null;

  constructor(private _loginService: LoginService, private _router: Router, private _userService: UserService) {

   }

  ngOnInit(): void {
    this._userService.getPerfil().then(usuario => {
      if(usuario != null){
        this.usuario = usuario;
        console.log(this.usuario);
        console.log(usuario);
      }
    });
  }

  editarPerfil(){

    const usuarioFormat = {
      "idUsuario": this.usuario?.idUsuario,
      "nombre": this.cajaNombre.nativeElement.value ,
      "apellidos": this.cajaApellidos.nativeElement.value,
      "email": this.cajaEmail.nativeElement.value,
      "estadoUsuario": this.usuario?.estadoUsuario,
      "imagen": this.usuario?.imagen,
      "password": 12345,
      "idRole": this.usuario?.idRole
    }
    this._userService.putUsuario(usuarioFormat).then(response=>{
      console.log(response);
    });
  }

  cerrarSesion(){
    this._loginService.clearToken();
    this._router.navigate(['/login']);
  }
}
