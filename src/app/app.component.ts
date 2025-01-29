import { Component, ViewEncapsulation } from '@angular/core';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { Router, RouterModule, RouterOutlet } from '@angular/router';
// import { routerTransition } from './animations/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None, // Desactiva el encapsulamiento
  imports: [NavbarComponent, RouterModule, RouterOutlet],
  standalone: true,
  // animations: [routerTransition]
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

  // Método para preparar la animación
  prepareRoute(outlet: RouterOutlet): boolean {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }



}
