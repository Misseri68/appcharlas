import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceCharla } from '../../services/charla.service';
import { Charlapost } from '../../models/Charlapost';
import { UserService } from '../../services/user.service';

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

  constructor(
    private _serviceCharla: ServiceCharla,
    private _serviceUsuario: UserService
  ) { }


  async ngOnInit(): Promise<void> {
      await this.obtenerUsuarioLogueado();
  }

  crearCharla():void {

    let titulo = this.cajatitulo.nativeElement.value;
    let descripcion = this.cajadescripcion.nativeElement.value;
    let tiempo = this.cajatiempo.nativeElement.value;
    let imagen = this.cajaimagen.nativeElement.value;

    if (this.usuarioId === null) {
      console.error('Error: Usuario no identificado.');
      alert('Debes estar logueado para crear una charla.');
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
      1, //idRonda
      imagen
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

}
