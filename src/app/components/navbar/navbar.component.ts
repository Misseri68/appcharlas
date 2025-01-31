import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule]
})
export class NavbarComponent {

  imagen :string = 'assets/images/test.jpg';
  isProfe : boolean = false;

  showPopup: boolean = false;

  public roleUsuario: number | null = null; // Variable pública para el role

  datosUsuario = {
    nombreUsuario: '',
    cursoUsuario: '',
    rolUsuario: '',
  }

  constructor(private _loginService: LoginService, private _userServ: UserService, private _router: Router) {
    this.setDatosUsuario();
  }


  togglePopup(): void {
    this.showPopup = !this.showPopup; // Alterna la visibilidad del pop-up
    console.log('Popup visible:', this.showPopup);
  }


  setDatosUsuario(){
    this._userServ.getPerfil().then((perfil : any )=> {
      if(perfil?.imagen){
        this.imagen = perfil.imagen;
        console.log(this.imagen)
      }else{
        this.imagen = 'assets/images/userdefault.png'
      }
      if(perfil?.role == "PROFESOR"){
        this.isProfe = true;
      }
    })
  }

  logout(): void {
    this._loginService.clearToken();
    this._router.navigate(['/login']);
  }

  private loadDatosUsuario() {
    this._userServ.getPerfil().then((usuario : any) => {
      if (usuario != null) {
        this.roleUsuario = usuario.idRole ? Number(usuario.idRole) : null; // Convertimos a número
        console.log("role usuario: ", this.roleUsuario)
        this.datosUsuario = {
          nombreUsuario: usuario.nombre,
          cursoUsuario: usuario.curso || 'Curso',
          rolUsuario: usuario.role || 'Rol'
        }
      }
    })
  }

}
