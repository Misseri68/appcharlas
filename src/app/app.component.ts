import { Component, ViewEncapsulation } from '@angular/core';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None, // Desactiva el encapsulamiento
  imports: [NavbarComponent, RouterModule],
  standalone: true
})
export class AppComponent {

  mostrarNav : boolean = false;

  constructor(private _router: Router) {

    this._router.events.subscribe(()=>{
      let url = this._router.url;
      if(url.includes('login') || url.includes('register')){
        this.mostrarNav = false;
      }else{
        this.mostrarNav = true;
      }
    });

  }



}
