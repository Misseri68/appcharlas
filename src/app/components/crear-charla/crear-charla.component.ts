import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceCharla } from '../../services/charla.service';
import { Charlapost } from '../../models/Charlapost';
import { UserService } from '../../services/user.service';
import { RondaService } from '../../services/ronda.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { PostFilesService } from '../../services/post-files.service';
import { FileModel } from '../../models/FileModel';

@Component({
  selector: 'app-crear-charla',
  templateUrl: './crear-charla.component.html',
  styleUrl: './crear-charla.component.scss',
  imports: [FormsModule],
  standalone: true
})
export class CrearCharlaComponent implements OnInit{

  @ViewChild('cajatitulo') cajatitulo!: ElementRef;
  @ViewChild('cajadescripcion') cajadescripcion!: ElementRef;
  @ViewChild('cajatiempo') cajatiempo!: ElementRef;
  @ViewChild('cajaimagen') cajaimagen!: ElementRef;
  public usuarioId: number | null = null; // ID del usuario logueado
  public rondaActivaId: number | null = null; // ID de la ronda activa

  constructor(
    private _serviceCharla: ServiceCharla,
    private _serviceUsuario: UserService,
    private _serviceRonda: RondaService,
    private _loginService: LoginService,
    private _router: Router,
    private _postFilesService: PostFilesService
  ) { }


  async ngOnInit(): Promise<void> {
      this.redirigirALogin();
      await this.obtenerUsuarioLogueado();
      await this.obtenerRondaActual();

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

      const newFileModel = new FileModel(file.name, base64);
      if (this.usuarioId) {
        this._postFilesService.postFile(newFileModel, this.usuarioId).subscribe(response => {
          console.log("Respuesta del servidor:", response);
        });
        alert("El archivo ha sido subido correctamente.");

      }

    };
  }
  validarTiempo() {
    let valor = this.cajatiempo.nativeElement.value;

    // Eliminar cualquier carácter que no sea un número
    valor = valor.replace(/[^0-9]/g, '');

    // Convertir a número y limitar a 120
    if (valor !== '' && parseInt(valor, 10) > 120) {
      valor = '120';
    }

    // Asignar el valor limpio de nuevo al input
    this.cajatiempo.nativeElement.value = valor;
  }

  crearCharla():void {

    let titulo = this.cajatitulo.nativeElement.value;
    let descripcion = this.cajadescripcion.nativeElement.value;
    let tiempo = this.cajatiempo.nativeElement.value;

    if (this.usuarioId === null) {
      console.error('Error: Usuario no identificado.');
      alert('Debes estar logueado para crear una charla.');
      return;
    }

    if (this.rondaActivaId === null) {
      console.error('Error: Ronda no identificada.');
      alert('Debes seleccionar una ronda para crear una charla.');
      return;
    }



    let nuevaCharla = new Charlapost
    (
      0,
      titulo,
      descripcion,
      tiempo,
      new Date(),
      this.usuarioId, //idUsuario (esto hay que recuperarlo dinamicamente)
      1, //idEstadoCharla
      this.rondaActivaId, //idRonda
    )

    //enviar datos a servicio
    this._serviceCharla.createCharla(nuevaCharla)
      .then(response => {
        console.log('Charla creada con éxito', response);
        alert('Charla creada con éxito');
      })
      .catch(error => {
        console.error('Error al crear la charla', error);
        alert('Error al crear la charla');
      });
  }


  async obtenerUsuarioLogueado(): Promise<void> {
    try {
      const perfil = await this._serviceUsuario.getPerfil();
      this.usuarioId = perfil?.idUsuario || null;
    } catch (error) {
      console.error('Error al obtener el usuario logueado:', error);
    }
  }

  async obtenerRondaActual(): Promise<void> {
    try {
      this.rondaActivaId = await this._serviceRonda.getRondaActiva();
      console.log("👁️👁️👁️👁️ Ronda activa: ", this.rondaActivaId);
    }catch (error) {
      console.error('Error al obtener la ronda activa:', error);
    }
  }

  private redirigirALogin() {
    if(this._loginService.getToken() === null ){
     this._router.navigate(['/login'])
    }
 }

}
