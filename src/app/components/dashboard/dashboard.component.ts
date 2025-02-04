import { Component, OnInit } from '@angular/core';
import { TarjetaCharlaComponent } from "../tarjeta-charla/tarjeta-charla.component";
import { ServiceCharla } from '../../services/charla.service';
import { Charla } from '../../models/Charla';
import { CommonModule } from '@angular/common';
import { RondaService } from '../../services/ronda.service';
import { LoginService } from '../../services/login.service';
import { Ronda } from '../../models/Rondas';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ServiceVoto } from '../../services/voto.service';
import { ControlPanelComponent } from "../control-panel/control-panel.component";
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [TarjetaCharlaComponent, CommonModule, ControlPanelComponent],
  standalone: true,
  providers: [ServiceCharla, LoginService, RondaService, ServiceVoto]

})
export class DashboardComponent implements OnInit {

  constructor(private _votoServ: ServiceVoto
    , private serviceCharla: ServiceCharla,
    private _usuarioServ: UserService,
    private _router: Router,
    private _loginService: LoginService,
    private _rondaService: RondaService,
    private _cursoService :CursoService
  ) {
  }
  public charlas: Charla[] = [];
  public charlasPorRonda: Charla[] = [];
  private rondas: Ronda[] = [];
  private rondaActual: Ronda | undefined;  // Objeto para almacenar la ronda activa
  private isLoading: boolean = true;
  public roleUsuario: number | null = null; // Variable pública para el role
  datosUsuario = {
    nombreUsuario: '',
    cursoUsuario: '',
    rolUsuario: '',
  }


  ngOnInit(): void {
    this.redirigirALogin();
    this.loadCharlas();
    this.loadDatosUsuario();
    this.loadCharlasActivas()
  }

  private loadCharlas() {
    this.serviceCharla.getCharlas().then((data) => {
      if (data) {
        this.charlas = data;
        console.log('✅Charlas cargadas:', this.charlas);

      } else {
        console.error('No se pudieron cargar las charlas');
      }
    });
  }
  private async loadCharlasActivas() {
    const idRondaActual = await this._rondaService.getRondaActiva()
    if (idRondaActual) {
     this.charlasPorRonda = await this.serviceCharla.getCharlasPorRonda(idRondaActual)
    }
  }

  private loadDatosUsuario() {
    this._usuarioServ.getPerfil().then((usuario : any) => {
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

  private redirigirALogin() {
    if (this._loginService.getToken() === null) {
      this._router.navigate(['/login'])
    }
  }



}



