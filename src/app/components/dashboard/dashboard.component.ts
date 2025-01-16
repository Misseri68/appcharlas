import { Component, OnInit } from '@angular/core';
import { TarjetaCharlaComponent } from "../tarjeta-charla/tarjeta-charla.component";
import { ServiceCharla } from '../../services/charla.service';
import { Charla } from '../../models/Charla';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [TarjetaCharlaComponent, CommonModule],
  standalone: true,
  providers: [ServiceCharla]

})
export class DashboardComponent implements OnInit {

  public charlas: Charla[] = [];
  datosUsuario = {
    nombreUsuario: '',
    cursoUsuario: '',
    rolUsuario: '',

  }

  constructor(private serviceCharla: ServiceCharla, private _usuarioServ : UserService) {
   }

  ngOnInit(): void {
      this.loadCharlas();
      this.loadDatosUsuario();
  }

  private loadCharlas(){
    this.serviceCharla.getCharlas().then((data) => {
      if (data) {
        this.charlas = data;
        console.log('✅Charlas cargadas:', this.charlas);
      } else {
        console.error('No se pudieron cargar las charlas');
      }
    });
  }

  private loadDatosUsuario(){
    this._usuarioServ.getPerfil().then( usuario => {
      if(usuario != null ){
        this.datosUsuario = {
          nombreUsuario: usuario.nombre,
          cursoUsuario: usuario.curso || 'Curso' ,
          rolUsuario: usuario.role || 'Rol'
        }
      }

    }

    )
  }


}
