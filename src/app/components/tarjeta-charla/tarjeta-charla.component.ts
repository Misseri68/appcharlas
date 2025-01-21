import { Component, Input, OnInit } from '@angular/core';
import { Charla } from '../../models/Charla';
import { UserService } from '../../services/user.service';
import { RouterModule } from '@angular/router';
import { Usuario } from '../../models/Usuario';

@Component({
  selector: 'app-tarjeta-charla',
  standalone: true,
  templateUrl: './tarjeta-charla.component.html',
  styleUrls: ['./tarjeta-charla.component.scss'],
  providers: [UserService],
  imports: [RouterModule]
})
export class TarjetaCharlaComponent implements OnInit {
  @Input() charla!: Charla; // Recibe la charla como entrada
  public usuario: Usuario | null = null; // Almacena los datos del usuario
  public imagenMostrar!: string; // Imagen que se mostrará en la tarjeta
  public nombreUsuario: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if (!this.charla || !this.charla.idUsuario) {
      console.error('ID de usuario no válido o charla no definida');
      this.nombreUsuario = this.charla.usuario || 'Usuario Anónimo';
      
      return;
    }
  
   
    // Asignar imagen predeterminada si no existe
    this.imagenMostrar = this.charla.imagenCharla || 'assets/images/default-image.png';
  }
  

}
