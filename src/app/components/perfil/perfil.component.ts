import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../models/Usuario';
import { FormsModule } from '@angular/forms';
import { PostFilesService } from '../../services/post-files.service';
import { FileModel } from '../../models/FileModel';
import { ChangepwdModalComponent } from './changepwd-modal/changepwd-modal.component';
import { CommonModule } from '@angular/common';
import { TarjetaCharlaComponent } from "../tarjeta-charla/tarjeta-charla.component";
import { AlumnosTabsComponent } from '../alumnos-tabs/alumnos-tabs.component';
import { Charla } from '../../models/Charla';
import { ServiceCharla } from '../../services/charla.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
  imports: [RouterModule, FormsModule, ChangepwdModalComponent, CommonModule, TarjetaCharlaComponent, AlumnosTabsComponent]
})
export class PerfilComponent {
  @ViewChild("cajafile") cajaFileRef!: ElementRef;
  usuario: Usuario | null = null;
  showPopup: boolean = false;
  charlasAceptadas: Charla[] = [];
  charlasPropuestas: Charla[] = [];
  isProfe: boolean = false;



  constructor(
    private _loginService: LoginService,
    private _router: Router,
    private _userService: UserService,
    private _postFilesService: PostFilesService,
    private _charlaService: ServiceCharla
  ) { }

  ngOnInit(): void {
    this.redirigirALogin();
    this._userService.getPerfil().then(usuario => {
      if (usuario != null) {
        this.usuario = usuario;
        if(this.usuario.role == "PROFESOR"){
          this.isProfe = true;
        }
      }
    });
    this.cargarCharlas();
  }

  async cargarCharlas() {
    this._charlaService.getCharlasUsuario().then(items => {
      //Conversión de response.data a charlas.
      const charlas: Charla[] = items.map(
        (item: any) =>
          new Charla(
            item.charla.idCharla,
            item.charla.titulo,
            item.charla.descripcion,
            item.charla.tiempo,
            new Date(item.charla.fechaPropuesta),
            item.charla.imagenCharla,
            item.charla.idUsuario,
            item.charla.usuario,
            item.charla.idEstadoCharla,
            item.charla.estadoCharla,
            item.charla.idRonda,
            item.charla.idCurso,
            item.charla.nombreCurso
          )
      );
      this.charlasAceptadas = charlas.filter(charla=> charla.idEstadoCharla == 2)
      this.charlasPropuestas = charlas.filter(charla=> charla.idEstadoCharla == 1)
    })

  }

  editarFotoPerfil(): void {
    this.cajaFileRef.nativeElement.click();
  }


  subirFichero(event: any): void {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const buffer = reader.result as ArrayBuffer;
      const base64 = btoa(
        new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      let idUsuario = this.usuario?.idUsuario || -1;
      const newFileModel = new FileModel(file.name, base64);
      this._postFilesService.postFile(newFileModel, idUsuario).subscribe(response => {
        console.log("Respuesta del servidor:", response);
      });
    };
    alert("El archivo ha sido subido correctamente. Cierra sesión y vuelve a entrar para visualizar los cambios.");
  }

  cambiarContrasena() {
    this.togglePopup();
  }

  togglePopup() {
    console.log("popup toggleado")

    this.showPopup = !this.showPopup;
  }

  private redirigirALogin() {
    if (this._loginService.getToken() === null) {
      this._router.navigate(['/login']);
    }
  }

}
