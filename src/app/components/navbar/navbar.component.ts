import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
  imports: [RouterModule]
})
export class NavbarComponent {

  constructor(private _loginService: LoginService, private _router: Router) { }

  showPopup: boolean = false;

  togglePopup(): void {
    this.showPopup = !this.showPopup; // Alterna la visibilidad del pop-up
    console.log('Popup visible:', this.showPopup);
  }

  logout(): void {
    this._loginService.clearToken();
    this._router.navigate(['/login']);
  }

}
