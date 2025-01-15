import { Component,OnInit } from '@angular/core';
import { RondaService } from '../../services/ronda.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true

})
export class DashboardComponent {
  constructor(private _loginService:LoginService ,private _rondaService: RondaService){}
  
  ngOnInit(): void {
    
    
  }

}
