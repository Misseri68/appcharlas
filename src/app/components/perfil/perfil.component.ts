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
    this.redirigirALogin();
    this._userService.getPerfil().then(usuario => {
      if(usuario != null){
        this.usuario = usuario;
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
      "imagen": "https://i.scdn.co/image/ab6761610000e5ebcce32307d0f312e8faf01bae",
      "password": "12345",
      "idRole": this.usuario?.idRole
    }
    this._userService.putUsuario(usuarioFormat).then(response=>{
      console.log(response);
    });

    console.log(this.usuario?.imagen);
  }

  cerrarSesion(){
    this._loginService.clearToken();
    this._router.navigate(['/login']);
  }

  private redirigirALogin() {
    if(this._loginService.getToken() === null ){
     this._router.navigate(['/login'])
    }
 }
}
