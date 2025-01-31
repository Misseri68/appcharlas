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
import { ProfesorService } from '../../services/profesor.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
  imports: [RouterModule, FormsModule, ChangepwdModalComponent, CommonModule, TarjetaCharlaComponent, AlumnosTabsComponent]
})
export class PerfilComponent {


  @ViewChild("cajafile") cajaFileRef!: ElementRef;
  usuario: Usuario | null = null;
  showPopup: boolean = false;
  charlasAceptadas: Charla[] = [];
  charlasPropuestas: Charla[] = [];
  isProfe: boolean = false;
  showUnirseCurso: boolean = false;
  idCursoUsuario: number = 0;



  constructor(
    private _loginService: LoginService,
    private _router: Router,
    private _userService: UserService,
    private _postFilesService: PostFilesService,
    private _charlaService: ServiceCharla,
    private _profesorService: ProfesorService
  ) { }

  ngOnInit(): void {
    this.redirigirALogin();
    this._userService.getPerfil().then((usuario: any) => {

      if (usuario != null) {
        this.usuario = usuario;
        console.log(usuario)
        this.idCursoUsuario = usuario.idCursoUsuario || 0;
        if (this.usuario?.role == "PROFESOR") {
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
      this.charlasAceptadas = charlas.filter(charla => charla.idEstadoCharla == 2)
      this.charlasPropuestas = charlas.filter(charla => charla.idEstadoCharla == 1)
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

  unirseCurso(codigoCurso: string) {
    let numero :number = parseInt(codigoCurso);
    this._profesorService.asignarseCurso(numero, this.usuario?.idUsuario || -1).then(response => {
      if (response.status == 201 || response.status == 200) {
        alert("Curso asignado correctamente")
      } else { alert("Error al asignar curso") }
    })
  }

  cambiarseCurso(codigoCurso: string) {
    this._profesorService.cambiarseCurso(codigoCurso, this.usuario?.idUsuario || -1, this.idCursoUsuario || -1).then(response => {
      if (response.status == 201 || response.status == 200) {
        alert("Curso cambiado correctamente")
      } else { alert("Error al asignar curso") }

    })
  }

  toggleShowUnirseCurso() {
    this.showUnirseCurso = !this.showUnirseCurso;
  }

}
