import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceCharla } from '../../services/charla.service';
import { Charlapost } from '../../models/Charlapost';

@Component({
  selector: 'app-crear-charla',
  templateUrl: './crear-charla.component.html',
  styleUrl: './crear-charla.component.scss',
  imports: [FormsModule],
  standalone: true
})
export class CrearCharlaComponent {

  constructor(
    private _serviceCharla: ServiceCharla
  ) { }

  @ViewChild('cajatitulo') cajatitulo!: ElementRef;
  @ViewChild('cajadescripcion') cajadescripcion!: ElementRef;
  @ViewChild('cajatiempo') cajatiempo!: ElementRef;
  @ViewChild('cajaimagen') cajaimagen!: ElementRef;

  crearCharla():void {

    let titulo = this.cajatitulo.nativeElement.value;
    let descripcion = this.cajadescripcion.nativeElement.value;
    let tiempo = this.cajatiempo.nativeElement.value;
    let imagen = this.cajaimagen.nativeElement.value;
    
    let nuevaCharla = new Charlapost
    (
      0,
      titulo,
      descripcion,
      tiempo,
      new Date(),
      62, //idUsuario (esto hay que recuperarlo dinamicamente)
      1, //idEstadoCharla
      3, //idRonda
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

}
