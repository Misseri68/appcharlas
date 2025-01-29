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

@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
  imports: [RouterModule, FormsModule, ChangepwdModalComponent, CommonModule]
})
export class PerfilComponent {
  @ViewChild("cajafile") cajaFileRef!: ElementRef; // Referencia al input de archivo
  usuario: Usuario | null = null;
  showPopup:boolean =  false;


  constructor(
    private _loginService: LoginService,
    private _router: Router,
    private _userService: UserService,
    private _postFilesService: PostFilesService
  ) {}

  ngOnInit(): void {
    this.redirigirALogin();
    this._userService.getPerfil().then(usuario => {
      if (usuario != null) {
        this.usuario = usuario;
      }
    });
  }

  // Método para abrir el selector de archivos
  editarFotoPerfil(): void {
    this.cajaFileRef.nativeElement.click();
  }


  //TODO avisar con un sweetalert o lo que sea al usuario de que tiene que salir y volver a entrar de su cuenta para ver los cambios.
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

      let idUsuario =   this.usuario?.idUsuario || -1;
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
