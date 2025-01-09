import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true,
  imports: [RouterModule]
})
export class NavbarComponent {

  constructor(private _loginService: LoginService) {}

  ngOnInit(): void {

  }

  cerrarSesion(){
    this._loginService.clearToken();
  }

}
