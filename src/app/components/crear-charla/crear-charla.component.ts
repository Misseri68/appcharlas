import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceCharla } from '../../services/charla.service';
import { UserService } from '../../services/user.service';
import { Charla } from '../../models/Charla';

@Component({
  selector: 'app-crear-charla',
  templateUrl: './crear-charla.component.html',
  styleUrl: './crear-charla.component.scss',
  providers: [ServiceCharla, UserService],
  imports: [FormsModule],
  standalone: true,
})
export class CrearCharlaComponent implements OnInit {

  @ViewChild('cajatitulo') cajatitulo!: ElementRef;
  @ViewChild('cajadescripcion') cajadescripcion!: ElementRef;
  @ViewChild('cajaduracion') cajaduracion!: ElementRef;
  @ViewChild('cajaimagen') cajaimagen!: ElementRef;

  public usuarioId: number = 0;



  constructor(
    private _charlaService: ServiceCharla,
    private _userService: UserService,
  ) { }

  ngOnInit(): void {

    this.obtenerUsuarioLogueado();



  }

  async crearCharla() {
    if (!this.usuarioId) {
      alert('Error: Usuario no identificado. Por favor, inicia sesión.');
      return;
    }
  
    // Recuperar los valores del formulario
    const titulo = this.cajatitulo.nativeElement.value.trim();
    const descripcion = this.cajadescripcion.nativeElement.value.trim();
    const duracion = Number(this.cajaduracion.nativeElement.value);
    const imagen = this.cajaimagen.nativeElement.value.trim();
  
    if (!titulo || !descripcion || !duracion || !imagen) {
      alert('Todos los campos son obligatorios. Por favor, completa el formulario.');
      return;
    }
  
    // Crear el objeto Charla normalmente
    const charla = new Charla(
      0, // ID generado por el servidor
      titulo,
      descripcion,
      duracion,
      new Date(), // Aquí usamos un objeto Date
      imagen,
      this.usuarioId,
      'Usuario Anónimo',
      0,
      'En progreso',
      0,
      0,
      'Curso 1'
    );
  
    // Adaptar el objeto al formato que espera el endpoint
    const charlaBody = {
      idCharla: charla.idCharla,
      titulo: charla.titulo,
      descripcion: charla.descripcion,
      tiempo: charla.tiempo,
      fechaPropuesta: charla.fechaPropuesta.toISOString(), // Convertir Date a ISO string
      idUsuario: charla.idUsuario,
      idEstadoCharla: charla.idEstadoCharla,
      idRonda: charla.idRonda,
      imagenCharla: charla.imagenCharla,
    };
  
    try {
      const response = await this._charlaService.postCharla(charlaBody);
      console.log('Charla creada con éxito:', response);
      alert('Charla creada con éxito');
      // Redirigir al dashboard
      // this._router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Error al crear la charla:', error);
      alert('Hubo un error al crear la charla. Por favor, inténtalo de nuevo.');
    }
  }
  

  async obtenerUsuarioLogueado(): Promise<void> {
    try {
      const perfil = await this._userService.getPerfil();
      this.usuarioId = perfil?.idUsuario || 0; // Si no se encuentra el ID, asigna 0 como valor por defecto
    } catch (error) {
      console.error('Error al obtener el usuario logueado:', error);
      this.usuarioId = 0; // Asegúrate de asignar un valor incluso en caso de error
    }
  }

}
