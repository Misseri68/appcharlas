import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
  imports: [RouterModule]
})
export class NavbarComponent {

  showPopup: boolean = false;

  togglePopup(): void {
    this.showPopup = !this.showPopup; // Alterna la visibilidad del pop-up
    console.log('Popup visible:', this.showPopup);
  }

  logout(): void {
    console.log('Cerrar sesión');
    // Lógica para cerrar sesión
  }

}
