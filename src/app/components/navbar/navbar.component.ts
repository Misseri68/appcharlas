import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
  imports: [RouterModule]
})
export class NavbarComponent {

  imagen :string = 'assets/images/test.jpg';

  constructor(private _loginService: LoginService, private _userServ: UserService, private _router: Router) { 
    this.getImagenPerfil();
  }

  showPopup: boolean = false;

  togglePopup(): void {
    this.showPopup = !this.showPopup; // Alterna la visibilidad del pop-up
    console.log('Popup visible:', this.showPopup);
  }

  getImagenPerfil(){
    console.log("Hola")
    this._userServ.getPerfil().then(perfil => {
      if(perfil?.imagen){
        this.imagen = perfil.imagen;
        console.log(this.imagen)
      }else{
        this.imagen = 'assets/images/userdefault.png'
      }
    })
  }

  logout(): void {
    this._loginService.clearToken();
    this._router.navigate(['/login']);
  }

}
